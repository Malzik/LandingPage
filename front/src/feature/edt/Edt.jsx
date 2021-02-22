import React, { useEffect, useState } from 'react';

import './Edt.css';
import {DailyEdt}      from "../home/components/DailyEdt";
import moment          from "moment";
import {Icon}          from "../../components/Icon/Icon";
import {Button}        from "react-bootstrap";
import Select                                             from 'react-select'
import { fetchEdtWithDate, refreshEdt, setEdt } from "./store/actions";
import { store }                                          from "../../service/store/store";
import { edtApi }      from "./service/edt";

export const Edt = () => {
    const [promotion] = useState([
        { value: "B1", label: "B1"},
        { value: "B2", label: "B2"},
        { value: "B3", label: "B3"},
        { value: "I1", label: "I1", groups: [
                { value: "G1", label: "G1" },
                { value: "G2", label: "G2" },
                { value: "INFRA", label: "INFRA" }
            ]
        },
        { value: "I2", label: "I2"}
    ])
    const [selectedValue, setSelectedValue] = useState({ value: "I1", label: "I1", groups: [
            { value: "G1", label: "G1" },
            { value: "G2", label: "G2" },
            { value: "INFRA", label: "INFRA" }
        ]})
    const [selectedGroup, setSelectedGroup] = useState({ value: "G1", label: "G1" })
    const [selectedValueIndex, setSelectedValueIndex] = useState(3)
    const [, setSelectedGroupIndex] = useState(3)
    const [edt, setNewEdt] = useState([])
    const [date, setDate] = useState(moment())

    useEffect(() => {
        const edt = store.getState().edt.edt;
        if (edt.length === 0) {
            getEdt(selectedValue.value, selectedGroup.value)
        } else {
            setNewEdt(edt)
        }
    }, [selectedValue.value, selectedGroup.value])

    const getEdt = (selectedValue, selectedGroup) => {
        edtApi
            .getEdt(selectedValue, selectedGroup)
            .then(edt => {
                store.dispatch(setEdt(edt.data))
                setNewEdt(edt.data)
            })
    }

    const getEdtWithDate = (selectedValue, selectedGroup, date) => {
        edtApi
            .getEdtWithDate(selectedValue, selectedGroup, date)
            .then(edt => {
                store.dispatch(setEdt(edt.data))
                setNewEdt(edt.data)
            })
    }

    const prevWeek = () => {
        const prevWeekDate = moment(date).startOf("week")
            .add(1, "day")
            .add(-1, "week");

        getEdtWithDate(selectedValue.value, selectedGroup.value, prevWeekDate)

        setDate(prevWeekDate)
    }

    const nextWeek = () => {
        const nextWeekDate = moment(date).startOf("week")
            .add(1, "day")
            .add(1, "week");

        getEdtWithDate(selectedValue.value, selectedGroup.value, nextWeekDate)

        setDate(nextWeekDate)
    }

    const refreshEdtButton = () => {
        edtApi
            .refreshEdt(selectedValue.value, selectedGroup.value, date)
            .then(edt => {
                store.dispatch(setEdt(edt.data))
                setNewEdt(edt.data)
            })
    }

    const onPromotionChange = (event) => {
        promotion.forEach((promote, index) => {
            if (promote.value === event.value) {
                setSelectedValue(event)
                setSelectedValueIndex(index)
            }
        })
    }

    const onGroupChange = (event) => {
        selectedValue.groups.forEach((group, index) => {
                if(group.value === event.value) {
                    setSelectedGroup(event)
                    setSelectedGroupIndex(index)
                    getEdt(selectedValue.value, event.value)
                }
            }
        )
    }

    return (
        <div className="edt-container" style={{height: "90vh"}}>
            <div className="options">
                <div className="refresh">
                    <Button onClick={refreshEdtButton} className={"refresh-button"}><Icon icon="refresh" /></Button>
                </div>
                <div className="select">
                    <Select options={promotion} defaultValue={selectedValue} onChange={onPromotionChange}/>
                </div>
                <div className="select">
                    {promotion[selectedValueIndex].groups !== undefined && (
                        <Select options={promotion[selectedValueIndex].groups} defaultValue={selectedGroup} onChange={onGroupChange}/>
                    )}
                </div>
            </div>
            <div className={"edt"}>
                <div className="arrow arrow-left" onClick={prevWeek}>
                    <Icon icon={"angle-left"} style={{fontSize: "3rem"}}/>
                </div>
                <div className={"schedule"}>
                    {edt.map((day, index) => (
                        <DailyEdt day={day} key={index}/>
                    ))}
                </div>
                <div className="arrow arrow-right" onClick={nextWeek}>
                    <Icon icon={"angle-right"} style={{fontSize: "3rem"}}/>
                </div>
            </div>
        </div>
    );
}
