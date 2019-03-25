
import ReactDOM from "react-dom";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import rootReducer from "./reducers";
import registerServiceWorker from "./registerServiceWorker";

const store = createStore(
  rootReducer,
  process.env.NODE_ENV !== "production" &&
    window.devToolsExtension &&
    window.devToolsExtension()
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector("#app")
);

// registerServiceWorker();