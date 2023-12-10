import React from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "../BackButton";

import "../../styles/ParkViewHeader.css";

function ParkViewHeader( {name, parkID} ) {

    const navigate = useNavigate();

    return (
        <div className={"parkviewheader"}>
            <div className={"parkviewheadertop"}>
                <BackButton/>
                <h2>{name}</h2>
                <button onClick={() => navigate(`/addupdate/park/${parkID}`)}>Edit</button>
            </div>
        </div>
    )
}

export default ParkViewHeader;