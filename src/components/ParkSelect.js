import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { setUser } from "../actions/loginActions";

import Park from "./Park";

import "../styles/ParkSelect.css";

const ParkSelect = props => {

    const { parks, isFetching, error, user } = props;

    const navigate = useNavigate();

    function onClick(parkIdx) {
        navigate(`/atparkview/${parkIdx}`);
    }

    function logout() {
        axios.get(`${process.env.REACT_APP_SERVERURL}/users/logout`)
            .then( res => {
                navigate("/");
            })
            .catch( err => console.error(err));
    }

    return (
        <div className="parkselect">
            <div className="loggedincontainer">
                <p>Logged in as {user.username}</p> <button onClick={logout}>Logout</button>
            </div>
            <h1>ThrillTracker.com</h1>
            <input placeholder="Search..."/>
            {parks.map( (park, idx) => {
                return <Park park={park} key={idx} onClick={() => onClick(idx)}/>;
            })} 
        </div>
    )    
   
}

const mapStateToProps = state => {
    return {
        parks: state.parks.parks,
        isFetching: state.parks.isFetching,
        error: state.parks.error,
        user: state.login.user
    }
}

export default connect(mapStateToProps, { setUser })(ParkSelect);