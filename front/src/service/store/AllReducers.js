import { combineReducers } from 'redux';
import {edtReducer}        from "../../feature/edt/store/reducer";
import { loadingReducer }  from "../../feature/loader/store/reducer";

const allReducers = combineReducers({
    edt: edtReducer,
    loading: loadingReducer
});

export default allReducers;
