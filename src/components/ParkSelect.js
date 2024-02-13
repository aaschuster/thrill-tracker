import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dialog from "@mui/material/Dialog";

import {AiFillEdit as EditIcon} from "react-icons/ai";
import {
    FaRegHeart as UnfaveIcon,
    FaHeart as FaveIcon,
    FaArrowRight as GoIcon,
    FaSearch as SearchIcon
} from "react-icons/fa";
import {FaHouse as HouseIcon} from "react-icons/fa6";

import { clearUser } from "../actions/userActions";
import { delParkFavorite, addParkFavorite } from "../actions/parkFavoritesActions";
import { delHomePark, addHomePark } from "../actions/homeParksActions";

import Park from "./Park";

import AddParkButton from "./Buttons/AddParkButton";
import ViewChainsButton from "./Buttons/ViewChainsButton";

import { objFromID } from "../utils";

import "../styles/ParkSelect.css";

const ParkSelect = ({ 
    parks, 
    isFetching, 
    error, 
    user, 
    parkFavorites, 
    clearUser, 
    delParkFavorite, 
    addParkFavorite,
    homeParks,
    delHomePark,
    addHomePark
}) => {

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

    function logout() {
        axios.get(`${process.env.REACT_APP_SERVERURL}/users/logout`)
            .then( res => {
                clearUser();
                navigate("/");
            })
            .catch( err => console.error(err));
    }

    return (
        <div className="parkselect">
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
            <div className="accountcontainer">
                <p>Logged in as {user.username}</p> 
                <div className="accountbuttons">
                    <button onClick={() => navigate("/history/all")}>History</button>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
            <h1>ThrillTracker.com</h1>
            {
                homeParks.length > 0 ?
                    <div className="homeparks">
                        <div className="homeparksheader">
                            <HouseIcon className="icon homeicon"/>
                            <h3>Home park{homeParks.length === 1 ? "" : "s"}</h3>
                        </div>
                        {
                            homeParks.map( (homePark, idx) => {
                                return <Park 
                                    park={objFromID(homePark.parks_id, parks, "parks_id")}
                                    key={idx}
                                    setDialog={setDialog}
                                />;
                            })
                        }
                    </div>
                : <></>
            }
            {
                parkFavorites.length > 0 ?
                    <div className="favoriteparks">
                        <div className="favoriteparksheader">
                            <FaveIcon className="icon faveicon"/>
                            <h3>Favorites</h3>
                        </div>
                        {
                            parkFavorites.map( (favoritePark, idx) => {
                                return <Park
                                    park={objFromID(favoritePark.parks_id, parks, "parks_id")}
                                    key={idx}
                                    setDialog={setDialog}
                                />;
                            })
                        }
                        <hr/>
                    </div>
                : <></>
            }
            <div className="buttonlist">
                <button 
                    className="searchbutton"
                    onClick={() => navigate("/search")}    
                >
                    <SearchIcon className="icon searchicon"/>
                    Search by park name
                </button>
                <ViewChainsButton/>
                <AddParkButton/>
            </div>
        </div>
    )    
   
}

const mapStateToProps = state => {
    return {
        parks: state.parks.parks,
        isFetching: state.parks.isFetching,
        error: state.parks.error,
        user: state.user.user,
        parkFavorites: state.parkFavorites.parkFavorites,
        homeParks: state.homeParks.homeParks
    }
}

export default connect(
    mapStateToProps, { 
        clearUser, 
        delParkFavorite, 
        addParkFavorite,
        delHomePark,
        addHomePark
    }
)(ParkSelect);