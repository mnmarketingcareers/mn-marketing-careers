import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import './EditJobPage.css';
import EditJobForm from "./EditJobForm";

// mui imports
import { 
    Button, 
    CircularProgress, 
} from '@mui/material';

function EditJobPage() {
    

    // declare hooks
    const history = useHistory();
    const dispatch =useDispatch();
    const { id } = useParams();
    const jobToEdit = useSelector(store => store.setJobsReducer);
    const jobTypes = useSelector(store => store.jobTypes);
    
    
    // set items in state     
    // const [isLoading, setIsLoading] = useState(true);
    const showForm = (jobToEdit.length > 0) ? true : false;
    const thisJob = jobToEdit[0];
    
    // make call for item to edit on page load with useEffect
    useEffect( ()=> {
        dispatch({ type: 'GET_JOB_TYPES' });
        dispatch({ type: 'FETCH_JOB_ID', payload: { job_posting_id: id } });
        // setIsLoading(false);
    }, []);
   
    // probably no longer needed
    // const handleSetEditObj = () => {
    //     setRowEdits((rowEdits) => {
    //         return {...rowEdits, jobToEdit};
    //     });
    //     console.log('rowEdits', rowEdits);
    // }
    // declare anonymous functions

    

    console.log('job types from current job posting', jobToEdit.job_type);
    // const multiPlaceholderText = (arr) => {
    //     let newString = ''
    //     for (let item of arr) {
    //         newString += item + ', ';
    //     }
    //     return newString;
    // }

    // let jobTypesString = multiPlaceholderText( jobToEdit.job_type);
    // console.log(jobTypesString);
    

     // Success Button toggle
    const [open, setOpen] = useState(false);




            // If no changes to the following fields, send existing ids
        // if(rowEdits.posting_contact_name == '' || rowEdits.posting_contact_email == '' ) {
        //     setRowEdits({ ...rowEdits, 
        //     posting_contact_id: thisJob.posting_contact_id })
        // }
        // if(rowEdits.company_name == '') {
        //     setRowEdits({ ...rowEdits, company_id: thisJob.company_id})
        // }
        // if(rowEdits.hiring_contact_email == '' || rowEdits.hiring_contact_name == '' || rowEdits.title == '' || rowEdits.phone == '') {
        //     setRowEdits({...rowEdits, hiring_contact_id: thisJob.hiring_contact_id})
        // }

    // might not be necessary anymore...    
    const handleSetFKIds = () => {
        console.log('Setting Foreign Key Ids');
            setRowEdits({ ...rowEdits, 
            posting_contact_id: thisJob.posting_contact_id, 
            company_id: thisJob.company_id, 
            hiring_contact_id: thisJob.hiring_contact_id})
    }

    

    const toAdminHub = () => {
        history.push('/adminhub');
    }

    // set return
    return(
        <div>
            <h2>Editing this posting:</h2>
            <Button onClick={toAdminHub}>Back to Hub</Button>
            {/* <p>{JSON.stringify(jobToEdit)}</p> */}
            {/* <p>{JSON.stringify(jobTypes)}</p> */}
            {!showForm && <CircularProgress />}
            {showForm && 
            <div className="form-container">
            
                <EditJobForm id={id} thisJob={thisJob} jobTypes={jobTypes} />
                <Button onClick={toAdminHub}>Back to Hub</Button>
                {/* <Button variant="contained" extended onClick={() => dispatch({ type: 'POST_APPROVED_JOBS'})}>Post approved jobs</Button> */}
            </div>}
        </div>
    )
}

export default EditJobPage;