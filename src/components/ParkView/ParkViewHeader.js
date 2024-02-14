import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import {setCurrentParkID} from "../../actions/parksActions";

import BackButton from "../Buttons/BackButton";
import HomeButton from "../Buttons/HomeButton";

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
                <HomeButton/>
            </div>
            <div className={"parkviewheaderbuttons"}>
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