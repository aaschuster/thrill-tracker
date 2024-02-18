import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dialog from "@mui/material/Dialog";

import {AiFillEdit as EditIcon} from "react-icons/ai";
import {
    FaRegHeart as UnfaveIcon,
    FaHeart as FaveIcon,
    FaArrowRight as GoIcon,
    FaSearch as SearchIcon
} from "react-icons/fa";
import {FaHouse as HouseIcon} from "react-icons/fa6";

import { clearUser } from "../actions/userActions";

import ParkList from "./ParkList";

import AddParkButton from "./Buttons/AddParkButton";
import ViewChainsButton from "./Buttons/ViewChainsButton";

import "../styles/ParkSelect.css";

const ParkSelect = ({ 
    parks, 
    isFetching, 
    error, 
    user, 
    parkFavorites, 
    clearUser, 
    homeParks,
}) => {

    const navigate = useNavigate();

    function logout() {
        axios.get(`${process.env.REACT_APP_SERVERURL}/users/logout`)
            .then( res => {
                clearUser();
                navigate("/");
            })
            .catch( err => console.error(err));
    }

    return (
        <div className="parkselect">
            <div className="accountcontainer">
                <p>Logged in as {user.username}</p> 
                <div className="accountbuttons">
                    <button onClick={() => navigate("/history/all")}>History</button>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
            <h1>ThrillTracker.com</h1>
            {
                homeParks.length > 0 ?
                    <div className="homeparks">
                        <div className="homeparksheader">
                            <HouseIcon className="icon homeicon"/>
                            <h3>Home park{homeParks.length === 1 ? "" : "s"}</h3>
                        </div>
                        <ParkList parklist={homeParks}/>
                    </div>
                : <></>
            }
            {
                parkFavorites.length > 0 ?
                    <div className="favoriteparks">
                        <div className="favoriteparksheader">
                            <FaveIcon className="icon faveicon"/>
                            <h3>Favorites</h3>
                        </div>
                        <ParkList parklist={parkFavorites}/>
                    </div>
                : <></>
            }
            <div className="buttonlist">
                <button 
                    className="searchbutton"
                    onClick={() => navigate("/search")}    
                >
                    <SearchIcon className="icon searchicon"/>
                    Search by park name
                </button>
                <ViewChainsButton/>
                <AddParkButton/>
            </div>
        </div>
    )    
   
}

const mapStateToProps = state => {
    return {
        parks: state.parks.parks,
        isFetching: state.parks.isFetching,
        error: state.parks.error,
        user: state.user.user,
        parkFavorites: state.parkFavorites.parkFavorites,
        homeParks: state.homeParks.homeParks
    }
}

export default connect(
    mapStateToProps, { 
        clearUser,
    }
)(ParkSelect);