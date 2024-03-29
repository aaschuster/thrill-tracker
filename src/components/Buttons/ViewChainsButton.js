import React from "react";

import { useNavigate } from "react-router-dom";

function ViewChainsButton() {

    const navigate = useNavigate();

    return (
        <button onClick={() => navigate("/chains")}>
            View parks by chain
        </button>
    )
}

export default ViewChainsButton;