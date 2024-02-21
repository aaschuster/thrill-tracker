import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { setMessage, setUser } from "../actions/userActions";

import "../styles/Login.css";

const serverURL = process.env.REACT_APP_SERVERURL;

const Login = ( { message, user, setMessage, setUser } ) => {

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
                const {user} = res.data;
                setUser(user);
            })
            .catch( err => {
                setMessage(err.response.data.message);
            });
    }

    useEffect(() => {
        if(user.username) {
            navigate("/parkselect");
        }
    }, [user])

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
        message: state.user.message,
        user: state.user.user
    }
}

export default connect(mapStateToProps, { setMessage, setUser })(Login);