import React from "react";

import Park from "./Park";

function ParkSelect( {parks} ) {
    return (
        <div>
            <input placeholder="Search..."/>
            {parks.map(park => {
                return <Park park={park} key={park.parks_id}/>;
            })}
        </div>
    )    
}

export default ParkSelect;