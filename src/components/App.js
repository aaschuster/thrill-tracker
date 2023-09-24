import React, { useEffect } from "react";
import {Routes, Route} from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { setUser } from "../actions/loginActions"
import { getHistory, setProcessedHistory } from "../actions/historyActions";
import { getParks } from "../actions/parksActions";
import { getRides } from "../actions/ridesActions";

import '../styles/App.css';

import Login from "./Login"
import CreateAccount from "./CreateAccount";
import ParkSelect from "./ParkSelect"
import History from "./History";
import AtParkView from "./ParkView/AtParkView";
import RecordAddUpdate from "./RecordAddUpdate/RecordAddUpdate";

const App = props => {

  const { user, rides, history, setUser, setProcessedHistory, getHistory, getParks, getRides } = props;

  useEffect(() => {
    axios.defaults.withCredentials = true;
    setUser();
    getParks();
    getRides();
  }, []);

  useEffect(() => {
    if(user.username)
      getHistory();
  }, [user])

  useEffect(() => {
    if(history.length !== 0 && rides.length !== 0) {
      const processedHistory = [];

      history.forEach( record => {
        const newRecord = {...record};

        const [date, time] = record.timestamp.split(", ");
        newRecord.timeonly = time;

        rides.forEach( ride => {
          if(ride.rides_id === record.rides_id) 
            newRecord.name = ride.name;
        })

        processedHistory.push(newRecord);
      })
      
      setProcessedHistory(processedHistory);
    }
  }, [history])

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
          <Route
            path="/history/:id"
            element={<History/>}
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

const mapStateToProps = state => {
  return {
    user: state.login.user,
    rides: state.rides.rides,
    history: state.history.history
  }
}

export default connect(mapStateToProps, {setUser, getHistory, setProcessedHistory, getParks, getRides})(App);
