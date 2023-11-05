import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import DatalistInput from 'react-datalist-input';

import BackButton from "../BackButton";

import "../../styles/ParkAddUpdate.css";

function ParkAddUpdate( {chains, states, countries} ) {

    const navigate = useNavigate();

    const initForm = {
        name: "",
        chain: "",
        state: "",
        country: "",
        openingyear: ""
    }

    const [form, setForm] = useState(initForm);
    const [datalists, setDatalists] = useState({});
    const [err, setErr] = useState("");

    function onChange(evt) {
        setErr("");
        const {target} = evt;
        setForm({...form, [target.id]: target.value})
    }

    useEffect(() => {
        setDatalists({...datalists, 
            chains: chains.map( chain => {
                return{id: chain.chains_id, value: chain.name}
            }),
            states: states.map( state => {
                return{id: state.states_id, value: state.name}
            }),
            countries: countries.map( country => {
                return{id: country.countries_id, value: country.name}
            }),
        });
    }, [])

    return (
        <div className="parkaddupdate">
            <div className="parkaddupdateheader">
                <BackButton/>
                <h2>Add Park</h2>
            </div>
            <form>

                <div className="formitem">
                    <label className="inputlabel">Name:</label>
                    <input id="name" value={form.name} onChange={onChange} autoFocus/>
                </div>

                <div className="formitem">
                    <label className="inputlabel">Chain:</label>
                    <div className="datalistcontainer">
                        {
                            datalists.chains ?
                            <DatalistInput
                                items={datalists.chains}
                            /> : <></>
                        }
                    </div>
                </div>

                <div className="formitem">
                    <label className="inputlabel">State:</label>
                    <div className="datalistcontainer">
                        {
                            datalists.states ?
                            <DatalistInput
                                items={datalists.states}
                            /> : <></>
                        }
                    </div>
                </div>

                <div className="formitem">
                    <label className="inputlabel">Country:</label>
                    <div className="datalistcontainer">
                        {
                            datalists.countries ?
                            <DatalistInput
                                items={datalists.countries}
                            /> : <></>
                        }
                    </div>
                </div>

                <div className="formitem">
                    <label className="inputlabel">Opening year:</label>
                    <input id="openingyear" value={form.openingyear} onChange={onChange}/>
                </div>

            </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        chains: state.chains.chains,
        states: state.states.states,
        countries: state.countries.countries
    }
}

export default connect(mapStateToProps)(ParkAddUpdate);