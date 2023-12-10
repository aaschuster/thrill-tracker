import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import {setCurrentParkID} from "../../actions/parksActions";

import BackButton from "../BackButton";

import "../../styles/ParkViewHeader.css";

function ParkViewHeader( {name, parkID, setCurrentParkID} ) {

    const navigate = useNavigate();

    function addRide() {
        setCurrentParkID(parkID);
        navigate(`/addupdate/ride/add`)
    }

    return (
        <div className={"parkviewheader"}>
            <div className={"parkviewheadertop"}>
                <BackButton/>
                <h2>{name}</h2>
            </div>
            <div className={"parkviewheaderbuttons"}>
                <button onClick={() => navigate(`/addupdate/park/${parkID}`)}>Edit Park Info</button>
                <button onClick={addRide}>Add Ride</button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        currentParkID: state.parks.currentParkID
    }
}

export default connect(mapStateToProps, { setCurrentParkID }) (ParkViewHeader);