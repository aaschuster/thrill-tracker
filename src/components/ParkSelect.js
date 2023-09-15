import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getParks } from "../actions/parksActions"

import Park from "./Park";

import "../styles/ParkSelect.css";

const ParkSelect = props => {

    const { parks, isFetching, error } = props;

    const navigate = useNavigate();

    function onClick(parkIdx) {
        navigate(`/atparkview/${parkIdx}`);
    }

    return (
        <div className="parkselect">
            <h1>ThrillTracker.com</h1>  
            <input placeholder="Search..."/>
            {parks.map( (park, idx) => {
                return <Park park={park} key={idx} onClick={() => onClick(idx)}/>;
            })} 
        </div>
    )    
   
}

const mapStateToProps = state => {
    return {
        parks: state.parks.parks,
        isFetching: state.parks.isFetching,
        error: state.parks.error
    }
}

export default connect(mapStateToProps)(ParkSelect);