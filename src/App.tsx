import { Button, ThemeProvider } from "@material-ui/core";
import React from "react";
import "./App.css";
import StorePicker from "./components/StorePicker";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Button>Test</Button>
          <StorePicker />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
