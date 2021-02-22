import React from 'react';
import {connect} from "react-redux";
import * as actions from '../../edt/store/actions';
import {bindActionCreators} from "redux";
import {Lesson} from "../../edt/components/Lesson";
import './DailyEdt.css'
import moment from "moment/min/moment-with-locales";

class DailyEdtComponent extends React.Component {

    constructor(props, context) {
        super(props, context);

        if (props.day !== undefined) {
            this.state = {
                date: props.day.date,
                courses: props.day.courses
            }
        } else {
            this.state = {
                date: "Pas de date",
                courses: []
            }
        }
    }

    formatDate(date) {
        return moment(date).locale('fr').format('dddd ll').toUpperCase();
    }

    predictStartEnd (course) {
        let debutHour = parseInt(course.debut.split(':')[0])
        let debutMin = parseInt(course.debut.split(':')[1])
        let finHour = parseInt(course.fin.split(':')[0])
        let finMin = parseInt(course.fin.split(':')[1])

        let debut = (debutHour - 8) * 2 + (debutMin === 15 ? 2 : debutMin === 30 ? 3 : debutMin === 45 ? 4 : 1)
        let fin = (finHour - 8) * 2 + (finMin === 15 ? 2 : finMin === 30 ? 3 : finMin === 45 ? 4 : 1)

        return {start: debut, end: fin}
    }

    render() {
        const { date, courses } = this.props.day;

        return(
            <div >
                <div className={"dailyEdtTitle c-white h3"} style={{fontSize: "1.4em", gridRow: "1/3", marginBottom: "6px"}}>{this.formatDate(date)}</div>
                {
                    courses !== undefined && courses.length > 0 ? (
                        courses.map((course, index) => <Lesson lesson={course} grid={this.predictStartEnd(course)}  key={index}/>)
                    ) : (
                        <div className={"dailyEdtEmpty c-white"}>Pas de cours aujourd'hui</div>)
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...actions }, dispatch);

const DailyEdt = connect(
    null,
    mapDispatchToProps
)(DailyEdtComponent);

export { DailyEdt, DailyEdtComponent };
