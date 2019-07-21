import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CardComponent } from "../components/CardComponent";
import * as cardActions from "../actions/cardActions";

import "../styles/cardStyles.scss";

class CardContainer extends Component {
  filterCards = () => {
    const filteredCards = this.props.allCards.filter(card => {
      return card.listId === this.props.listId;
    });
    return filteredCards;
  };

  render() {
    return (
      <div className="card-component-container">
        {this.filterCards().map(card => {
          return <CardComponent {...this.props} card={card} key={card.cardId} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allCards: state.cardReducer.cards
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addCards: cardActions.addCards
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardContainer);
