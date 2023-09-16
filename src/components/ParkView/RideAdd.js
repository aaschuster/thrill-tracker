import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Dialog from "@mui/material/Dialog";

import { AiFillQuestionCircle } from "react-icons/ai"

import "../../styles/RideAdd.css";

function RideAdd( { rides } ) {

    const { rideId } = useParams();

    const initForm = {
        row: null,
        seat: null,
        time: (new Date()).toLocaleTimeString([], { hourCycle: "h24", timeStyle: "short" }),
        notes: ""
    }

    const [ride, setRide] = useState({});
    const [form, setForm] = useState(initForm);
    const [dialogOpen, setDialogOpen] = useState(false);

    function onChange(evt) {
        const {target} = evt;
        setForm({...form, [target.id]: target.value});
    }

    useEffect(() => {
        const [currentRide] = rides.filter( ride => ride.rides_id === parseInt(rideId));
        setRide(currentRide);
    }, [rideId, rides])

    return (
        <div className="rideaddcontainer"> 
        {
            ride ?
            <div className="rideadd">
                <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
                    <div className="quicktip dialog">
                        <p>Count from left for seat numbers.</p>
                        <p>Example: On a 4 across train the leftmost seat is #1 and the rightmost seat is #4.</p>
                        <button onClick={() => setDialogOpen(false)}>Close</button>
                    </div>
                </Dialog>
                <h3>{ride.name}</h3>       
                <form>
                    <label>
                        Row number: <input type={"number"} id={"row"} value={form.row} min={1} onChange={onChange}/>
                    </label>      
                    <div className={"seatcontainer"}>
                        <label>
                            Seat number: <input type={"number"} id={"seat"} value={form.seat} min={1} onChange={onChange}/>
                        </label>                    
                        <AiFillQuestionCircle className={"questionbutton"} onClick={() => setDialogOpen(true)}/>
                    </div>              
                    <input type={"time"} id={"time"} value={form.time} onChange={onChange}/>
                    <label>
                        Notes: 
                    </label>
                    <textarea id={"notes"} placeholder="Put some notes here..." value={form.notes} onChange={onChange}/>
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