import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";

import {FaHeart as FaveIcon} from "react-icons/fa";

import RideListItem from "./RideListItem";

import { addRecord } from "../../actions/historyActions";

function RideList( {
    currentHistory, 
    currentTotals, 
    currentRides, 
    setDialog,
    user, 
    rideFavorites,
    addRecord
} ) {

    const [totalsView, setTotalsView] = useState(false);
    const [currentFavorites, setCurrentFavorites] = useState([]);
    const [currentNonfavorites, setCurrentNonfavorites] = useState([]);

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

    useEffect(() => {

        const favoritesList = [];
        const nonfavoritesList = [];

        currentRides.forEach( ride => {
            if(
                rideFavorites.filter( 
                    rideFavorite => rideFavorite.rides_id === ride.rides_id
                ).length > 0
            ) {
                favoritesList.push(ride);
            } else {
                nonfavoritesList.push(ride);
            }
        })
        
        setCurrentFavorites(favoritesList);
        setCurrentNonfavorites(nonfavoritesList);

    }, [rideFavorites, currentRides])

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
            
            {
                currentFavorites.length > 0 ?
                    <div className="ridefavorites">
                        <div className="ridefavoritesheader">
                            <FaveIcon className="faveicon"/>
                            <h3>Favorites</h3>
                        </div>
                        {
                            currentFavorites.map( (ride, idx) => {
                                return <RideListItem
                                    ride={ride}
                                    key={idx}
                                    setDialog={setDialog}
                                    quickAdd={quickAdd}
                                />;
                            })
                        }
                        <hr/>
                    </div>
                : <></>
            }

            <div className="ridelist">
                {
                    currentNonfavorites.map( (ride, idx) => {
                            return <RideListItem 
                                ride={ride}
                                key={idx}
                                setDialog={setDialog}
                                quickAdd={quickAdd}
                            />;
                    })
                }
            </div>
        </div>  
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        rideFavorites: state.rideFavorites.rideFavorites
    }
}

export default connect(mapStateToProps, {addRecord})(RideList);