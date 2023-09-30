import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BackButton from "../BackButton";

import "../../styles/ParkAddUpdate.css";

function ParkAddUpdate() {

    const navigate = useNavigate();

    const initForm = {
        name: "",
        chain: ""
    }

    const [form, setForm] = useState(initForm);
    const [err, setErr] = useState("");

    function onChange(evt) {
        setErr("");
        const {target} = evt;
        setForm({...form, [target.id]: target.value})
    }

    return (
        <div className="parkaddupdate">
            <div className="parkaddupdateheader">
                <BackButton/>
                <h2>Add Park</h2>
            </div>
            <form>
                <div className="formitem">
                    <label>Name:</label>
                    <input id="name" value={form.name} onChange={onChange}/>
                </div>
                <div className="formitem">
                    <label>Chain:</label>
                    <input id="chain" value={form.chain} onChange={onChange}/>
                </div>
            </form>
        </div>
    )
}

export default ParkAddUpdate;