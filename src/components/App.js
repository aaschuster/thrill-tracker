import React, { useState, useEffect } from "react";
import axios from "axios";

import '../App.css';

import ParkSelect from "./ParkSelect"

function App() {

  const serverURL = process.env.REACT_APP_SERVERURL;

  const [parks, setParks] = useState([]);

  useEffect(() => {
    axios.get(`${serverURL}/parks`)
      .then( ({data}) => setParks(data))
      .catch( err => console.error(err))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ThrillTracker.com</h1>
        <ParkSelect parks={parks}/>
      </header>
    </div>
  );
}

export default App;
