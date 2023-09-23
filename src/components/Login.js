import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { setMessage, setUser } from "../actions/loginActions";

import "../styles/Login.css";

const serverURL = process.env.REACT_APP_SERVERURL;

const Login = ( { message, setMessage, setUser } ) => {

    const navigate = useNavigate();

    const initForm = {
        username: "",
        password: ""
    }

    const [form, setForm] = useState(initForm);

    function onChange(evt) {
        const {target} = evt;
        setForm({...form, [target.id]: target.value})
        setMessage("");
    }

    function onSubmit(evt) {

        evt.preventDefault();

        axios.post(`${serverURL}/users/login/`, {username: form.username, password: form.password})
            .then( res => {
                setUser(res.data.user);
                navigate("/parkselect")
            })
            .catch( err => {
                setMessage(err.response.data.message);
            });
    }

    return (
        <div className="login">
            <h1>ThrillTracker.com</h1>
            <form onSubmit={onSubmit}>
                <div className="logininputs">
                    <input id="username" placeholder="Username..." onChange={onChange} value={form.username}/>
                    <input type="password" id="password" placeholder="Password..." onChange={onChange} value={form.password}/>
                    <button>Login</button>
                    <p>{message}</p>
                </div>
                <div className="otherbuttons">
                    <button type="button" onClick={() => navigate("/createaccount")}>Create account</button>
                    <button type="button" onClick={() => navigate("/parkselect")}>Continue without signing in</button>
                </div>
            </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        message: state.login.message
    }
}

export default connect(mapStateToProps, { setMessage, setUser })(Login);