/* App.js */

import React from "react";
import Chess from "./Chess";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Chess /> {/* Add the Chess component here */}
      </header>
    </div>
  );
}

export default App;
