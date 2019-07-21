export const AddToList = value => ({ type: "ADD_LIST", value });

export const addLists = value => {
  return async dispatch => {
    dispatch(AddToList(value));
  };
};
