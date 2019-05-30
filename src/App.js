import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

import store from "./store";
import Dashboard from "./components/layout/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="navbar">
          <h2>XRides Bangalore</h2>
        </div>
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
