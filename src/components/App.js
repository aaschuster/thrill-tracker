import React, { useEffect } from "react";
import {Routes, Route} from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { setUser } from "../actions/userActions"
import { getHistory, setProcessedHistory } from "../actions/historyActions";
import { getParks } from "../actions/parksActions";
import { getRides } from "../actions/ridesActions";
import { getChains } from "../actions/chainsActions";
import { getCountries } from "../actions/countriesActions";
import { getStates } from "../actions/statesActions";
import { getManufacturers } from "../actions/manufacturersActions";
import { getRideTypes } from "../actions/rideTypesActions";
import { getRidesRideTypes } from "../actions/ridesRideTypesActions";
import { getRideFavorites } from "../actions/rideFavoritesActions";
import { getParkFavorites } from "../actions/parkFavoritesActions";
import { getHomeParks } from "../actions/homeParksActions";

import '../styles/App.css';

import Login from "./Login"
import CreateAccount from "./CreateAccount";
import ParkSelect from "./ParkSelect"
import History from "./History";
import AtParkView from "./ParkView/AtParkView";
import RecordAddUpdate from "./AddUpdate/RecordAddUpdate/RecordAddUpdate";
import ParkAddUpdate from "./AddUpdate/ParkAddUpdate";
import RideAddUpdate from "./AddUpdate/RideAddUpdate";
import Search from "./Search";
import ChainList from "./ChainList";
import ChainParks from "./ChainParks";

const App = props => {

  const { 
    user, 
    rides, 
    history, 
    setUser, 
    setProcessedHistory, 
    getHistory, 
    getParks, 
    getRides, 
    getChains, 
    getCountries, 
    getStates,
    getManufacturers,
    getRideTypes,
    getRidesRideTypes,
    getRideFavorites,
    getParkFavorites,
    getHomeParks
  } = props;

  useEffect(() => {
    axios.defaults.withCredentials = true;
    setUser();
    getChains();
    getCountries();
    getStates();
    getManufacturers();
    getRideTypes();
    getRidesRideTypes();
  }, []);

  useEffect(() => {
    if(user.username) {
      getParks(user.users_id);
      getRides(user.users_id);
      getHistory();
      getRideFavorites(user.users_id);
      getParkFavorites(user.users_id);
      getHomeParks(user.users_id);
    }
  }, [user])

  useEffect(() => {
    if(history.length !== 0 && rides.length !== 0) {
      const processedHistory = [];

      history.forEach( record => {
        const newRecord = {...record};

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
            path="/search"
            element={<Search/>}
          />
          <Route
            path="/chains"
            element={<ChainList/>}
          />  
          <Route
            path="/chains/:id"
            element={<ChainParks/>}
          />
          <Route
            path="/history/:id"
            element={<History/>}
          />
          <Route path="/atparkview/:id/*" element={
            <AtParkView/>
          }/>
          <Route
            path="/addupdate/record/:rideId/:historyId" element={
              <RecordAddUpdate/>
            }/>
          <Route
            path="/addupdate/park/:parkId" element={
              <ParkAddUpdate/>
            }
          />
          <Route
            path="/addupdate/ride/:rideId" element={
              <RideAddUpdate/>
            }
          />
        </Routes>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    rides: state.rides.rides,
    history: state.history.history
  }
}

export default connect(
  mapStateToProps, {
    setUser, 
    getHistory, 
    setProcessedHistory, 
    getParks, 
    getRides,
    getChains, 
    getCountries, 
    getStates,
    getManufacturers,
    getRideTypes,
    getRidesRideTypes,
    getRideFavorites,
    getParkFavorites,
    getHomeParks
  })(App);
