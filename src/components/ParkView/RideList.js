import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { addRecord } from "../../actions/historyActions";

function RideList( {
    currentHistory, 
    currentTotals, 
    currentRides, 
    setDialog,
    user, 
    addRecord
} ) {

    const [totalsView, setTotalsView] = useState(false);

    const navigate = useNavigate();
    const historyRef = useRef(null);

    const { id } = useParams();

    function quickAdd(rides_id) {
        const timestamp = new Date().toLocaleString([], {dateStyle: "short", timeStyle: "short"});
        const record = {rides_id, timestamp, users_id: user.users_id}
        addRecord(record);
    }

    useEffect(() => {
        historyRef.current?.scrollBy(0, historyRef.current.scrollHeight); //scroll to bottom whenever new record added
    }, [currentHistory])

    return (
        <div className={"addmode"}>
            <h3>Today's rides:</h3>
            <div className="historycontainer">
                    <h4 className="viewlabel">{totalsView ? "By times" : "Totals"} view</h4>
                    <hr/>
                    {
                        !totalsView ?
                        <div className={"historyitemscontainer"} ref={historyRef}>
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
                    <div className={"historyitemscontainer totals"}>
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
                <button onClick={() => navigate(`/history/${id}`)}>Edit mode</button>
            </div>

            <div className="ridelist">
            {
                currentRides.map( (ride, idx) => {
                        return (
                            <div key={idx} className={"ridecontainer"}>

                                <button 
                                    className={"ridename"} 
                                    onClick={() => setDialog({open: true, rideID: ride.rides_id, rideName: ride.name})}
                                >
                                    {ride.name}
                                </button>

                                <button 
                                    className={"quickadd plus"} 
                                    onClick={() => quickAdd(ride.rides_id)}
                                >
                                    <span className="plus">+</span>
                                </button>
                            </div>
                        );
                })
            }
            </div>
        </div>  
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps, {addRecord})(RideList);