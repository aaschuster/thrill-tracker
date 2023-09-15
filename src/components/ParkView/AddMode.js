import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { addRecord } from "../../actions/historyActions";

function AddMode( {currentHistory, currentTotals, currentRides, addRecord} ) {

    const [totalsView, setTotalsView] = useState(false);

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const historyRef = useRef(null);

    function quickAdd(rides_id) {
        const timestamp = new Date().toLocaleString([], {dateStyle: "short", timeStyle: "short"});
        const record = {rides_id, timestamp}
        addRecord(record);
    }

    useEffect(() => {
        historyRef.current?.scrollBy(0, historyRef.current.scrollHeight); //scroll to bottom whenever new record added
    }, [currentHistory])

    return (
        <div>
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
                <button onClick={() => navigate(`${pathname}/edit`)}>Edit mode</button>
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
        </div>  
    )
}

export default connect(null, {addRecord})(AddMode);