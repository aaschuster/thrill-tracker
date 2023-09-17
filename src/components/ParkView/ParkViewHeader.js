import React from "react";

import BackButton from "../BackButton";

import "../../styles/ParkViewHeader.css";

function ParkViewHeader( {name} ) {

    return (
        <div className={"parkviewheader"}>
            <div className={"parkviewheadertop"}>
                <BackButton/>
                <h2>{name}</h2>
            </div>
        </div>
    )
}

export default ParkViewHeader;