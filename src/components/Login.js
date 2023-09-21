import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

const Login = () => {

    const navigate = useNavigate();

    const initForm = {
        email: "",
        password: ""
    }

    const [form, setForm] = useState(initForm);

    function onChange(evt) {
        const {target} = evt;
        setForm({...form, [target.id]: [target.value]})
    }

    return (
        <div className="login">
            <h1>ThrillTracker.com</h1>
            <form>
                <div className="logininputs">
                    <input id="username" placeholder="Username..." onChange={onChange} value={form.username}/>
                    <input type="password" id="password" placeholder="Password..." onChange={onChange} value={form.password}/>
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