import React from 'react';

import './Header.css';
import {connect} from 'react-redux';
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from 'react-router-dom';
import {Icon} from "../components/Icon/Icon";

class HeaderComponent extends React.Component {


    render() {
        const links = [
            {
                url: '/',
                icon: 'home',
                title: 'Home'
            },
            {
                url: '/edt',
                icon: 'calendar',
                title: 'Emploi du temps'
            },
        ]
        return (
            <Navbar bg="dark" variant="dark" className={'navbar-shadow '} expand="md">
                <div className="container ">
                    <Navbar.Brand>Alexis HEROIN</Navbar.Brand>
                    <Nav navbar>
                        {links.map(link => (
                            <div key={link.url}>
                                <Nav.Item key={link.url}>
                                    <NavLink to={link.url}>
                                        <span>
                                            <Icon icon={link.icon} className={'mr-2 ml-2'}/>
                                            {link.title}
                                        </span>
                                    </NavLink>
                                </Nav.Item>
                            </div>
                        ))}
                    </Nav>
                </div>
            </Navbar>
        );
    }
}
const mapStateToProps = () => ({});

const Header = connect(mapStateToProps)(HeaderComponent);

export { Header, HeaderComponent };
