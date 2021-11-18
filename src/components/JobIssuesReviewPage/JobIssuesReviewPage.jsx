import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';

function JobIssuesReviewPage() {
    const dispatch = useDispatch();

    // this reducer contains job issue data pulled from the database
    const jobIssueList = useSelector(store => store.setJobIssueListReducer);
}

export default JobIssuesReviewPage;