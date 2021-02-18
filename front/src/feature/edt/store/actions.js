import {edtApi}          from "../service/edt";
import {toastAxiosError} from '../../../service/error/error';
import { toast }         from "react-toastify";

const style = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};
const fetchEdt = (classe, groupe) => dispatch => {
    edtApi
        .getEdt(classe, groupe)
        .then(res => {
            dispatch({
                type: 'FETCH_EDT',
                data: res.data
            })
        })
        .catch(toastAxiosError(`Récuperation de l'emploi du temps`));
}
const fetchEdtWithDate = (classe, groupe, date) => dispatch => {
    edtApi
        .getEdtWithDate(classe, groupe, date)
        .then(res => {
            dispatch({
                type: 'FETCH_EDT',
                data: res.data
            })
        })
        .catch(toastAxiosError(`Récuperation de l'emploi du temps`));
}

const refreshEdt = (classe, groupe, date) => dispatch => {
    edtApi
        .refreshEdt(classe, groupe, date)
        .then(res => {
            dispatch({
                type: 'FETCH_EDT',
                data: res.data
            })
            toast.success('Emploi du temps mise à jour', style)
        })
        .catch(toastAxiosError(`Récuperation de l'emploi du temps`));
}
export {fetchEdt, fetchEdtWithDate, refreshEdt}
