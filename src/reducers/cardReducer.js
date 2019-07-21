export const cardInitialState = {
  cards: []
};

export const cardReducer = (state = cardInitialState, actions) => {
  switch (actions.type) {
    case "ADD_CARD":
      return { ...state, cards: [...actions.value] };
    default:
      return state;
  }
};
