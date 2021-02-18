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

    renderDay(courses) {
        const items = [];
        if(courses[0].debut === "11:00") {
            items.push(<Lesson lesson={null} key={items.length} />);
        }
        if(courses[0].debut === "14:00") {
            items.push(<Lesson lesson={null} key={items.length}/>);
            items.push(<Lesson lesson={null} key={items.length}/>);
            items.push(<Lesson lesson={{salle: "empty"}} key={items.length}/>);
        }
        courses.map((hour) => {
            const debut = moment(hour.debut, 'HH');
            const fin = moment(hour.fin, 'HH');
            if (fin.diff(debut, 'hours') === 4) {
                items.push(<Lesson lesson={hour} className={"four-hours"} key={items.length}/>)
            } else {
                items.push(<Lesson lesson={hour} className={"two-hours"} key={items.length}/>)
            }
        });
        if(courses[courses.length - 1].fin === "13:00") {
            items.push(<Lesson lesson={{salle: "empty"}} key={items.length}/>);
            items.push(<Lesson lesson={null} key={items.length}/>);
            items.push(<Lesson lesson={null} key={items.length}/>);
        }
        if(courses[courses.length - 1].fin === "16:00") {
            items.push(<Lesson lesson={null} key={items.length}/>);
        }

        return items;
    }

    render() {
        const { date, courses } = this.props.day;

        return(
            <div className={"dailyEdtContainer bg-grey"}>
                <div className={"dailyEdtTitle c-white h3"} style={{fontSize: "1.4em"}}>{this.formatDate(date)}</div>
                <div className={'dailyEdtGrid d-flex justify-content-center flex-column'}>
                    {courses !== undefined && courses.length > 0 ? (
                        this.renderDay(courses)
                    ) : (
                        <div className={"dailyEdtEmpty c-white"}>Pas de cours aujourd'hui</div>)
                    }
                </div>
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
