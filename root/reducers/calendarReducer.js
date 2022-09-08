import { ADD_DEFAULT_CALENDAR, UPDATE_CALENDAR_FIELDS, DELETE_CALENDAR_ITEM } from '../constants';

const initialState = {
    defaultCalendar: {
        "2022-09-04": [{
            procedure: "Плановий огляд", emergency: "Цеентральна лікарня", address: "вул. Перемоги 21",
            name: "Петренко Петро Петрович", time: "10:20", cabinet: "322", position: 'педіатр', height: 110, day: '2022-09-04'
        },
        { name: 'Item for 2022-09-04 #110', height: 110, day: '2022-09-04' },
        { name: 'Item for 2022-09-04 #1', height: 117, day: '2022-09-04' },
        { name: 'Item for 2022-09-04 #2', height: 113, day: '2022-09-04' }],
        "2022-09-06": [{ name: '', height: 110, day: '2022-09-04' },
        { name: 'Item for 2022-09-04 #110', height: 110, day: '2022-09-04' },
        { name: 'Item for 2022-09-04 #1', height: 117, day: '2022-09-04' },
        { name: 'Item for 2022-09-04 #2', height: 113, day: '2022-09-04' }]
    }
}

const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DEFAULT_CALENDAR:
            return {
                ...state,
                defaultCalendar: action.payload
            };
        case UPDATE_CALENDAR_FIELDS:
            let updatedResult = {};
            if (state.defaultCalendar.hasOwnProperty(action.payload.date)) {
                for (let prop in state.defaultCalendar) {
                    if (prop === action.payload.date) {
                        let result = state.defaultCalendar[prop].map((elem) => {
                            if (elem.id === action.payload.id) {
                                let obj = {}
                                for (let item in elem) {
                                    for (let newItem in action.payload.updatedFields) {
                                        if (action.payload.updatedFields.hasOwnProperty(item) === true) {
                                            obj[newItem] = action.payload.updatedFields[newItem]
                                        } else {
                                            obj[item] = elem[item]
                                        }
                                    }
                                }
                                return obj
                            } else {
                                return elem
                            }
                        })
                        updatedResult[prop] = result
                    } else {
                        updatedResult[prop] = state.defaultCalendar[prop]
                    }
                }
            }
            return {
                ...state,
                defaultCalendar: updatedResult
            }
        case DELETE_CALENDAR_ITEM: {
            let resultObj = {} 
            for(let prop in state.defaultCalendar){
                if(prop === action.payload.time){
                    resultObj[action.payload.time] = state.defaultCalendar[prop].filter((elem, i)=>{
                        if(elem.id !== action.payload.id){
                            return elem
                        }
                    }) 
                }else{
                    resultObj[prop] = state.defaultCalendar[prop]
                }
            }
            return {
                ...state,
                defaultCalendar: resultObj
            }
        }
        default:
            return state;
    }
}
export default calendarReducer;