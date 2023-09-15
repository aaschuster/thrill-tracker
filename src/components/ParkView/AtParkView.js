import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { addRecord } from "../../actions/historyActions";

import ParkViewHeader from "./ParkViewHeader";

import "../../styles/AtParkView.css";

function AtParkView( {parks, rides, history, addRecord} ) {

    const { id: parkIdx } = useParams();

    const park = parks[parkIdx];

    const serverURL = process.env.REACT_APP_SERVERURL;
    const [currentRides, setCurrentRides] = useState([]);
    const [currentHistory, setCurrentHistory] = useState([]);
    const [currentTotals, setCurrentTotals] = useState({});
    const [totalsView, setTotalsView] = useState(false);

    const historyRef = useRef(null);

    useEffect(() => {  
        setCurrentRides( 
            rides.filter( 
            (ride) => ride.parks_id === parks[parkIdx].parks_id 
            )
        )        
    }, [parks, rides])

    function quickAdd(rides_id) {
        const timestamp = new Date().toLocaleString([], {dateStyle: "short", timeStyle: "short"});
        const record = {rides_id, timestamp}
        axios.post(`${serverURL}/history`, record);
        addRecord(record);
    }

    function getCurrentHistory() {

        const newCurrent = [];
        const totalsObj = {};
        const totalsArr = [];

        history.forEach( (record, idx) => {
            let showRecord = false;
            let i = 0;

            const [date, time] = record.timestamp.split(", ");

            while(i<currentRides.length && showRecord === false) {
                if(currentRides[i].rides_id === record.rides_id && date === new Date().toLocaleString([], {dateStyle: "short"})) {
                    showRecord = true;
                    newCurrent.push({...currentRides[i], timeonly: time});
                    if(totalsObj[currentRides[i].rides_id])
                        totalsObj[currentRides[i].rides_id].count++;
                    else 
                        totalsObj[currentRides[i].rides_id] = {name: currentRides[i].name, count: 1};
                }
                i++;
            }
        })

        Object.keys(totalsObj).map( (key) => {
            totalsArr.push(totalsObj[key]);
        })

        totalsArr.sort( (a, b) => {
            return b.count - a.count;
        });

        setCurrentHistory(newCurrent);
        setCurrentTotals(totalsArr);
    }

    useEffect(() => {
        getCurrentHistory();
    }, [history, currentRides])

    useEffect(() => {
        historyRef.current?.scrollBy(0, historyRef.current.scrollHeight); //scroll to bottom whenever new record added
    }, [currentHistory])

    return (
        park ?
        <div className={"atparkview"}>
            <ParkViewHeader name={park.name}/>
                <div>
                    <h4 className="viewlabel">{totalsView ? "By times" : "Totals"} view</h4>
                    <hr/>
                    {
                        !totalsView ?
                        <div className={"history"} ref={historyRef}>
                            <div className={"spacer"}></div>
                            {
                                currentHistory.map( (record, idx) => {
                                    return (
                                        <div key={idx} className={"historyitem"}>
                                            <div className={"recordname"}>{record.name}</div>
                                            <div className={"timestamp"}>{record.timeonly}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    : 
                    <div className={"history totals"}>
                        {
                            Object.keys(currentTotals).map(( key ) => {
                                return (
                                    <div key={key} className={"historyitem"}>
                                        <div>{currentTotals[key].name}</div>
                                        <div>{currentTotals[key].count}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
            <div className={"viewbuttons"}>
                <button 
                    disabled={!totalsView} 
                    onClick={() => setTotalsView(false)}
                >
                    View by times
                </button>
                <button 
                    disabled={totalsView} 
                    onClick={() => setTotalsView(true)}
                >
                    View by totals</button>
                <button>Edit mode</button>
            </div>

            <div>
            {
                currentRides.map( (ride, idx) => {
                        return (
                            <div key={idx} className={"ridecontainer"}>
                                <button className={"ridename"}>{ride.name}</button>
                                <button className={"quickadd"} onClick={() => quickAdd(ride.rides_id)}>Add</button>
                            </div>
                        );
                })
            }
            </div>
            
        </div> : <></>
    )
}

const mapStateToProps = state => {
    return {
        parks: state.parks.parks,
        rides: state.rides.rides,
        history: state.history.history
    }
}

export default connect(mapStateToProps, {addRecord})(AtParkView);