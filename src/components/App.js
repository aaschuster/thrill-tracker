import React, { useState, useEffect } from "react";
import {Routes, Route} from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { setUser } from "../actions/loginActions"
import { getParks } from "../actions/parksActions";
import { getRides } from "../actions/ridesActions";

import '../styles/App.css';

import Login from "./Login"
import CreateAccount from "./CreateAccount";
import ParkSelect from "./ParkSelect"
import AtParkView from "./ParkView/AtParkView";
import RecordAddUpdate from "./RecordAddUpdate/RecordAddUpdate";

const App = props => {

  const { user, setUser, getParks, getRides } = props;

  useEffect(() => {
    axios.defaults.withCredentials = true;
    setUser();
    getParks();
    getRides();
  }, []);

  useEffect(() => {
    if(user)
      console.log(user);
    else console.log("no user");
  }, [user])

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

const mapStateToProps = state => {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps, {setUser, getParks, getRides})(App);
