import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Routes, Route, useParams } from "react-router-dom";

import ParkViewHeader from "./ParkViewHeader";
import RideList from "./RideList";
import EditMode from "./EditMode";
import RideAdd from "./RideAdd";

import "../../styles/AtParkView.css";

function AtParkView( {parks, rides, history} ) {

    const { id: parkIdx } = useParams();

    const park = parks[parkIdx];

    const [currentRides, setCurrentRides] = useState([]);
    const [currentHistory, setCurrentHistory] = useState([]);
    const [currentTotals, setCurrentTotals] = useState({});

    const historyRef = useRef(null);

    useEffect(() => {  
        if(rides && parks[parkIdx]) {
            setCurrentRides( 
                rides.filter( 
                (ride) => ride.parks_id === parks[parkIdx].parks_id 
                )
            )        
        }
    }, [parks, rides])

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
                    newCurrent.push({...currentRides[i], timeonly: time, ...record});
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

        newCurrent.sort( (a, b) => {
            return b.timeonly > a.timeonly ? -1 : 1;
        })

        setCurrentHistory(newCurrent);
        setCurrentTotals(totalsArr);
    }

    useEffect(() => {
        getCurrentHistory();
    }, [history, currentRides])

    return (
        <div className={"atparkview"}>
            {park ? <>
                    <ParkViewHeader name={park.name}/>
                    <Routes>
                        <Route path="/" exact element={
                            <RideList
                                currentHistory = {currentHistory}
                                currentTotals = {currentTotals}
                                currentRides = {currentRides}
                            />
                        }/>
                        <Route path="/edit" element={
                            <EditMode
                                currentHistory = {currentHistory}
                            />
                        }/>
                        <Route path="/:rideId" element={
                            <RideAdd/>
                        }/>
                    </Routes>
                </>
                :
                <p>Please wait...</p>
            }
                
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        parks: state.parks.parks,
        rides: state.rides.rides,
        history: state.history.history
    }
}

export default connect(mapStateToProps)(AtParkView);