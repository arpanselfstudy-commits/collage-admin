import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { persistedStore, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
