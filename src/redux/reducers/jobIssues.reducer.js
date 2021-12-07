// GET ISSUE LIST
const setJobIssueListReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_JOB_ISSUE_LIST":
            return action.payload;
        case "UNSET_JOB_ISSUE_LIST":
            return [];
        default:
            return state;
    }
};

export default setJobIssueListReducer;