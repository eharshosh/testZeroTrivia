import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import App from "./components/App";
import rootReducer from "./redux/reducers";
import mySaga from "./redux/saga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,  applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

const rootElement = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);
