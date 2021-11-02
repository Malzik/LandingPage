import React, { useEffect, useState } from 'react';

import './Home.css';
import {DailyEdt}           from "./components/DailyEdt";
import {MiniBio}            from "./components/MiniBio";
import {Links}              from "./components/Links";
import { edtApi }           from "../edt/service/edt";
import { store }            from "../../service/store/store";
import { setEdt }           from "../edt/store/actions";

export const Home = () => {
    const [currentDay, setCurrentDay] = useState({})

    useEffect(() => {
        const edt = store.getState().edt;
        if (edt.edt.length === 0) {
            getEdt("I2", "G1")
        } else {
            setCurrentDay(store.getState().edt.currentDay)
        }
    })

    const getEdt = (selectedValue, selectedGroup) => {
        edtApi
            .getEdt(selectedValue, selectedGroup)
            .then(edt => {
                store.dispatch(setEdt(edt.data))
                setCurrentDay(store.getState().edt.currentDay)
            })
    }

    const renderDailyEdt = () => {
        return <DailyEdt day={currentDay} />
    }

    return (
        <div style={{marginLeft: "auto"}} className={"home-center"}>
            <div className="home-container">
                <div style={{backgroundColor: "#2f3136", padding: "5px", borderRadius: "4px", overflowY: "scroll"}} className={"home-daily-edt"}>
                    {renderDailyEdt()}
                </div>
                <div />
                <div className={'home-right-panel'}>
                    <MiniBio />
                    <div className={'home-bottom-panel'} style={{height: "60%"}}>
                        <Links />
                        <div className={"void"}>
                            <div className={"void-title"}><span>Espace vide</span></div>
                            <p style={{ color: "white", padding: "8px"}}>
                                Ceci est un espace vide
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}