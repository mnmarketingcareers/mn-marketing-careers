const userList = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_LIST':
        return action.payload;
      case 'UNSET_USER_LIST':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default userList;
  