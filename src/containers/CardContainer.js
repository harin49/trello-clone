import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CardComponent } from "../components/CardComponent";
import * as cardActions from "../actions/cardActions";

import "../styles/cardStyles.scss";

class CardContainer extends Component {

  constructor(props){
    super(props);
    this.state={
      cardModalOpen:false,
      chosenCard:"",
    }
  }


  filterCards = () => {
    const filteredCards = this.props.allCards.filter(card => {
      return card.listId === this.props.listId;
    });
    return filteredCards;
  };

  handleCardModalOpen = (cardId) =>{
    if(cardId){
      let chosenCard = this.props.allCards.filter(card =>{
        return card.cardId === cardId
      });
      this.setState({
        chosenCard:chosenCard
      })
    }
    this.setState({
      cardModalOpen:true
    })
  }

  handleCardModalClose = () =>{
    this.setState({
      cardModalOpen:false,
      chosenCard:""
    })
  }

  render() {
    return (
      <div className="card-component-container">
        {this.filterCards().map(card => {
          return <CardComponent {...this.props} 
          card={card}
          key={card.cardId} 
          open={this.state.cardModalOpen}
          handleCardModalClose={this.handleCardModalClose}
          handleCardModalOpen={this.handleCardModalOpen}
          chosenCard = {this.state.chosenCard}
          />;
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
