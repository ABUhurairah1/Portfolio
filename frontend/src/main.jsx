import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ToastContainer from "./components/common/Toast";
import "./assets/css/bootstrap.css";
import "./assets/css/odometer.min.css";
import "./assets/css/swiper-bundle.min.css";
import "./assets/css/animateText.css";
import "./assets/css/jquery.fancybox.min.css";
import "./assets/css/styles.css";
import "./assets/font/fonts.css";
import "./assets/icons/icomoon/style.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </StrictMode>
);
