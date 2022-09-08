import { ADD_DEFAULT_CALENDAR, SERVER_ERROR, UPDATE_CALENDAR_FIELDS, DELETE_CALENDAR_ITEM } from '../constants';
import {calendarDataNormalize} from '../../helpers/calendarDataNormalize';

export function updateCalendarFields(data){
    console.log(data)
    return {
        type: UPDATE_CALENDAR_FIELDS,
        payload: data
    }
}

export function setDefaultCalendarAction(data) {
    let result = calendarDataNormalize(data)
    return {
        type: ADD_DEFAULT_CALENDAR,
        payload: result
    }
}

export function deleteCalendarItemAction(id){
    return {
        type: DELETE_CALENDAR_ITEM,
        payload: id
    }
}

function serverError(error) {
    return {
        type: SERVER_ERROR,
        error
    }
}

function fetchUpdateCalendarInfo(updatedFields) {
    return fetch('http://localhost:3000/updateCalendarData', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(updatedFields)
    })
}
function fetchCalendarInfo() {
    return fetch('http://localhost:3000/getDefaultData')
}
function fetchDeleteCalendarItem(id) {
    return fetch('http://localhost:3000/deleteCalendarItem', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({id: id})
    })
}

export function deleteCalendarInfo(id, time){
    try{
        return function(dispatch) {
            fetchDeleteCalendarItem(id).then(
                (result)=>{
                dispatch(deleteCalendarItemAction({id, time}))
            }),
            error => dispatch(serverError(error))
        }
    }catch(error){
        console.log(error)
    }
}

export function upldateCalendarInfo(updatedFields) {
    try{
        return function (dispatch) {
            fetchUpdateCalendarInfo(updatedFields).then(
                (result)=>{
                console.log(result.statusText)
            }),
            error => dispatch(serverError(error))
        }
    }catch(error){
        console.log(error)
    }
}

export function uploadDefaultCalendarInfo() {
    // We can invert control here by returning a function - the "thunk".
    // When this function is passed to `dispatch`, the thunk middleware will intercept it,
    // and call it with `dispatch` and `getState` as arguments.
    // This gives the thunk function the ability to run some logic, and still interact with the store.
    return function (dispatch) {
        try {
            return fetchCalendarInfo().then(
                (data) => {
                    data.json().then((result)=>{
                        dispatch(setDefaultCalendarAction(JSON.parse(result.data)))
                    })
                },
                error => dispatch(serverError(error))
            )
        } catch (eror) {
            console.log('error here')
        }
    }
}