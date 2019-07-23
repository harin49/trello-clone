export const AddToCardList = value => ({ type: "ADD_CARD", value });

export const addCards = value => {
  return async dispatch => {
    dispatch(AddToCardList(value));
  };
};

export const handleDragNDrop = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  allCards
) => {
  return async dispatch => {
    if (droppableIdStart === droppableIdEnd) {
      // if drag n drop in same list
      const listId = droppableIdStart;

      // filter card based on target list
      const allCardsInList = allCards.filter(cardItem => {
        return cardItem.listId === listId;
      });

      // separate remaining cards

      const remainingCards = allCards.filter(cardItem => {
        return cardItem.listId !== listId;
      });

      // steps to preserve drag n drop order

      const selectedCard = allCardsInList.splice(droppableIndexStart, 1);
      allCardsInList.splice(droppableIndexEnd, 0, ...selectedCard);
      const rearrangedCards = [...remainingCards, ...allCardsInList];
      dispatch(AddToCardList(rearrangedCards));
    } else {
      // if drag n drop between lists
      const targetListId = droppableIdEnd;

      // get selected card

      const selectedCard = allCards.filter(cardItem => {
        return cardItem.cardId === draggableId;
      });

      // remove selected card from list of all cards

      const filteredCardList = allCards.filter(cardItem => {
        return cardItem.cardId !== draggableId;
      });

      // list of cards in target list to preserve order

      const targetCardList = filteredCardList.filter(cardItem => {
        return cardItem.listId === targetListId;
      });

      const remainingCardList = filteredCardList.filter(cardItem => {
        return cardItem.listId !== targetListId;
      });

      // change list id of selected card to target list id

      selectedCard[0].listId = targetListId;

      // add selected card to target list

      targetCardList.splice(droppableIndexEnd, 0, ...selectedCard);
      const rearrangedCards = [...targetCardList, ...remainingCardList];
      dispatch(AddToCardList(rearrangedCards));
    }
  };
};
