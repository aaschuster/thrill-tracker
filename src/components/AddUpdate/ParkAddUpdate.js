import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import DatalistInput from 'react-datalist-input';

import BackButton from "../BackButton";

import "../../styles/ParkAddUpdate.css";

import {addPark} from "../../actions/parksActions";

function ParkAddUpdate( {chains, states, countries, addPark} ) {

    const navigate = useNavigate();

    const initForm = {
        name: "",
        chain: "",
        chainID: null,
        city: "",
        state: "",
        stateID: null,
        country: "",
        countryID: null,
        openingyear: ""
    }

    const [form, setForm] = useState(initForm);
    const [datalists, setDatalists] = useState({});
    const [err, setErr] = useState("");

    function onChange(evt, id) {
        setErr("");
        const {target} = evt;
        setForm({...form, [id ? id : target.id]: target.value})
    }

    function onSubmit(e) {
        e.preventDefault();

        const filtered = {};

        filtered.chain = chains.filter( chain => form.chain.toLowerCase() === chain.name.toLowerCase());
        filtered.state = states.filter( state => form.state.toLowerCase() === state.name.toLowerCase());
        filtered.country = countries.filter( country => form.country.toLowerCase() === country.name.toLowerCase());

        addPark({
            name: form.name,
            city: form.city,
            opened: form.openingyear || null,
            chains_id: filtered.chain.length === 1 ? filtered.chain[0].chains_id : null,
            states_id: filtered.state.length === 1 ? filtered.state[0].states_id : null,
            countries_id: filtered.country.length === 1 ? filtered.country[0].countries_id: null
        });
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
            <form onSubmit={onSubmit}>
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
                                value={form.chain}
                                onChange={e => onChange(e, "chain")}
                                showLabel={false}
                                items={datalists.chains}
                                onSelect={item => setForm({
                                    ...form,
                                    chain: item.value, 
                                    chainID: item.id
                                })}
                            /> : <></>
                        }
                    </div>
                </div>

                <div className="formitem">
                    <label className="inputlabel">City:</label>
                    <input id="city" value={form.city} onChange={onChange}/>
                </div>

                <div className="formitem">
                    <label className="inputlabel">State:</label>
                    <div className="datalistcontainer">
                        {
                            datalists.states ?
                            <DatalistInput
                                value={form.state}
                                onChange={e => onChange(e, "state")}
                                showLabel={false}
                                items={datalists.states}
                                onSelect={item => setForm({
                                    ...form, 
                                    state: item.value,
                                    stateID: item.id
                                })}
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
                                value={form.country}
                                onChange={e => onChange(e, "country")}
                                showLabel={false}
                                items={datalists.countries}
                                onSelect={item => setForm({
                                    ...form, 
                                    country: item.value,
                                    countryID: item.id
                                })}
                            /> : <></>
                        }
                    </div>
                </div>

                <div className="formitem">
                    <label className="inputlabel">Opening year:</label>
                    <input type="number" id="openingyear" value={form.openingyear} onChange={onChange}/>
                </div>

                <button>Add</button>

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

export default connect(mapStateToProps, {addPark})(ParkAddUpdate);