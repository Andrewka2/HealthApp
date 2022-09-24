import { ADD_DEFAULT_USER, SERVER_ERROR, QUIZ_RESULTS, ADD_QUIZZ_ITEM } from '../constants';

export function setDefaultUserAction(data) {
    let result = saveUser(data)
    return {
        type: ADD_DEFAULT_USER,
        payload: result
    }
}

function saveUser(data) {
    let validUser = true
    return {
        id: String = data.id,
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
    return fetch('http://localhost:3000/createUser', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({data: userData})
    })
}

export function createUser(userData) {
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

export function setUserDefaultData(data) {
    return {
        type: ADD_DEFAULT_USER,
        payload: data
    }
}

// Quizz
export function userQuizzAction(data){
    return {    
        type: QUIZ_RESULTS,
        payload: data
    }   
}

export function addQuizzSymptom(data){
    return {
        type: ADD_QUIZZ_ITEM,
        payload: data
    }
}

function fetchSaveQuizz(quizzData) {
    return fetch('http://10.0.2.2:3000/users/saveQuizz', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({data: quizzData})
    })
}

export function saveQuizzAction(quizzData) {
    try{
        return function (dispatch) {
            fetchSaveQuizz(quizzData).then(
                (data) => {
                    data.json().then((result)=>{
                        dispatch(userQuizzAction(quizzData))
                    })
                },
                error => dispatch(serverError(error))
            )
        }
    }catch(error){
        console.log(error)
    }
}