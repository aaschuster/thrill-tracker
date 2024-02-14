import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Dialog from "@mui/material/Dialog";

import BackButton from "../../Buttons/BackButton";
import HomeButton from "../../Buttons/HomeButton";

import SeatMap from "./SeatMap";

import { AiFillQuestionCircle } from "react-icons/ai"

import { addRecord, updateRecord } from "../../../actions/historyActions";

import "../../../styles/RecordAddUpdate.css";

function RecordAddUpdate( { rides, history, user, addRecord, updateRecord } ) {

    let { rideId, historyId } = useParams();
    rideId = parseInt(rideId);
    const historyInt = parseInt(historyId);

    const navigate = useNavigate();

    const now = new Date();
    const editMode = historyId !== "add";

    const initForm = {
        row: "",
        seat: "",
        time: inputFormat(now),
        notes: ""
    }

    const [seatMapView, setSeatMapView] = useState(false);
    const [ride, setRide] = useState({});
    const [seatArr, setSeatArr] = useState([]);
    const [record, setRecord] = useState(null);
    const [form, setForm] = useState(initForm);
    const [dialogOpen, setDialogOpen] = useState(false);

    function inputFormat(date) {
        return `${
            date.getFullYear()}-${
            leadingZero(date.getMonth()+1)}-${
            leadingZero(date.getDate())}T${
            leadingZero(date.getHours())}:${
            leadingZero(date.getMinutes())}`;
    }

    function onChange(evt) {
        const {target} = evt;
        setForm({...form, [target.id]: target.value});
    }

    function onSubmit(evt) {
        evt.preventDefault();
        
        const newTimestamp = new Date(form.time);

        const newRecord = {
            rides_id: ride.rides_id,
            timestamp: newTimestamp.toLocaleString([], {dateStyle: "short", timeStyle: "short"}),
            notes: form.notes,
            row: form.row,
            seat: form.seat,
            users_id: user.users_id
        };

        if(editMode) updateRecord({...newRecord, history_id: record.history_id});
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
                setSeatMapView(true);
            }
            
            setSeatArr(seatMap);
        }
    }, [ride])

    function leadingZero(num) {
        if(num < 10)
            return "0" + num;
        return num;
    }

    useEffect(() => {
        if(record) {        
            setForm({
                row: record.row || "",
                seat: record.seat || "",
                time: inputFormat(new Date(record.timestamp)),
                notes: record.notes || ""
            })
        }
    }, [record])

    return (
        <div className="recordaddupdatecontainer"> 
        {
            ride ?
            <div className="recordaddupdate" >
                <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
                    <div className="quicktip dialog">
                        <p>Count from left for seat numbers.</p>
                        <p>Example: On a 4 across train the leftmost seat is #1 and the rightmost seat is #4.</p>
                        <button onClick={() => setDialogOpen(false)}>Close</button>
                    </div>
                </Dialog>
                <div className="recordaddupdateupdateheader">
                    <BackButton/>
                    <h2>{ride.name}</h2>    
                    <HomeButton/>   
                </div>
                <form onSubmit={onSubmit}>
                    
                    <div className="seatselectcontainer"> 
                        {
                            seatArr.length ? 
                                <button 
                                    type="button"
                                    className={`togglebutton ${seatMapView ? "fakedisabled":""}`}
                                    onClick={() => setSeatMapView(!seatMapView)}
                                >
                                    Show seat map
                                </button>
                                :
                                <></>
                        } 
                        <div>
                            {
                            seatMapView ?
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
                            }
                        </div>
                    </div>
                    
                    <input type={"datetime-local"} id={"time"} value={form.time} onChange={onChange}/>
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
        history: state.history.history,
        user: state.user.user
    }
}

export default connect(mapStateToProps, { addRecord, updateRecord })(RecordAddUpdate);