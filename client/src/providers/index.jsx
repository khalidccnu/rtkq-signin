import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import store, { persistor } from "../redux/store.js";

const Providers = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>{children}</PersistGate>
      </Provider>
      <ToastContainer />
    </>
  );
};

export default Providers;
