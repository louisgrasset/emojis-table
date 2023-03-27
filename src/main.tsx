import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { storageService } from "./helpers/storage-service";

storageService().then(() => {
  // React app
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
