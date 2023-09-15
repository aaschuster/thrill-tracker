import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import { getParks } from "../actions/parksActions";

import '../styles/App.css';

import ParkSelect from "./ParkSelect"
import AtParkView from "./ParkView/AtParkView";
import ParkViewEdit from "./ParkView/ParkViewEdit"

const App = props => {

  const { getParks } = props;

  const serverURL = process.env.REACT_APP_SERVERURL;

  const [rides, setRides] = useState([]);
  const [history, setHistory] = useState([])

  useEffect(() => {
    refreshData();
  }, []);

  function refreshData() {

    getParks();

    axios.get(`${serverURL}/rides`)
      .then( ({data}) => setRides(data))
      .catch( err => console.error(err))

    axios.get(`${serverURL}/history`)
    .then( ({data}) => setHistory(data))
    .catch( err => console.error(err))
  }

  return (
    <div className="App">
        <Routes>
          <Route 
            path="/" exact element={
              <ParkSelect/>
            }/>
          <Route path="/atparkview/:id" element={
            <AtParkView
              // parks={parks}
              rides={rides}
              history={history}
              setHistory={setHistory}
              refreshData={refreshData}
            />
          }/>
          <Route path="/atparkview/:id/edit" element={
            <ParkViewEdit/>
          }
          />
        </Routes>
    </div>
  );
}

export default connect(null, {getParks})(App);
