import React from 'react';

import './Header.css';
import {NavLink} from 'react-router-dom';
import {Icon} from "../components/Icon/Icon";

export const Header = () => {
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
        <nav className={"navbar navbar-shadow"}>
            <div className={"container"}>
                <span className={"navbar-title"}>Alexis HEROIN</span>
                <div className={"navbar-nav"}>
                    {links.map(link => (
                        <NavLink to={link.url} key={link.title}>
                        <span className={"navbar-link"}>
                            <Icon icon={link.icon} style={{marginLeft: "2px", marginRight: "4px"}} />
                            {link.title}
                        </span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
}