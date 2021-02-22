import axios               from 'axios';
import { getConfig }       from '../../../service/config/config';
import { toastAxiosError } from "../../../service/error/error";
import { toast }           from "react-toastify";

const createEdtUrl = (classe, groupe) => {
    const edt = process.env.NODE_ENV === 'production' ? getConfig().api_backend : getConfig().url_backend;

    return `${edt}/${classe}/${groupe}`;
}

const createEdtUrlWithDate = (classe, groupe, date) => {
    const edt = process.env.NODE_ENV === 'production' ? getConfig().api_backend : getConfig().url_backend;

    date = date.startOf('week').add(1, 'day').format('DD-MM-YYYY');

    return `${edt}/${classe}/${groupe}/${date}`;
}
const style = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};
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
                    toastAxiosError(`Edt api: ${error}`)
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
                    toastAxiosError(`Edt api: ${error}`)
                    reject(error);
                });
        }),
    refreshEdt: (classe, groupe, date) =>
        new Promise((resolve, reject) => {
            axios
                .post(createEdtUrlWithDate(classe, groupe, date))
                .then(response => {
                    toast.success('Emploi du temps mise à jour', style)
                    resolve(response.data);
                })
                .catch(error => {
                    error.message = `Edt api: ${error}`;
                    toastAxiosError(`Edt api: ${error}`)
                    reject(error);
                });
        })
}

export { edtApi }
