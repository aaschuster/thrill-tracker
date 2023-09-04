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
  const [history, setHistory] = useState([])
  const [currentParkRides, setCurrentParkRides] = useState([]); //holds indexes of rides that match current park
  const [currentParkIdx, setCurrentParkIdx] = useState(null);

  useEffect(() => {

    axios.get(`${serverURL}/parks`)
      .then( ({data}) => setParks(data))
      .catch( err => console.error(err))

    axios.get(`${serverURL}/rides`)
      .then( ({data}) => setRides(data))
      .catch( err => console.error(err))

    refreshHistory();

  }, []);

  useEffect(() => {

    if(currentParkIdx !== null) {
      setCurrentParkRides( 
        rides.filter( 
          (ride) => ride.parks_id === parks[currentParkIdx].parks_id 
        )
      )
    }
    
  }, [rides, currentParkIdx])

  function refreshHistory() {
    axios.get(`${serverURL}/history`)
      .then( ({data}) => setHistory(data))
      .catch( err => console.error(err))
  }

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
              history={history}
              currentParkRides={currentParkRides}
              setHistory={setHistory}
            />
          }/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
