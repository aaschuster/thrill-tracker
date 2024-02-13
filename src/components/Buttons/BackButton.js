import React from "react";
import { useNavigate } from "react-router-dom";

import {BiArrowBack} from "react-icons/bi";

function BackButton() {

    const navigate = useNavigate();

    return (<BiArrowBack className={"backarrow"} size="30px" onClick={() => navigate(-1)}/>);
}

export default BackButton;