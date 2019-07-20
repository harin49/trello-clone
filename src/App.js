import React from "react";
import "./App.css";
import ListComponent from "./components/ListComponent";
import { AppHeader } from "./components/AppHeader";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <ListComponent />
    </div>
  );
}

export default App;
