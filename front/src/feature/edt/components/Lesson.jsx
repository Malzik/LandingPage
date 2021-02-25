import React    from 'react';
import './Lesson.css';

export const Lesson = ({lesson, grid}) => {
    return (
        <div className={"lesson"} style={{gridRowStart: grid.start, gridRowEnd: grid.end}}>
            <div className={'lesson-header'}>
                <span>{lesson.debut} - {lesson.fin}</span>
                <span>{lesson.salle.startsWith("SALLE_") ? 'VISIO' : lesson.salle}</span>
            </div>
            <div className={"mt-lg-1"}>
                <span style={{fontWeight: "bold"}}>{lesson.matiere === "" ? 'PAUSE' : lesson.matiere}</span>
            </div>
            <div className={"mt-lg-1 lesson-teacher"}>
                <span>{lesson.prof === "" ? 'AUTONOMIE' : lesson.prof}</span>
            </div>
        </div>
    )
}
