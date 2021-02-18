import { combineReducers } from 'redux';
import {edtReducer} from "../../feature/edt/store/reducer";

const allReducers = combineReducers({
    edt: edtReducer
});

export default allReducers;
