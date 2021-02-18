import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import './Edt.css';
import * as edtActions from './store/actions';
import {DailyEdt} from "../home/components/DailyEdt";
import moment from "moment";
import {Icon} from "../../components/Icon/Icon";
import {Button} from "react-bootstrap";
import Select from 'react-select'

class EdtComponent extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            date: moment(),
            promotion: [
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
            ],
            selectedValue: { value: "I1", label: "I1", groups: [
                    { value: "G1", label: "G1" },
                    { value: "G2", label: "G2" },
                    { value: "INFRA", label: "INFRA" }
                ] },
            selectedGroup: { value: "G1", label: "G1" },
            selectedValueIndex: 3,
            selectedGroupIndex: 3,
        }

        this.prevWeek = this.prevWeek.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
        this.refreshEdt = this.refreshEdt.bind(this);
        this.onPromotionChange = this.onPromotionChange.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
    }

    componentDidMount() {
        const {fetchEdt} = this.props;
        const {edt} = this.props.edt;
        const {selectedValue, selectedGroup} = this.state;

        if (edt.length === 0) fetchEdt(selectedValue.value, selectedGroup.value);
    }

    prevWeek() {
        const {date, selectedValue, selectedGroup} = this.state;
        const prevWeek = moment(date).startOf("week")
            .add(1, "day")
            .add(-1, "week");

        this.props.fetchEdtWithDate(selectedValue.value, selectedGroup.value, prevWeek);

        this.setState({
            date: prevWeek
        });
    }

    nextWeek() {
        const {date, selectedValue, selectedGroup} = this.state;
        const nextWeek = moment(date)
            .startOf("week")
            .add(1, "day")
            .add(1, "week");

        this.props.fetchEdtWithDate(selectedValue.value, selectedGroup.value, nextWeek);
        this.setState({
            date: nextWeek
        })
    }

    refreshEdt() {
        const {date, selectedValue, selectedGroup} = this.state;

        this.props.refreshEdt(selectedValue.value, selectedGroup.value, date)
    }

    onPromotionChange(event) {
        this.state.promotion.map((promote, index) =>
            promote.value === event.value && this.setState({
                selectedValue: event,
                selectedValueIndex: index
            })
        )
    }

    onGroupChange(event) {
        const { date, selectedValue } = this.state;

        selectedValue.groups.map((group, index) => {
            console.log(group.value, event.value, group.value === event.value)
                if(group.value === event.value) {
                    this.setState({
                        selectedGroup: event,
                        selectedGroupIndex: index
                    })
                }
            }
        )

        this.props.fetchEdt(selectedValue.value, event.value, date);
    }

    render() {
        const {edt} = this.props.edt;
        const { promotion, selectedValue, selectedGroup, selectedValueIndex } = this.state;

        return (
            <div className="home-container pt-0 pt-md-5">
                <div className={"container mb-1"}>
                    <div className="row">
                        <div className="col-1">
                            <Button onClick={this.refreshEdt} className={"btn btn-secondary"}><Icon icon="refresh" /></Button>
                        </div>
                        <div className="col-3">
                            <Select options={promotion} defaultValue={selectedValue} onChange={this.onPromotionChange}/>
                        </div>
                        <div className="col-3">
                            {promotion[selectedValueIndex].groups !== undefined && (
                                <Select options={promotion[selectedValueIndex].groups} defaultValue={selectedGroup} onChange={this.onGroupChange}/>
                            )}
                        </div>
                    </div>
                </div>
                <div className={"row pl-sm-0 pr-sm-0 pl-3 pr-3 m-0"}>
                    <div className="col-1 arrow" onClick={this.prevWeek}>
                        <Icon icon={"angle-left"} style={{fontSize: "3rem"}}/>
                    </div>
                    {edt.map(day => (
                        <div key={day.date} className={"col-lg-2 mt-5 mt-md-0 p-0 pr-lg-2 pl-lg-2"}>
                            <DailyEdt day={day}/>
                        </div>
                    ))}
                    <div className="col-1 arrow" onClick={this.nextWeek}>
                        <Icon icon={"angle-right"} style={{fontSize: "3rem"}}/>
                    </div>
                </div>
            </div>
        );
    }
}

EdtComponent.propTypes = {
    fetchEdt: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    edt: state.edt,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            ...edtActions,
        },
        dispatch
    );

const Edt = connect(
    mapStateToProps,
    mapDispatchToProps
)(EdtComponent);

export { Edt, EdtComponent };
