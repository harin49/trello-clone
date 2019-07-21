export const listInitialState = {
  lists: []
};

export const listReducer = (state = listInitialState, actions) => {
  switch (actions.type) {
    case "ADD_LIST":
      return { ...state, lists: [...actions.value] };
    default:
      return state;
  }
};
