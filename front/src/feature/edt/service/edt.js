import axios from 'axios';
import { getConfig } from '../../../service/config/config';

const createEdtUrl = (classe, groupe) => {
    const edt = process.env.NODE_ENV === 'production' ? getConfig().api_backend : getConfig().url_backend;

    return `${edt}/${classe}/${groupe}`;
}

const createEdtUrlWithDate = (classe, groupe, date) => {
    const edt = process.env.NODE_ENV === 'production' ? getConfig().api_backend : getConfig().url_backend;

    date = date.startOf('week').add(1, 'day').format('D-M-YYYY');

    return `${edt}/${classe}/${groupe}/${date}`;
}

const edtApi = {
    getEdt: (classe, groupe) =>
        new Promise((resolve, reject) => {
            axios
                .get(createEdtUrl(classe, groupe))
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    error.message = `Edt api: ${error}`;
                    reject(error);
                });
        }),
    getEdtWithDate: (classe, groupe, date) =>
        new Promise((resolve, reject) => {
            axios
                .get(createEdtUrlWithDate(classe, groupe, date))
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    error.message = `Edt api: ${error}`;
                    reject(error);
                });
        }),
    refreshEdt: (classe, groupe, date) =>
        new Promise((resolve, reject) => {
            axios
                .post(createEdtUrlWithDate(classe, groupe, date))
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    error.message = `Edt api: ${error}`;
                    reject(error);
                });
        })
}

export { edtApi }
