import React from "react";
import axios from "axios";

import MainHeader from "./MainHeader";

import "../styles/CreateAccount.css";

const serverURL = process.env.REACT_APP_SERVERURL;

const CreateAccount = () => {
    return (
        <div className="createaccount">
            <MainHeader/>
            <form>
                <div className="formitem">
                    <label>Email:
                    </label>
                    <input/>
                </div>
                <div className="formitem">
                    <label>Username:
                    </label>
                    <input/>
                </div>
                <div className="formitem">
                    <label>Password:
                    </label>
                    <input type="password"/>
                </div>
                <div className="formitem">
                    <label>Confirm password:
                    </label>
                    <input type="password"/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default CreateAccount;