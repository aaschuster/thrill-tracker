import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function AtParkView( {park, history, currentParkRides, setHistory} ) {

    const rides = currentParkRides;

    const serverURL = process.env.REACT_APP_SERVERURL;

    const [currentHistory, setCurrentHistory] = useState([]);
    const [currentTotals, setCurrentTotals] = useState({});
    const [totalsView, setTotalsView] = useState(false);

    const historyRef = useRef(null);

    function quickAdd(rides_id) {
        const timestamp = new Date().toLocaleString([], {dateStyle: "short", timeStyle: "short"});
        const record = {rides_id, timestamp}
        axios.post(`${serverURL}/history`, record);
        setHistory([...history, record])
    }

    function getCurrentHistory() {

        const newCurrent = [];
        const newTotals = {};

        history.forEach( (record, idx) => {
            let showRecord = false;
            let i = 0;

            const [date, time] = record.timestamp.split(", ");

            while(i<rides.length && showRecord === false) {
                if(rides[i].rides_id === record.rides_id && date === new Date().toLocaleString([], {dateStyle: "short"})) {
                    showRecord = true;
                    newCurrent.push({...rides[i], timeonly: time});
                    if(newTotals[rides[i].rides_id])
                        newTotals[rides[i].rides_id].count++;
                    else 
                        newTotals[rides[i].rides_id] = {name: rides[i].name, count: 1};
                }
                i++;
            }
        })

        setCurrentHistory(newCurrent);
        setCurrentTotals(newTotals);
    }

    useEffect(() => {
        getCurrentHistory();
    }, [history, currentParkRides])

    useEffect(() => {
        historyRef.current?.scrollBy(0, historyRef.current.scrollHeight); //scroll to bottom whenever new record added
    }, [currentHistory])

    return (
        <div className={"atparkview"}>
            <h2>{park.name}</h2>
            <p>Today's rides:</p>
            {
                !totalsView ? 
                <div className={"history"} ref={historyRef}>
                    <div className={"spacer"}></div>
                    {
                        currentHistory.map( (record, idx) => {
                            return (
                                <div key={idx} className={"record"}>
                                    <div className={"ridename"}>{record.name}</div>
                                    <div className={"timestamp"}>{record.timeonly}</div>
                                </div>
                            )
                        })
                    }
                </div>
                 : 
                <div className={"totals"}>
                    {
                        Object.keys(currentTotals).map(( key ) => {
                            return (
                                <div key={key}>
                                    {currentTotals[key].name} - {currentTotals[key].count}
                                </div>
                            )
                        })
                    }
                </div>
            }
            <button onClick={() => {
                setTotalsView(!totalsView)
            }}>
                {totalsView ? <>View by times</>:<>View by totals</>}
            </button>
            <div>
            {
                rides.map( (ride, idx) => {
                        return (
                            <div key={idx}>
                                <p>{ride.name}</p>
                                <button onClick={() => quickAdd(ride.rides_id)}>Add</button>
                            </div>
                        );
                })
            }
            </div>
            
        </div>
    )
}

export default AtParkView;