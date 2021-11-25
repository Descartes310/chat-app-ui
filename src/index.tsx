import App from "./App";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, Store } from "redux";

const store: Store  = createStore(reducer, applyMiddleware(thunk))

const rootElement = document.getElementById("root")
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)