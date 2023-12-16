import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "../redux/store.js";

const Providers = ({ children }) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
      <ToastContainer />
    </>
  );
};

export default Providers;
