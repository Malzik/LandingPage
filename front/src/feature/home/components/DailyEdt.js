import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import * as actions from '../../edt/store/actions';
import {bindActionCreators} from "redux";
import {Lesson} from "../../edt/components/Lesson";
import './DailyEdt.css'
import moment from "moment/min/moment-with-locales";

export const DailyEdt = ({day}) => {
    const [date, setDate] = useState("Pas de date")
    const [courses, setCourses] = useState([])

    useEffect(() => {
        if (day !== undefined) {
            setDate(day.date)
            setCourses(day.courses)
        }
    }, [day])

    const formatDate = date => moment(date).locale('fr').format('dddd ll').toUpperCase();

    const predictStartEnd =  course =>  {
        let debutHour = parseInt(course.debut.split(':')[0])
        let finHour = parseInt(course.fin.split(':')[0])

        let debut = debutHour - 7
        let fin = finHour - 7

        return {start: debut, end: fin}
    }

    return(
        <div style={{height: "80vh"}}>
            <div className={"dailyEdtTitle c-white h3"} style={{fontSize: "1.4em", marginBottom: "6px"}}>{formatDate(date)}</div>
            <div className="dailyEdt">
                {
                    courses !== undefined && courses.length > 0 ? (
                        courses.map((course, index) => <Lesson lesson={course} grid={predictStartEnd(course)}  key={index}/>)
                    ) : (
                        <div className={"dailyEdtEmpty c-white"}>Pas de cours aujourd'hui</div>)
                }
            </div>
        </div>
    )
}
