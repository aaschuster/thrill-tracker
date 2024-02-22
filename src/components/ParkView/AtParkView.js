import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";

import {AiFillEdit as EditIcon} from "react-icons/ai";
import {FaRegHeart as UnfaveIcon, FaHeart as FaveIcon} from "react-icons/fa";

import ParkViewHeader from "./ParkViewHeader";
import RideList from "./RideList";

import {addRideFavorite, delRideFavorite} from "../../actions/rideFavoritesActions";

import { filterByToday, objFromID } from "../../utils";

import "../../styles/AtParkView.css";

function AtParkView( {parks, rides, history, user, rideFavorites, addRideFavorite, delRideFavorite} ) {

    const { id } = useParams();
    
    const [parkName, setParkName] = useState("");
    const [parkID, setParkID] = useState(null);
    const [currentRides, setCurrentRides] = useState([]);
    const [currentHistory, setCurrentHistory] = useState([]);
    const [currentTotals, setCurrentTotals] = useState({});
    const [dialog, setDialog] = useState({
        open: false,
        rideID: null,
        rideName: ""
    });
    const [currentFavorite, setCurrentFavorite] = useState(null);

    const historyRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => { 
        if(parks.length > 0) {
            const currentPark = objFromID(parseInt(id), parks, "parks_id");
            setParkName(currentPark.name);
            setParkID(currentPark.update_of_parks_id ? currentPark.update_of_parks_id : currentPark.parks_id);
        }

        if(rides && parkID) {
            setCurrentRides( 
                rides.filter( 
                (ride) => ride.parks_id === parkID
                )
            )        
        }
    }, [parkID, parks, rides])

    useEffect(() => {
        getCurrentHistory();
    }, [history, currentRides])

    useEffect(() => {
        const [currentFavoriteObj] = rideFavorites.filter( 
            rideFavorite => rideFavorite.rides_id === dialog.rideID
        );
        setCurrentFavorite(currentFavoriteObj);
    }, [dialog.rideID, rideFavorites])

    function getCurrentHistory() {

        let newCurrent = [];
        const totalsObj = {};
        const totalsArr = [];

        filterByToday(history).forEach( (record, idx) => {
            let showRecord = false;
            let i = 0;

            const [date, time] = record.timestamp.split(", ");

            while(i<currentRides.length && showRecord === false) {
                if(currentRides[i].rides_id === record.rides_id) {
                    showRecord = true;
                    newCurrent.push({...currentRides[i], timeonly: time, ...record});
                    if(totalsObj[currentRides[i].rides_id])
                        totalsObj[currentRides[i].rides_id].count++;
                    else 
                        totalsObj[currentRides[i].rides_id] = {
                            name: currentRides[i].name, count: 1
                        };
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

    function favoriteClick() {
        addRideFavorite({
            users_id: user.users_id, 
            rides_id: dialog.rideID
        })
        setDialog({...dialog, open: false});
    }

    function unFavoriteClick() {
        delRideFavorite(currentFavorite)
        setDialog({...dialog, open: false});
    }

    return (
        <div className={"atparkview"}>
            <Dialog onClose={() => setDialog({...dialog, open: true})} open={dialog.open}>
                <div className="dialog parkviewoptions">
                    <p>{dialog.rideName}</p>
                    <button
                        onClick={() => navigate(`/addupdate/record/${dialog.rideID}/add`)}
                        className={"addbutton"}
                    >
                        <span className="plus">+</span>
                        Add ride record
                    </button>
                    {
                        currentFavorite ? 
                            <button onClick={unFavoriteClick}>
                                <UnfaveIcon className="faveicon icon"/>Unfavorite this ride
                            </button>
                        : 
                            <button onClick={favoriteClick}>
                                <FaveIcon className="faveicon icon"/>Favorite this ride
                            </button>
                    }
                    <button onClick={() => navigate(`/addupdate/ride/${dialog.rideID}`)}>
                        <EditIcon className="editicon icon"/> View or edit ride info
                    </button>
                    <button onClick={() => setDialog({...dialog, open: false})}>Cancel</button>
                </div>
            </Dialog>
            {parkID ? <>
                    <ParkViewHeader name={parkName} parkID={parkID}/>
                    <RideList
                        currentHistory = {currentHistory}
                        currentTotals = {currentTotals}
                        currentRides = {currentRides}
                        setDialog = {setDialog}
                    />
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
        history: state.history.history,
        user: state.user.user,
        rideFavorites: state.rideFavorites.rideFavorites
    }
}

export default connect(mapStateToProps, { addRideFavorite, delRideFavorite } )(AtParkView);