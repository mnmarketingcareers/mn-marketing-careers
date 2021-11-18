const approvedPostings = (state = [], action) => {
    switch(action.type) {
        case 'SET_APPROVED_POSTINGS':
            return action.payload;
        case 'RESET_APPROVED_POSTINGS':
            return [];
        default:
            return state;
    }
}

export default approvedPostings;