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
      const listId = droppableIdStart;
      const allCardsInList = allCards.filter(cardItem => {
        return cardItem.listId === listId;
      });
      const remainingCards = allCards.filter(cardItem => {
        return cardItem.listId !== listId;
      });
      const selectedCard = allCardsInList.splice(droppableIndexStart, 1);
      allCardsInList.splice(droppableIndexEnd, 0, ...selectedCard);
      const rearrangedCards = [...remainingCards, ...allCardsInList];
      dispatch(AddToCardList(rearrangedCards));
    } else {
      const targetListId = droppableIdEnd;
      const selectedCard = allCards.filter(cardItem => {
        return cardItem.cardId === draggableId;
      });
      const filteredCardList = allCards.filter(cardItem => {
        return cardItem.cardId !== draggableId;
      });

      const targetCardList = filteredCardList.filter(cardItem => {
        return cardItem.listId === targetListId;
      });

      const remainingCardList = filteredCardList.filter(cardItem => {
        return cardItem.listId !== targetListId;
      });

      selectedCard[0].listId = targetListId;

      targetCardList.splice(droppableIndexEnd, 0, ...selectedCard);

      const rearrangedCards = [...targetCardList, ...remainingCardList];
      dispatch(AddToCardList(rearrangedCards));
    }
  };
};
