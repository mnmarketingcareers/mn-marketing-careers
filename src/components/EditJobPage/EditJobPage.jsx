import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';

function EditJobPage() {
    // declare hooks
    const history = useHistory();
    const dispatch =useDispatch();
    const { id } = useParams();
    const jobToEdit = useSelector(store => store.setJobsReducer);
    const jobTypes = useSelector(store => store.jobTypes);


    // make call for item to edit on page load with useEffect
    useEffect( ()=> {
        dispatch({ type: 'GET_JOB_TYPES' });
        dispatch({ type: 'FETCH_JOB_ID', payload: { job_posting_id: id } });
    }, []);
    // set items in state 
    const [rowEdits, setRowEdits] = useState(jobToEdit);

    // declare anonymous functions
    

    // set return
    return(
        <div>
            <h2>Edit this posting:</h2>
            <p>{JSON.stringify(jobToEdit)}</p>
            <p>{JSON.stringify(jobTypes)}</p>
        </div>
    )
}

export default EditJobPage;