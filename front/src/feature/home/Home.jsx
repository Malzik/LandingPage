import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import './Home.css';
import {DailyEdt} from "./components/DailyEdt";
import * as edtActions from '../edt/store/actions';
import {MiniBio} from "./components/MiniBio";
import {Links} from "./components/Links";

class HomeComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            edt: [],
            currentDay: {}
        }
    }

    componentDidMount() {
        const { fetchEdt } = this.props;
        fetchEdt("I1", "G1");
    }

    renderDailyEdt() {
        const { currentDay } = this.props;

        return <DailyEdt day={currentDay} />
    }

    render() {
        return (
            <div className="home-container container">
                <div className="row">
                    <div className="col-lg-4">
                        {this.renderDailyEdt()}
                    </div>
                    <div className={'d-flex flex-column justify-content-start ml-lg-5 w-100 col'}>
                        <MiniBio />
                        <div className={'row justify-content-between mt-5'} style={{height: "100%"}}>
                            <div className="col-lg-6">
                                <Links />
                            </div>
                            <div className={"col-lg-5 mt-5 mt-md-0"}>
                                <div style={{ borderRadius: "4px", padding: 8, backgroundColor: "#2f3136", height: "100%"}}>
                                    <h3 style={{borderBottom: "solid", textAlign: "center", padding: "8px", backgroundColor: "#2f3136", color: "white"}}>Espace vide</h3>
                                    <p style={{ color: "white", padding: "8px"}}>
                                        Ceci est un espace vide
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

HomeComponent.propTypes = {
    fetchEdt: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    edt: state.edt,
    currentDay: state.edt.currentDay,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            ...edtActions,
        },
        dispatch
    );

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent);

export { Home, HomeComponent };
