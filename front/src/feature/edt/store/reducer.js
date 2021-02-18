import moment from "moment";

const initialState = {
    edt: [],
    currentDay: []
}

const insert = (arr, index, newItem) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
]
const pause = {
    debut:	"13:00",
    fin:	"14:00",
    salle: "meal",
    background: "#05827f"
}
const edtReducer = (state = initialState, action = {}) => {
    const newState = {...state};

    switch (action.type) {
        case 'FETCH_EDT':
            newState.edt = action.data.map(day => {
                if(day.courses !== undefined && day.courses.length > 0) {
                    day.courses.map((lesson, index) => {
                        if(lesson.debut === "14:00" && day.courses[index-1] !== undefined) {
                            day.courses = insert(day.courses, index, pause)
                        }
                        return day;
                    })
                }
                return day;
            });
            const currentDay = action.data.filter(day => moment(day.date).isSame(moment(), 'day') === true);
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
