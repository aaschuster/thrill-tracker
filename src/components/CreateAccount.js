import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { setMessage } from "../actions/loginActions";

import BackButton from "./BackButton";

import "../styles/CreateAccount.css";

const serverURL = process.env.REACT_APP_SERVERURL;

const CreateAccount = ( { setMessage } ) => {

    const navigate = useNavigate();

    const initForm = {
        email: "",
        username: "",
        password: "",
        confirmpassword: ""
    }

    const [form, setForm] = useState(initForm);
    const [err, setErr] = useState("");

    function onChange(evt) {
        setErr("");
        const {target} = evt;
        setForm({...form, [target.id]: target.value});
    }

    function onSubmit(evt) {
        evt.preventDefault();

        let formErr = "";

        if(form.password !== form.confirmpassword) formErr = "Passwords do not match";
        if(!form.password) formErr = "Please provide a password.";
        if(!form.username) formErr = "Please provide a username.";
        if(!form.email) formErr = "Please provide an email.";

        if(formErr) {
            setErr(formErr);
        } else {

            axios.post(`${serverURL}/users/`, {
                email: form.email,
                username: form.username,
                password: form.password
            })
                .then( res => {
                    setMessage("Account creation successful.");
                    navigate("/");
                })
                .catch( err => {
                    setErr(err.response.data.message);
                });

        }

    }

    return (
        <div className="createaccount">
            <div className="createaccountheader">
                <BackButton/>
                <h1>ThrillTracker.com</h1>
            </div>
            <form onSubmit={onSubmit}>
                <div className="formitem">
                    <label>Email:
                    </label>
                    <input onChange={onChange} id="email" value={form.email}/>
                </div>
                <div className="formitem">
                    <label>Username:
                    </label>
                    <input onChange={onChange} id="username" value={form.username}/>
                </div>
                <div className="formitem">
                    <label>Password:
                    </label>
                    <input 
                        type="password"
                        onChange={onChange}
                        id="password"
                        value={form.password}
                    />
                </div>
                <div className="formitem">
                    <label>Confirm password:
                    </label>
                    <input
                        type="password"
                        onChange={onChange}
                        id="confirmpassword"
                        value={form.confirmpassword}
                    />
                </div>
                <button>Submit</button>
                <p>{err}</p>
            </form>
        </div>
    )
}

export default connect(null, { setMessage } )(CreateAccount);