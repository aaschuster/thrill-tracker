import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

const Login = () => {

    const navigate = useNavigate();

    return (
        <div className="login">
            <h1>ThrillTracker.com</h1>
            <form>
                <div className="logininputs">
                    <input placeholder="Email..."/>
                    <input placeholder="Password..."/>
                    <button>Login</button>
                </div>
                <div className="otherbuttons">
                    <button type="button">Create account</button>
                    <button type="button" onClick={() => navigate("/parkselect")}>Continue without signing in</button>
                </div>
            </form>
        </div>
    )
}

export default Login;