import { ADD_DEFAULT_CALENDAR, ADD_CALENDAR_ITEM_LIST, ADD_CALENDAR_ITEM, SERVER_ERROR, UPDATE_CALENDAR_FIELDS, DELETE_CALENDAR_ITEM } from '../constants';
import {calendarDataNormalize} from '../../helpers/calendarDataNormalize';

export function updateCalendarFields(data){
    return {
        type: UPDATE_CALENDAR_FIELDS,
        payload: data
    }
}

export function addCalendarItem(data){
    return {
        type: ADD_CALENDAR_ITEM,
        payload: data
    }
}

export function addItemList(data){
    return {
        type: ADD_CALENDAR_ITEM_LIST,
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
    return fetch('http://10.0.2.2:3000/updateCalendarData', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(updatedFields)
    })
}

function fetchCalendarInfo() {
    return fetch('http://10.0.2.2:3000/getDefaultData')
}

function fetchDeleteCalendarItem(id) {
    return fetch('http://10.0.2.2:3000/deleteCalendarItem', {
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