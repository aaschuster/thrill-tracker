import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { AiFillQuestionCircle } from "react-icons/ai"

import "../../styles/RideAdd.css";

function RideAdd( { rides } ) {

    const { rideId } = useParams();

    const [ride, setRide] = useState({});

    useEffect(() => {
        const [currentRide] = rides.filter( ride => ride.rides_id === parseInt(rideId));
        setRide(currentRide);
    }, [rideId, rides])

    return (
        <div className="rideaddcontainer"> 
        {
            ride ?
            <div className="rideadd">
                <h3>{ride.name}</h3>       
                <form>
                    <label>
                        Row number: <input type={"number"} id={"row"} min={1}/>
                    </label>      
                    <div className={"seatcontainer"}>
                        <label>
                            Seat number: <input type={"number"} id={"seat"} min={1}/>
                        </label>                    
                        <AiFillQuestionCircle className={"questionbutton"}/>
                    </div>              
                    <input type={"time"} id={"time"}/>
                    <label>
                        Notes: 
                    </label>
                    <textarea id={"notes"} placeholder="Put some notes here..."/>
                    <button>Add</button>
                </form>     
            </div>

            : <p>Please wait...</p>
        }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        rides: state.rides.rides
    }
}

export default connect(mapStateToProps)(RideAdd);