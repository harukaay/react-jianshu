import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyled } from "./style.js";
import './statics/iconfont/iconfont.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyled />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
