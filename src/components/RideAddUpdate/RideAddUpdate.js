import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Dialog from "@mui/material/Dialog";

import BackButton from "../BackButton";

import SeatMap from "./SeatMap";

import { AiFillQuestionCircle } from "react-icons/ai"

import { addRecord, updateRecord } from "../../actions/historyActions";

import "../../styles/RideAddUpdate.css";

function RideAddUpdate( { rides, history, addRecord, updateRecord } ) {

    let { rideId, historyId } = useParams();
    rideId = parseInt(rideId);
    const historyInt = parseInt(historyId);

    const navigate = useNavigate();

    const date = new Date().toLocaleDateString([], {year: "2-digit", month: "numeric", day: "numeric"});
    const editMode = historyId !== "add";

    const initForm = {
        row: "",
        seat: "",
        time: (new Date()).toLocaleTimeString([], { hourCycle: "h23", timeStyle: "short" }),
        notes: ""
    }

    const [showSeatSelect, setShowSeatSelect] = useState(true);
    const [seatMapView, setSeatMapView] = useState(false);
    const [ride, setRide] = useState({});
    const [seatArr, setSeatArr] = useState([]);
    const [record, setRecord] = useState(null);
    const [form, setForm] = useState(initForm);
    const [dialogOpen, setDialogOpen] = useState(false);

    function onChange(evt) {
        const {target} = evt;
        setForm({...form, [target.id]: target.value});
    }

    function onSubmit(evt) {
        evt.preventDefault();

        let newDate = date;
        
        if(editMode) {
            const [recordDate, recordTime] = record.timestamp.split(", ");
            newDate = recordDate;
        }
        
        const newTimestamp = new Date (`${newDate} ${form.time}`)

        const newRecord = {
            rides_id: ride.rides_id,
            timestamp: `${newDate}, ${newTimestamp.toLocaleTimeString([], { hour: "numeric", minute: "numeric" })}`,
            notes: form.notes,
            row: form.row,
            seat: form.seat
        };

        if(editMode) updateRecord(newRecord, historyInt);
        else addRecord(newRecord);
        navigate(-1);
    }

    function checkSeat(row, seat) {
        if(form.row && form.seat) {
            return (form.seat === seat && form.row === row);
        }
        return false;
    }

    function seatOnClick(row, seat) {
        if(checkSeat(row, seat))
            setForm({...form, row: "", seat: ""});
        else
            setForm({...form, row: row, seat: seat});
    }

    useEffect(() => {
        const [currentRide] = rides.filter( ride => ride.rides_id === rideId);
        setRide(currentRide);

        if(editMode) {
            const [currentRecord] = history.filter( 
                historyItem => 
                    historyItem.history_id === historyInt
            );
            setRecord(currentRecord);
        }

    }, [rideId, rides, historyId, history])

    useEffect(() => {
        if(ride && ride.rows) {
            let row = [];
            let seatMap = [];

            if(ride.rows && ride.seats) {
                for(let i = 1; i<=ride.seats; i++) {
                    row.push(i);
                }

                for(let i = 1; i<=ride.rows; i++) {
                    seatMap.push(row);
                }
            }
            
            setSeatArr(seatMap);
        }
    }, [ride])

    useEffect(() => {
        if(record) {
            const recordTimestamp = new Date(record.timestamp);
            setForm({
                row: record.row || "",
                seat: record.seat || "",
                time: recordTimestamp.toLocaleTimeString([], { hourCycle: "h23", timeStyle: "short" }),
                notes: record.notes || ""
            })
        }
    }, [record])

    return (
        <div className="rideaddcontainer"> 
        {
            ride ?
            <div className="rideadd" >
                <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
                    <div className="quicktip dialog">
                        <p>Count from left for seat numbers.</p>
                        <p>Example: On a 4 across train the leftmost seat is #1 and the rightmost seat is #4.</p>
                        <button onClick={() => setDialogOpen(false)}>Close</button>
                    </div>
                </Dialog>
                <div className="rideaddupdateheader">
                    <BackButton/>
                    <h2>{ride.name}</h2>       
                </div>
                <form onSubmit={onSubmit}>
                    <button 
                        type="button" 
                        className={showSeatSelect ? "fakedisabled" : ""}
                        onClick={() => setShowSeatSelect(!showSeatSelect)}
                    >
                        Show seat select
                    </button>
                    {
                        showSeatSelect ? 
                            <> {
                            seatArr.length ? 
                                <SeatMap seatArr={seatArr} checkSeat={checkSeat} seatOnClick={seatOnClick}/>
                            :

                            <div className={"rowseatcontainer"}>
                                <label>
                                    Row number: <input type={"number"} id={"row"} value={form.row} min={1} onChange={onChange}/>
                                </label>      
                                <div className={"seatcontainer"}>
                                    <label>
                                        Seat number: <input type={"number"} id={"seat"} value={form.seat} min={1} onChange={onChange}/>
                                    </label>                    
                                    <AiFillQuestionCircle className={"questionbutton"} onClick={() => setDialogOpen(true)}/>
                                </div>  
                            </div>  
                    
                            }</>:<></>
                }
                    <input type={"time"} id={"time"} value={form.time} onChange={onChange}/>
                    <label>
                        Notes: 
                    </label>
                    <textarea id={"notes"} placeholder="Put some notes here..." value={form.notes} onChange={onChange}/>
                    <button>{editMode ? "Update" : "Add"}</button>
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