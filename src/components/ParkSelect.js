import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getParks } from "../actions/parksActions"

import Park from "./Park";

import "../styles/ParkSelect.css";

const ParkSelect = props => {

    const { parks, isFetching, error, getParks } = props;

    const navigate = useNavigate();

    function onClick(parkIdx) {
        navigate(`/atparkview/${parkIdx}`);
    }

    useEffect(() => {
        console.log(props);
    }, [parks])

    return (
        <div className="parkselect">
            <h1>ThrillTracker.com</h1>  
            <input placeholder="Search..."/>
            { parks ? <>
            {parks.map( (park, idx) => {
                return <Park park={park} key={idx} onClick={() => onClick(idx)}/>;
            })} 
            </> : <></>
            }
        </div>
    )    
   
}

const mapStateToProps = state => {
    return {
        parks: state.parksReducer.parks,
        isFetching: state.parksReducer.isFetching,
        error: state.parksReducer.error
    }
}

export default connect(mapStateToProps, {getParks})(ParkSelect);