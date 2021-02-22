import React from 'react';
import {connect} from "react-redux";
import * as actions from '../../edt/store/actions';
import {bindActionCreators} from "redux";
import './MiniBio.css'

class MiniBioComponent extends React.Component {

    render() {
        return(
            <div className={"mini-bio c-white bg-grey  mt-5 mt-md-0"}>
                <div className={"mini-bio-title"}><span>Résumé CV</span></div>
                <p className={"mini-bio-content"}>
                    Bonjour, je suis un fan de css, j’adore le design et tout tu vois
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    edt: state.edt,
    currentDay: state.edt.currentDay
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...actions }, dispatch);

const MiniBio = connect(
    mapStateToProps,
    mapDispatchToProps
)(MiniBioComponent);

export { MiniBio, MiniBioComponent };
