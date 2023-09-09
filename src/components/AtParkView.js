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
        const totalsObj = {};
        const totalsArr = [];

        history.forEach( (record, idx) => {
            let showRecord = false;
            let i = 0;

            const [date, time] = record.timestamp.split(", ");

            while(i<rides.length && showRecord === false) {
                if(rides[i].rides_id === record.rides_id && date === new Date().toLocaleString([], {dateStyle: "short"})) {
                    showRecord = true;
                    newCurrent.push({...rides[i], timeonly: time});
                    if(totalsObj[rides[i].rides_id])
                        totalsObj[rides[i].rides_id].count++;
                    else 
                        totalsObj[rides[i].rides_id] = {name: rides[i].name, count: 1};
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
    }, [history, currentParkRides])

    useEffect(() => {
        historyRef.current?.scrollBy(0, historyRef.current.scrollHeight); //scroll to bottom whenever new record added
    }, [currentHistory])

    return (
        <div className={"atparkview"}>
            <h2>{park.name}</h2>
            <h3>Today's rides:</h3>
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
                {/* <button className={"viewtoggle"} onClick={() => {
                            setTotalsView(!totalsView)
                        }}>
                            Toggle view
                </button> */}
                <button 
                    disabled={totalsView} 
                    onClick={() => setTotalsView(true)}
                >
                    View by times
                </button>
                <button 
                    disabled={!totalsView} 
                    onClick={() => setTotalsView(false)}
                >
                    View by totals</button>
                <button>Edit mode</button>
            </div>

            <div>
            {
                rides.map( (ride, idx) => {
                        return (
                            <div key={idx} className={"ridecontainer"}>
                                <button className={"ridename"}>{ride.name}</button>
                                <button className={"quickadd"} onClick={() => quickAdd(ride.rides_id)}>Add</button>
                            </div>
                        );
                })
            }
            </div>
            
        </div>
    )
}

export default AtParkView;