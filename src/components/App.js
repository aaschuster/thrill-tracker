import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import axios from "axios";

import '../App.css';

import ParkSelect from "./ParkSelect"
import AtParkView from "./AtParkView";

function App() {

  const serverURL = process.env.REACT_APP_SERVERURL;

  const [parks, setParks] = useState([]);
  const [rides, setRides] = useState([]);
  const [currentParkRides, setCurrentParkRides] = useState([]); //holds indexes of rides that match current park
  const [currentParkIdx, setCurrentParkIdx] = useState(null);

  useEffect(() => {

    axios.get(`${serverURL}/parks`)
      .then( ({data}) => setParks(data))
      .catch( err => console.error(err))

    axios.get(`${serverURL}/rides`)
      .then( ({data}) => setRides(data))
      .catch( err => console.error(err))

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ThrillTracker.com</h1>
        <Routes>
          <Route 
            path="/" exact element={
              <ParkSelect
                parks={parks}
                setCurrentParkIdx={setCurrentParkIdx}
              />
            }/>
          <Route path="/atparkview" element={
            <AtParkView
              park={parks[currentParkIdx]}
              rides={rides}
            />
          }/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
