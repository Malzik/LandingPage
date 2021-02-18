import React from 'react';
import {connect} from 'react-redux';

class GoatComponent extends React.Component {

    render() {
        return (
            <div className={"text-center container"}>
                <h1 className={"h1 alert alert-danger"}>Goat Pranked</h1>
                <img src="goat-pranked.jpg" alt="Goat Pranked" className={"img-fluid w-100"}/>
            </div>
        );
    }
}

const Goat = connect()(GoatComponent);

export {Goat, GoatComponent};
