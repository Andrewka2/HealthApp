import { ADD_DEFAULT_USER, SERVER_ERROR } from '../constants';
import uuid from 'react-native-uuid';

export function setDefaultUserAction(data) {
    let result = saveUser(data)
    console.log("result");
    console.log(result);
    return {
        type: ADD_DEFAULT_USER,
        payload: result
    }
}


function saveUser(data) {
    let validUser = true
    console.log("HERE IS THE DATA");
    console.log(data);
    return {
        id: String = data.customId,
        name: String = data.name,
        email: String = data.email,
        isSignedIn: validUser,
    }
}

function serverError(error) {
    return {
        type: SERVER_ERROR,
        error
    }
}

function fetchCreateUser(userData) {
    console.log(userData);
    return fetch('http://localhost:3000/createUser', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({data: userData})
    })
}

function fetchFindUserById(userID) {
    return fetch('http://localhost:3000/getUserById' + '?id=' + userID)
}

export function createUser(userData) {
    userData[0].customId = uuid.v4()
    try{
        return function (dispatch) {
            fetchCreateUser(userData).then(
                (data) => {
                    data.json().then((result)=>{
                        dispatch(setDefaultUserAction(result.data))
                    })
                },
                error => dispatch(serverError(error))
            )
        }
    }catch(error){
        console.log(error)
    }
}

export function findUserById(userID) {
    try{
        return function (dispatch) {
            fetchFindUserById(userID).then(
                (data) => {
                    data.json().then((result)=>{
                        console.log(result.data);
                    })
                },
                error => dispatch(serverError(error))
            )
        }
    }catch(error){
        console.log(error)
    }
}
