import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Dialog from "@mui/material/Dialog"

import DatalistInput from 'react-datalist-input';

import BackButton from "../Buttons/BackButton";
import HomeButton from "../Buttons/HomeButton";

import "../../styles/ParkAddUpdate.css";

import {addPark, updatePark} from "../../actions/parksActions";
import {addChain} from "../../actions/chainsActions";
import {addCountry} from "../../actions/countriesActions";
import { addParkFavorite, delParkFavorite } from "../../actions/parkFavoritesActions";
import { addHomePark, delHomePark } from "../../actions/homeParksActions";

function ParkAddUpdate({
    chains, 
    states, 
    countries, 
    parks, 
    user,
    parkFavorites,
    homeParks,
    addPark, 
    updatePark, 
    getParks,
    addCountry, 
    addChain,
    addParkFavorite,
    delParkFavorite,
    addHomePark,
    delHomePark
}) {

    const { parkId } = useParams();

    const parkInt = parseInt(parkId);

    const navigate = useNavigate();

    const editMode = parkId !== "add";

    const NONE = "NONE";
    const BOTH = "BOTH";
    const CHAIN = "CHAIN";
    const COUNTRY = "COUNTRY";

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
    const [filtered, setFiltered] = useState({
        chain: [],
        state: [],
        country: []
    });
    const [datalists, setDatalists] = useState({});
    const [err, setErr] = useState("");
    const [dialog, setDialog] = useState({
        open: false,
        message: "An error has occurred.",
        state: NONE
    });
    const [submitFired, setSubmitFired] = useState(false);
    const [currentPark, setCurrentPark] = useState(null);

    async function submitPark() {

        if(editMode) {
            if(currentPark.maindb === 1) {
                const newParkID = await addPark({
                    name: form.name,
                    city: form.city,
                    opened: form.openingyear || null,
                    chains_id: filtered.chain.length === 1 ? filtered.chain[0].chains_id : null,
                    states_id: filtered.state.length === 1 ? filtered.state[0].states_id : null,
                    countries_id: filtered.country.length === 1 ? filtered.country[0].countries_id: null,
                    users_id: user.users_id,
                    update_of_parks_id: currentPark.parks_id
                })
                const [parkFavorite] = parkFavorites.filter( park => park.parks_id === currentPark.parks_id);
                const [homePark] = homeParks.filter( park => park.parks_id === currentPark.parks_id);
                if(parkFavorite) {
                    delParkFavorite(parkFavorite);
                    addParkFavorite({users_id: user.users_id, parks_id: newParkID});
                }
                if(homePark) {
                    delHomePark(homePark);
                    addHomePark({users_id: user.users_id, parks_id: newParkID});
                }

            } else {
                updatePark({
                    parks_id: currentPark.parks_id,
                    name: form.name,
                    city: form.city,
                    opened: form.openingyear || null,
                    chains_id: filtered.chain.length === 1 ? filtered.chain[0].chains_id : null,
                    states_id: filtered.state.length === 1 ? filtered.state[0].states_id : null,
                    countries_id: filtered.country.length === 1 ? filtered.country[0].countries_id: null
                })
            }
        } else 
            addPark({
                name: form.name,
                city: form.city,
                opened: form.openingyear || null,
                chains_id: filtered.chain.length === 1 ? filtered.chain[0].chains_id : null,
                states_id: filtered.state.length === 1 ? filtered.state[0].states_id : null,
                countries_id: filtered.country.length === 1 ? filtered.country[0].countries_id: null,
                users_id: user.users_id
            });

        navigate("/parkselect");
    }

    function submitFromDialog() {

        if(dialog.state === COUNTRY || dialog.state === BOTH)
            addCountry({name: form.country});

        if(dialog.state === CHAIN || dialog.state === BOTH)
            addChain({name: form.chain});  

        //triggers chains/countries useEffect -- logic continues there

    }

    function filterData() {
        setFiltered({
            chain: chains.filter( chain => form.chain.toLowerCase() === chain.name.toLowerCase()),
            state: states.filter( state => form.state.toLowerCase() === state.name.toLowerCase()),
            country: countries.filter( country => form.country.toLowerCase() === country.name.toLowerCase())
        });
        //triggers filtered useEffect -- logic continues below
    }

    function cancelDialog() {
        setDialog({...dialog, open: false})
        setSubmitFired(false);
    }

    function onChange(evt, id) {
        setErr("");
        const {target} = evt;
        setForm({...form, [id ? id : target.id]: target.value})
    }

    function onSubmit(e) {
        e.preventDefault();

        
        if(form.name && form.city && form.country) {
            setSubmitFired(true);
            filterData(); 
        } else setErr("Please fill out required fields.");

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

        if(editMode) {
            const [filteredPark] = parks.filter(
                park =>
                    park.parks_id === parkInt
            );
            setCurrentPark(filteredPark)
        }

    }, [parks])

    useEffect(() => {
        
        if(currentPark) {

            const currentParkData = {
                chain: chains.filter( chain => chain.chains_id === currentPark.chains_id),
                state: states.filter( state => state.states_id === currentPark.states_id),
                country: countries.filter( country => country.countries_id === currentPark.countries_id)
            };     

            setForm({
                name: currentPark.name,
                chain: currentParkData.chain[0] ? currentParkData.chain[0].name : "",
                city: currentPark.city,
                state: currentParkData.state[0] ? currentParkData.state[0].name : "",
                country: currentParkData.country[0].name,
                openingyear: currentPark.opened ? currentPark.opened : ""
            });

        }

    }, [currentPark, chains, states, countries])

    useEffect(() => {

        if(submitFired) {

            if((filtered.chain.length === 1 || form.chain === "") && filtered.country.length === 1)
                submitPark();
            else if(filtered.chain.length === 0 && form.chain && filtered.country.length === 0 && form.country) 
                setDialog({
                    state: BOTH,
                    message: `This will add "${form.chain}" as a chain and "${form.country}" as a country to the database.`, 
                    open: true
                });
            else {
                if(filtered.chain.length === 0 && form.chain) 
                    setDialog({
                        state: CHAIN,
                        message: `This will add "${form.chain}" as a chain to the database.`,
                        open: true
                    });
                if(filtered.country.length === 0 && form.country) 
                    setDialog({
                        state: COUNTRY,
                        message: `This will add "${form.country}" as a country to the database.`,
                        open: true
                    });
            }

        }

    }, [filtered])

    useEffect(() => {
        filterData();
    }, [chains, countries])

    return (
        <div className="parkaddupdate">
            <Dialog onClose={() => setDialog({...dialog, open: true})} open={dialog.open}>
                <div className="addchaincountry dialog">
                    <p>{dialog.message}</p>
                    <div className="dialogbuttons">
                        <button onClick={submitFromDialog}>Confirm</button>
                        <button onClick={cancelDialog}>Cancel</button>
                    </div>
                </div>
            </Dialog>
            <div className="parkaddupdateheader">
                <BackButton/>
                <h2>{editMode ? "Update" : "Add"} Park</h2>
                <HomeButton/>
            </div>
            <form className="addupdateform" onSubmit={onSubmit}>
                <div className="formitem">
                    <label className="inputlabel">Name*</label>
                    <input id="name" value={form.name} onChange={onChange} autoFocus/>
                </div>

                <div className="formitem">
                    <label className="inputlabel">Chain</label>
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
                    <label className="inputlabel">City*</label>
                    <input id="city" value={form.city} onChange={onChange}/>
                </div>

                <div className="formitem">
                    <label className="inputlabel">State</label>
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
                    <label className="inputlabel">Country*</label>
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
                    <label className="inputlabel">Opening year</label>
                    <input type="number" id="openingyear" value={form.openingyear} onChange={onChange}/>
                </div>

                <div className="textcontainer">
                    <p>*Required fields</p>
                    <p className="err">{err}</p>
                </div>

                <button>{editMode ? "Update" : "Add"}</button>

            </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        chains: state.chains.chains,
        states: state.states.states,
        countries: state.countries.countries,
        parks: state.parks.parks,
        user: state.user.user,
        parkFavorites: state.parkFavorites.parkFavorites,
        homeParks: state.homeParks.homeParks
    }
}

export default connect(
    mapStateToProps, {
        addPark,
        updatePark,
        addCountry,
        addChain,
        addParkFavorite,
        delParkFavorite,
        addHomePark,
        delHomePark
    }
)(ParkAddUpdate);