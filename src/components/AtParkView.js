import React, { useState, useEffect } from "react";
import axios from "axios";

function AtParkView( {park, history, currentParkRides, setHistory} ) {

    const rides = currentParkRides;

    const serverURL = process.env.REACT_APP_SERVERURL;

    const [currentHistory, setCurrentHistory] = useState([]);

    function quickAdd(rides_id) {
        const timestamp = new Date().toLocaleString([], {dateStyle: "short", timeStyle: "short"});
        const record = {rides_id, timestamp}
        axios.post(`${serverURL}/history`, record);
        setHistory([...history, record])
    }

    function getCurrentHistory() {

        const newCurrent = [];

        history.forEach( (record, idx) => {
            let showRecord = false;
            let i = 0;

            const [date, time] = record.timestamp.split(", ");

            while(i<rides.length && showRecord === false) {
                if(rides[i].rides_id === record.rides_id && date === new Date().toLocaleString([], {dateStyle: "short"})) {
                    showRecord = true;
                    newCurrent.push({...rides[i], timeonly: time});
                }
                i++;
            }
        })

        setCurrentHistory(newCurrent);
    }

    useEffect(() => {
        getCurrentHistory();
    }, [history, currentParkRides])

    return (
        <div>
            <h2>{park.name}</h2>
            <div className={"history"}>
            {
                currentHistory.map( (record, idx) => {
                    return (
                        <div key={idx}>{record.name} - {record.timeonly}</div>
                    )
                })
            }
            </div>
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