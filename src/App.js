import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListContainer from "./containers/ListContainer";
import AppHeader from "./components/AppHeader";
import * as listActions from "./actions/listActions";

function App(props) {
  return (
    <div className="App">
      <AppHeader {...props} />
      <div style={{ height: "calc(100% - 60px)", width: "100%", overflowX: "scroll" }}>
        <ListContainer />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    allLists: state.listReducer.lists
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addLists: listActions.addLists
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
