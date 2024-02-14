import React from "react";

import {useNavigate} from "react-router-dom";

import { FaHouse as HouseIcon } from "react-icons/fa6";

import "../../styles/HomeButton.css";

function HomeButton() {
    const navigate = useNavigate();

    return (
        <button 
            onClick={() => navigate("/")}
            className="homebutton"
        >
            <HouseIcon className="icon homeicon"/>
        </button>
    )
}

export default HomeButton;