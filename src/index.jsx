import React from "react";
import ReactDOM from "react-dom";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { BaseProvider, LightTheme } from "baseui";
import { createStore, applyMiddleware } from "redux";
import { Provider as StoreProvider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import rootReducer from "reducers/rootReducer";
import rootSaga from "sagas/rootSaga";
import App from "components/App";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
const engine = new Styletron();
const history = createBrowserHistory();

sagaMiddleware.run(rootSaga, { history });

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <App history={history} />
        </BaseProvider>
      </StyletronProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
