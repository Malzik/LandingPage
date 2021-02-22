import React from 'react';

import './Footer.css';

export const Footer = () => {
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
