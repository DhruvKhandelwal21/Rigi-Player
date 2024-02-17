import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { PlaylistStateProvider } from "./context/playlistContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlaylistStateProvider>
        <App />
      </PlaylistStateProvider>
    </BrowserRouter>
  </React.StrictMode>
);
