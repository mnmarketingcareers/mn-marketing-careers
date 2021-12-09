import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
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
    const showForm = (jobToEdit.length > 0) ? true : false;
    const thisJob = jobToEdit[0];
    
    // make call for item to edit on page load with useEffect
    useEffect( ()=> {
        dispatch({ type: 'GET_JOB_TYPES' });
        dispatch({ type: 'FETCH_JOB_ID', payload: { job_posting_id: id } });
    }, []);

 

    const toAdminHub = () => {
        history.push('/adminjoblist');
    }

    // set return
    return(
        <div>
            <h2>Editing this posting:</h2>
            <Button onClick={toAdminHub}>Back to List</Button>
            {!showForm && <CircularProgress />}
            {showForm && 
            <div className="form-container">
            
                <EditJobForm id={id} thisJob={thisJob} jobTypes={jobTypes} />
                <Button onClick={toAdminHub}>Back to List</Button>
            </div>}
        </div>
    )
}

export default EditJobPage;