import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";

//import index.css files
import "./Index.css";
import { ThemeProvider } from "./ThemeContexts/ThemeContext.js";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
