import React from "react";
import Header from "./common/header";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import store from "./store";
import Home from "./pages/home";
import Detail from "./pages/detail";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/detail" component={Detail} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
