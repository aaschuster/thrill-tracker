import React from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/AddParkButton.css";

function AddParkButton() {
    const navigate = useNavigate();

    return (
        <button 
            onClick={() => navigate("/addupdate/park/add")} 
            className="addparkbutton"
        >
            <span className="plus">+</span>Add park
        </button>
    )
}

export default AddParkButton;