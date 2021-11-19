const lasagna = (state = {}, action) => {
    switch(action.type) {
        case 'SET_LASAGNA':
            return action.payload;
        case 'RESET_LASAGNA':
            return {};
        default:
            return state;
    }
}

export default lasagna;