import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Dialog from "@mui/material/Dialog";

import BackButton from "./BackButton";

import { AiFillQuestionCircle } from "react-icons/ai"

import { addRecord, updateRecord } from "../actions/historyActions";

import "../styles/RideAdd.css";

function RideAddUpdate( { rides, history, addRecord, updateRecord } ) {

    const { rideId, historyId } = useParams();

    const navigate = useNavigate();

    const date = new Date().toLocaleDateString([], {year: "2-digit", month: "numeric", day: "numeric"});

    const initForm = {
        row: "",
        seat: "",
        time: (new Date()).toLocaleTimeString([], { hourCycle: "h24", timeStyle: "short" }),
        notes: ""
    }

    const [ride, setRide] = useState({});
    const [record, setRecord] = useState({});
    const [form, setForm] = useState(initForm);
    const [dialogOpen, setDialogOpen] = useState(false);

    function onChange(evt) {
        const {target} = evt;
        setForm({...form, [target.id]: target.value});
    }

    function onSubmit(evt) {
        evt.preventDefault();
        const newTimestamp = new Date (`${date} ${form.time}`)
        addRecord({
            rides_id: ride.rides_id,
            timestamp: `${date}, ${newTimestamp.toLocaleTimeString([], { hour: "numeric", minute: "numeric" })}`,
            notes: form.notes,
            row: form.row,
            seat: form.seat
        });
        navigate(-1);
    }

    useEffect(() => {
        const [currentRide] = rides.filter( ride => ride.rides_id === parseInt(rideId));
        setRide(currentRide);

        if(historyId !== "add") {
            const [currentRecord] = history.filter( 
                historyItem => 
                    historyItem.history_id === parseInt(historyId)
            );
            setRecord(currentRecord);
        }

    }, [rideId, rides, historyId, history])

    useEffect(() => {
        if(record.history_id !== undefined) {
            const recordTimestamp = new Date(record.timestamp);
            setForm({
                row: record.row || "",
                seat: record.seat || "",
                time: recordTimestamp.toLocaleTimeString([], { hourCycle: "h24", timeStyle: "short" }),
                notes: record.notes || ""
            })
        }
    }, [record])

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
                <BackButton/>
                <h2>{ride.name}</h2>       
                <form onSubmit={onSubmit}>
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
        rides: state.rides.rides,
        history: state.history.history
    }
}

export default connect(mapStateToProps, { addRecord, updateRecord })(RideAddUpdate);