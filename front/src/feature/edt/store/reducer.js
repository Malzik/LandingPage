import moment from "moment";

const initialState = {
    edt: [],
    currentDay: []
}

const edtReducer = (state = initialState, action = {}) => {
    const newState = {...state};

    switch (action.type) {
        case 'SET_EDT':
            newState.edt = action.edt
            const currentDay = action.edt.filter(day => moment(day.date).isSame(moment(), 'day') === true);
            if(currentDay.length >= 1) {
                newState.currentDay = currentDay[0];
            }
            break;
        default:
            break;
    }

    return newState;
}

export { edtReducer }
