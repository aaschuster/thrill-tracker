import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Login.css";

const serverURL = process.env.REACT_APP_SERVERURL;

const Login = () => {

    const navigate = useNavigate();

    const initForm = {
        username: "",
        password: ""
    }

    const [form, setForm] = useState(initForm);

    function onChange(evt) {
        const {target} = evt;
        setForm({...form, [target.id]: target.value})
    }

    function onSubmit(evt) {

        evt.preventDefault();

        axios.post(`${serverURL}/users/login/`, {username: form.username, password: form.password})
            .then( res => {
                console.log(res);
                navigate("/parkselect")
            })
            .catch( err => console.error(err));
    }

    return (
        <div className="login">
            <h1>ThrillTracker.com</h1>
            <form onSubmit={onSubmit}>
                <div className="logininputs">
                    <input id="username" placeholder="Username..." onChange={onChange} value={form.username}/>
                    <input type="password" id="password" placeholder="Password..." onChange={onChange} value={form.password}/>
                    <button>Login</button>
                </div>
                <div className="otherbuttons">
                    <button type="button" onClick={() => navigate("/createaccount")}>Create account</button>
                    <button type="button" onClick={() => navigate("/parkselect")}>Continue without signing in</button>
                </div>
            </form>
        </div>
    )
}

export default Login;