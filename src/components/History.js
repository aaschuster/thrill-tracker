import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { delRecord } from "../actions/historyActions";

import {MdDeleteForever} from "react-icons/md";
import {AiFillEdit} from "react-icons/ai";

import BackButton from "./BackButton";

import "../styles/History.css";

function History( {processedHistory, parks, rides, delRecord} ) {

    const blankRecord = {
        drop_height: null,
        duration: null,
        history_id: null,
        inversions: null,
        manufacturers_id: null,
        name: "No record selected.",
        parks_id: null,
        rides_id: null,
        timeonly: "--:-- --",
        track_length: null
    }

    const { id: parkIdx } = useParams();
    const park = parkIdx==="all" ? null : parks[parkIdx];

    const navigate = useNavigate();

    const [currentHistory, setCurrentHistory] = useState(processedHistory);

    function editOnClick(record) {
        navigate(`/addupdate/${record.rides_id}/${record.history_id}`);
    }

    useEffect(() => {
        let newHistory = processedHistory;
        if(park) {
            const currentRides = [];

            rides.forEach( ride => {
                if(ride.parks_id === park.parks_id)
                    currentRides.push(ride);
            })

            newHistory = [];

            processedHistory.forEach( record => {
                currentRides.forEach( ride => {
                    if(record.rides_id === ride.rides_id)
                        newHistory.push(record);
                })
            })
        }    
        setCurrentHistory(newHistory);
    }, [park, processedHistory])
   
    return (
        <div className={"history"}>
            <div className="historyheader">
                <BackButton/>
                <h2>History</h2>
            </div>
            <h3>{park ? park.name : ""}</h3>
            <div className="datebuttons">
                <button>All time</button>
                <button>Today</button>
            </div>
            <div className={"historyitemscontainer"}>
                {
                    currentHistory.map( (record, idx) => {
                        return (
                            <div key={idx} className={"historyitem"}>
                                <div className={"textcontainer"}>
                                    <span className={"recordname"}>{record.name}</span>
                                    <span className={"timestamp"}>{record.timestamp}</span>
                                </div>                                
                                <div className={"editbuttoncontainer"}>
                                    <AiFillEdit className={"editbutton"} onClick={() => editOnClick(record)}/>
                                    <MdDeleteForever className={"editbutton"} onClick={() => delRecord(record.history_id)}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        parks: state.parks.parks,
        processedHistory: state.history.processedHistory,
        rides: state.rides.rides
    }
}

export default connect(mapStateToProps, { delRecord })(History);