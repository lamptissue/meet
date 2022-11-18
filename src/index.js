import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// import reportWebVitals from "./reportWebVitals";
import * as atatus from "atatus-spa";

atatus.config("ad5fa25b5e8043a68dae78aa4e001f7f").install();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// serviceWorker.unregister();

serviceWorkerRegistration.register();
// reportWebVitals();
