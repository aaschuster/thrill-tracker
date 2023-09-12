import React from "react";
import { useNavigate } from "react-router-dom";

import {BiArrowBack} from "react-icons/bi";

import "../../styles/ParkViewHeader.css";

function ParkViewHeader( {name} ) {
    const navigate = useNavigate();

    return (
        <div className={"parkviewheader"}>
            <div className={"parkviewheadertop"}>
                <BiArrowBack className={"backarrow"} size="30px" onClick={() => navigate(-1)}/>
                <h2>{name}</h2>
            </div>
            <h3>Today's rides:</h3>
        </div>
    )
}

export default ParkViewHeader;