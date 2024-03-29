import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListComponent from "../components/ListComponent";
import * as listActions from "../actions/listActions";
import * as cardActions from "../actions/cardActions";
import "../styles/listStyles.scss";

class ListContainer extends Component {
  render() {
    const { allLists } = this.props;
    return (
      <div className="list-component-container">
        {allLists.map(list => {
          return <ListComponent {...this.props} list={list} key={list.id} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allLists: state.listReducer.lists,
    allCards: state.cardReducer.cards
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addLists: listActions.addLists,
      addCards: cardActions.addCards
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);
