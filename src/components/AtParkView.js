import React from "react";

function AtParkView( {park, rides} ) {
    return (
        <div>
            <h2>{park.name}</h2>
            {
                rides.map( (ride, idx) => {
                    if(ride.parks_id === park.parks_id)
                        return(<p key={idx}>{ride.name}</p>);
                })
            }
            
        </div>
    )
}

export default AtParkView;