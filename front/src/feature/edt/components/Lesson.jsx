import React    from 'react';
import './Lesson.css';

class Lesson extends React.Component {
    lessonIsNull() {
        return <div className={"lesson two-hours empty"} />
    }

    lessonOf1Hour() {
        return <div className={"lesson hour empty"} />
    }

    lessonIsMeal() {
        return (
            <div className={"lesson meal hour"}>
                <span className={"h3"}>Repas</span>
            </div>
        )
    }

    default() {

    }

    render() {
        const { lesson, className } = this.props;

        if(lesson === null) {
            return this.lessonIsNull();
        }

        if(lesson.salle === "meal") {
            return this.lessonIsMeal()
        }

        if(lesson.salle === "empty") {
            return this.lessonOf1Hour()
        }

        return (
            <div className={"lesson " + className}>
                <div className={'d-flex justify-content-between border-bottom'} style={{borderColor: "red"}}>
                    <span style={{fontSize: "1rem"}}>{lesson.debut} - {lesson.fin}</span>
                    <span style={{fontSize: "1rem"}}>{lesson.salle.startsWith("SALLE_") ? 'Visio' : `Salle: ${lesson.salle}`}</span>
                </div>
                <div className={"mt-lg-1"}>
                    <span style={{fontSize: "1rem", fontWeight: "bold"}}>{lesson.matiere === "" ? 'Pause' : `Matiere: ${lesson.matiere}`}</span>
                </div>
                <div className={"mt-lg-1"}>
                    <span  style={{fontSize: "1rem"}}>{lesson.prof === "" ? '' : `Prof: ${lesson.prof}`}</span>
                </div>
            </div>
        );
    }
}

export { Lesson };
