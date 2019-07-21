export const AddToCardList = value => ({ type: "ADD_CARD", value });

export const addCards = value => {
  return async dispatch => {
    dispatch(AddToCardList(value));
  };
};
