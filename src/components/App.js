import React, { useState, useEffect } from "react";
import {Routes, Route} from "react-router-dom";
import { connect } from "react-redux";

import { getParks } from "../actions/parksActions";
import { getRides } from "../actions/ridesActions";
import { getHistory } from "../actions/historyActions";

import '../styles/App.css';

import Login from "./Login"
import CreateAccount from "./CreateAccount";
import ParkSelect from "./ParkSelect"
import AtParkView from "./ParkView/AtParkView";
import RecordAddUpdate from "./RecordAddUpdate/RecordAddUpdate";

const App = props => {

  const { getParks, getRides, getHistory } = props;

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
              <Login/>
          }/>
          <Route
            path="/parkselect"
            element={<ParkSelect/>}
          />
          <Route
            path="/createaccount"
            element={<CreateAccount/>}
          />
          <Route path="/atparkview/:id/*" element={
            <AtParkView/>
          }/>
          <Route
            path="/addupdate/:rideId/:historyId" element={
              <RecordAddUpdate/>
            }/>
        </Routes>
    </div>
  );
}

export default connect(null, {getParks, getRides, getHistory})(App);
