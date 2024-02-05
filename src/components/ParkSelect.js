import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { clearUser } from "../actions/userActions";

import Park from "./Park";

import "../styles/ParkSelect.css";

const ParkSelect = props => {

    const { parks, isFetching, error, user, clearUser } = props;

    const navigate = useNavigate();

    function onClick(parkIdx) {
        navigate(`/atparkview/${parkIdx}`);
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
            <div className="accountcontainer">
                <p>Logged in as {user.username}</p> 
                <div className="accountbuttons">
                    <button onClick={() => navigate("/history/all")}>History</button>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
            <h1>ThrillTracker.com</h1>
            {parks.map( (park, idx) => {
                return <Park park={park} key={idx} parkNameClick={() => onClick(idx)}/>;
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
        user: state.user.user
    }
}

export default connect(mapStateToProps, { clearUser })(ParkSelect);