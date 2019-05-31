import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

import store from "./store";
import Dashboard from "./components/layout/Dashboard";
import NavbarComponent from "./components/layout/NavbarComponent";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NavbarComponent />
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
