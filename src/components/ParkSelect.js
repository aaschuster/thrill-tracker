import React from "react";
import { useNavigate } from "react-router-dom";

import Park from "./Park";

function ParkSelect( {parks, setCurrentParkIdx} ) {

    const navigate = useNavigate();

    function onClick(parkIdx) {
        setCurrentParkIdx(parkIdx);
        navigate("/atparkview");
    }

    return (
        <div>
            <input placeholder="Search..."/>
            {parks.map( (park, idx) => {
                return <Park park={park} key={idx} onClick={() => onClick(idx)}/>;
            })}
        </div>
    )    
}

export default ParkSelect;