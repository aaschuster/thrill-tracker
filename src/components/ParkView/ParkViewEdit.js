import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {BiArrowBack} from "react-icons/bi";

// import "../../styles/ParkViewEdit.css";

function ParkViewEdit() {

    const { id } = useParams();

    return (
        <>ParkViewEdit{id}</>
    )
}

export default ParkViewEdit;