import React from "react";

import BackButton from "./BackButton";

import "../styles/MainHeader.css";

function MainHeader() {
    return (
        <div className="mainheader">
            <BackButton/>
            <h1>ThrillTracker.com</h1>
        </div>
    )
}

export default MainHeader;