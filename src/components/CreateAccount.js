import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { setMessage } from "../actions/loginActions";

import MainHeader from "./MainHeader";

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

    function onChange(evt) {
        const {target} = evt;
        setForm({...form, [target.id]: target.value});
    }

    function onSubmit(evt) {

        evt.preventDefault();
        axios.post(`${serverURL}/users/`, {
            email: form.email,
            username: form.username,
            password: form.password
        })
            .then( res => {
                setMessage("Account creation successful.");
                navigate("/");
            })
            .catch( err => console.error(err));

    }

    return (
        <div className="createaccount">
            <MainHeader/>
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
            </form>
        </div>
    )
}

export default connect(null, { setMessage } )(CreateAccount);