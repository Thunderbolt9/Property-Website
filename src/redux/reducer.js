//reducer for user objet
function reducer(state = {}, action) {
  if (action.type === "userAdded" || action.type === "userUpdated") {
    return { user: action.payload.user };
  } else if (action.type === "userDeleted") {
    return { user: null };
  }
  return state;
}

export default reducer;
