import React from 'react';
import {connect} from "react-redux";
import * as actions from '../../edt/store/actions';
import {bindActionCreators} from "redux";
import './Links.css'

class LinksComponent extends React.Component {

    render() {
        return(
            <div className={"links c-white bg-grey"}>
                <div className={"links-title"}><span>Liens</span></div>
                <p className={"links-content"}>
                    Ceci est un lien <br/>
                    Ceci est un lien <br/>
                    Ceci est un lien <br/>
                    Ceci est un lien <br/>
                    Ceci est un lien <br/>
                    Ceci est un lien <br/>
                    Ceci est un lien <br/>
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

const Links = connect(
    mapStateToProps,
    mapDispatchToProps
)(LinksComponent);

export { Links, LinksComponent };
