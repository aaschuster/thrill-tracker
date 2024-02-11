import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dialog from "@mui/material/Dialog";

import {AiFillEdit as EditIcon} from "react-icons/ai";
import {
    FaRegHeart as UnfaveIcon,
    FaHeart as FaveIcon,
    FaArrowRight as GoIcon
} from "react-icons/fa";
import {FaHouse as HouseIcon} from "react-icons/fa6";

import { clearUser } from "../actions/userActions";

import Park from "./Park";

import "../styles/ParkSelect.css";

const ParkSelect = ({ parks, isFetching, error, user, parkFavorites, clearUser }) => {

    const navigate = useNavigate();

    const [dialog, setDialog] = useState({
        open: false,
        parkID: null,
        parkName: ""
    })
    const [currentFavorite, setCurrentFavorite] = useState(null);

    useEffect(() => {
        const [currentFavoriteObj] = parkFavorites.filter(
            parkFavorite => parkFavorite.parks_id === dialog.parkID
        );
        setCurrentFavorite(currentFavoriteObj);
    }, [dialog.parkID, parkFavorites])

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
            <Dialog onClose={() => setDialog({...dialog, open: true})} open={dialog.open}>
                <div className="dialog parkselectoptions">
                    <p>{dialog.parkName}</p>
                    <button onClick={() => navigate(`/atparkview/${dialog.parkID}`)}>
                        <GoIcon className="icon goicon"/>
                        Go to park page
                    </button>
                    <button>
                        <HouseIcon className="icon homeicon"/>
                        Add as home park
                    </button>
                    <button>
                        <FaveIcon className="icon faveicon"/>
                        Favorite this park
                    </button>
                    <button onClick={() => navigate(`/addupdate/park/${dialog.parkID}`)}>
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
            {parks.map( (park, idx) => {
                return <Park 
                    park={park}
                    key={idx}
                    parkIdx={idx}
                    setDialog={setDialog}
                />;
            })} 
            <button onClick={() => navigate("/addupdate/park/add")}>Add Park</button>
        </div>
    )    
   
}

const mapStateToProps = state => {
    return {
        parks: state.parks.parks,
        isFetching: state.parks.isFetching,
        error: state.parks.error,
        user: state.user.user,
        parkFavorites: state.parkFavorites.parkFavorites
    }
}

export default connect(mapStateToProps, { clearUser })(ParkSelect);