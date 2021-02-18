import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Template} from './layout/Template';
import {store} from './service/store/store';
import {Provider} from "react-redux";
import {initConfig} from "./service/config/config";
import {Home} from "./feature/home/Home";
import {Edt} from "./feature/edt/Edt";
import {Goat} from "./feature/goat/Goat";

moment.locale('fr');


initConfig()
    .then(() => {
        ReactDOM.render(
            <Provider store={store}>
                <div>
                    <BrowserRouter>
                        <Template>
                            <Switch>
                                <Route path="/edt" component={Edt}/>
                                <Route path="/goat" component={Goat}/>
                                <Route path="/" component={Home}/>
                            </Switch>
                        </Template>
                    </BrowserRouter>
                </div>
            </Provider>,
            document.getElementById('root')
        );
    })
    .catch(err => {
        console.error('App bootstrap stop', err);
    });
