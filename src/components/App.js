import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate, useParams} from "react-router-dom";
import { connect } from "react-redux";

import { getParks } from "../actions/parksActions";
import { getRides } from "../actions/ridesActions";
import { getHistory } from "../actions/historyActions";

import '../styles/App.css';

import ParkSelect from "./ParkSelect"
import AtParkView from "./ParkView/AtParkView";

const App = props => {

  const { getParks, getRides, getHistory } = props;

  const serverURL = process.env.REACT_APP_SERVERURL;

  const [history, setHistory] = useState([])

  useEffect(() => {
    refreshData();
  }, []);

  function refreshData() {

    getParks();
    getRides();
    getHistory();
    
  }

  return (
    <div className="App">
        <Routes>
          <Route 
            path="/" exact element={
              <ParkSelect/>
            }/>
          <Route path="/atparkview/:id/*" element={
            <AtParkView/>
          }/>
        </Routes>
    </div>
  );
}

export default connect(null, {getParks, getRides, getHistory})(App);
