const pendingPostings = (state = [], action) => {
    switch(action.type) {
        case 'SET_PENDING_POSTINGS':
            return action.payload;
        case 'RESET_PENDING_POSTINGS':
            return [];
        default:
            return state;
    }
}

export default pendingPostings;