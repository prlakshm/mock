import React from "react";
import "../styles/App.css";
import MOCK from "./MOCK";

/**
 * This is the highest level component!
 * sets up our Mock webpage
 */
function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1 style={{ marginBottom: "10px" }}>Mock</h1>
        Commands:
        <br />
        <div>
          <span style={{ color: "lightblue" }}>
            "load_file [file_name] [true]"
          </span>{" "}
          if csv has headers or{" "}
          <span style={{ color: "lightblue" }}>
            "load_file [file_name] [false]"
          </span>{" "}
          if no headers
        </div>
        <div>
          <span style={{ color: "lightblue" }}>"view"</span> to view csv
        </div>
        <div>
          <span style={{ color: "lightblue" }}>
            "search [column name] [keyword]"
          </span>{" "}
          to search by column header or{" "}
          <span style={{ color: "lightblue" }}>
            "search [column index] [keyword]"
          </span>{" "}
          to search by column index
        </div>
        <div>
          <span style={{ color: "lightblue" }}>"mode brief"</span> to display
          only history output or{" "}
          <span style={{ color: 'lightblue'}}>"mode verbose"</span> to display
          both history command and output
        </div>
      </div>
      <div><MOCK /></div>
      
    </div>
  );
}

export default App;
