import React, { Component } from "react";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListContainer from "./containers/ListContainer";
import AppHeader from "./components/AppHeader";
import * as listActions from "./actions/listActions";
import { handleDragNDrop } from "./actions/cardActions";

class App extends Component {
  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    this.props.handleDragNDrop(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      this.props.allCards
    );
  };
  render() {
    return (
      <div className="App">
        <AppHeader {...this.props} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div style={{ height: "calc(100% - 60px)", width: "100%", overflowX: "scroll" }}>
            <ListContainer />
          </div>
        </DragDropContext>
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
      handleDragNDrop: handleDragNDrop
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
