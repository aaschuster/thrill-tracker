import React from "react";

function RideListItem({ride, setDialog, quickAdd}) {
    return (
        <div className={"ridecontainer"}>

        <button 
            className={"ridename"} 
            onClick={() => setDialog({open: true, rideID: ride.rides_id, rideName: ride.name})}
        >
            {ride.name}
        </button>

        <button 
            className={"quickadd plus"} 
            onClick={() => quickAdd(ride.rides_id)}
        >
            <span className="plus">+</span>
        </button>
    </div>
    )
}

export default RideListItem;