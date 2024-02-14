import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import Dialog from "@mui/material/Dialog";

import {AiFillEdit as EditIcon} from "react-icons/ai";
import {
    FaRegHeart as UnfaveIcon,
    FaHeart as FaveIcon,
    FaArrowRight as GoIcon
} from "react-icons/fa";
import {FaHouse as HouseIcon} from "react-icons/fa6";

import Park from "./Park";

import { delParkFavorite, addParkFavorite } from "../actions/parkFavoritesActions";
import { delHomePark, addHomePark } from "../actions/homeParksActions";

import { objFromID } from "../utils";

const ParkList = ( { 
    parks, 
    parklist,
    parkFavorites, 
    homeParks, 
    delParkFavorite,
    addParkFavorite,
    delHomePark,
    addHomePark,
    user
} ) => {

    const navigate = useNavigate();

    const [dialog, setDialog] = useState({
        open: false,
        park: {}
    })
    const [currentFavorite, setCurrentFavorite] = useState(null);
    const [currentHomePark, setCurrentHomePark] = useState(null);

    useEffect(() => {
        getCurrentParkFavorite();
        getCurrentHomePark();
    }, [dialog.park.parks_id])

    useEffect(() => {
        getCurrentParkFavorite();
    }, [parkFavorites])

    useEffect(() => {
        getCurrentHomePark();
    }, [homeParks])

    function getCurrentParkFavorite() {
        const [currentFavoriteObj] = parkFavorites.filter(
            parkFavorite => parkFavorite.parks_id === dialog.park.parks_id
        );
        setCurrentFavorite(currentFavoriteObj);
    }

    function getCurrentHomePark() {
        const [currentHomeParkObj] = homeParks.filter(
            homePark => homePark.parks_id === dialog.park.parks_id
        );
        setCurrentHomePark(currentHomeParkObj);
    }

    return (
        <div className="parklist">
            <Dialog 
                onClose={() => setDialog({...dialog, open: true})} 
                open={dialog.open}
                sx={{
                    "& .MuiDialog-container": {
                      "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "260px",
                      },
                    },
                  }}
            >
                <div className="dialog parkselectoptions">
                    <p>{dialog.park.name}</p>
                    <button onClick={() => navigate(`/atparkview/${dialog.park.parks_id}`)}>
                        <GoIcon className="icon goicon"/>
                        Go to park page
                    </button>
                    {
                        currentHomePark ?
                            <button onClick={() => delHomePark(currentHomePark)}>
                                <HouseIcon className="icon homeicon"/>
                                {
                                    homeParks.length === 1 ?
                                    "Remove as home park" : "Remove from home parks"
                                }                                
                            </button>
                        :
                            <button onClick={() => addHomePark({
                                users_id: user.users_id,
                                parks_id: dialog.park.parks_id
                            })}>
                                <HouseIcon className="icon homeicon"/>
                                Add as home park
                            </button>
                    }
                    {
                        currentFavorite ?
                            <button onClick={() => delParkFavorite(currentFavorite)}>
                                <UnfaveIcon className="icon faveicon"/>
                                Unfavorite this park
                            </button>
                        :
                        <button onClick={() => addParkFavorite({
                            users_id: user.users_id,
                            parks_id: dialog.park.parks_id
                        })}>
                            <FaveIcon className="icon faveicon"/>
                            Favorite this park
                        </button>
                    }
                    <button onClick={() => navigate(`/addupdate/park/${dialog.park.parks_id}`)}>
                        <EditIcon className="icon faveicon"/>
                        View or edit park info
                    </button>
                    <button onClick={() => setDialog({...dialog, open: false})}>Cancel</button>
                </div>
            </Dialog>
            {
                parklist.map( (park, idx) => {
                    return <Park
                        park={objFromID(park.parks_id, parks, "parks_id")}
                        key={idx}
                        setDialog={setDialog}
                    />;
                })
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        parks: state.parks.parks,
        parkFavorites: state.parkFavorites.parkFavorites,
        homeParks: state.homeParks.homeParks,
        user: state.user.user
    }
}

export default connect(
    mapStateToProps, {
        delParkFavorite,
        addParkFavorite,
        delHomePark,
        addHomePark
    }
)(ParkList);