import React from 'react';

import './Footer.css';
import {connect} from 'react-redux';

class FooterComponent extends React.Component {

    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="content has-text-centered">
                        ©2020&nbsp;
                        <a href="https://github.com/malzik">
                            Malzik
                            <i className="fab fa-github-alt"/>
                        </a>
                    </div>
                </div>
            </footer>
        );
    }
}
const mapStateToProps = () => ({});

const Footer = connect(mapStateToProps)(FooterComponent);

export { Footer, FooterComponent };
