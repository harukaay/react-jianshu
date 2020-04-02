import React from "react";
import Header from "./common/header";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import store from "./store";
import Home from "./pages/home";
import Detail from "./pages/detail/loadable";
import Login from "./pages/login";
import write from "./pages/write";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/detail/:id" exact component={Detail} />

          <Route path="/write" exact component={write}></Route>
          <Route path="/login" exact component={Login} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
