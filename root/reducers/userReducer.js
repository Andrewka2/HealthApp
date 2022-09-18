import { ADD_DEFAULT_USER, FIND_USER_BY_ID } from '../constants';

const initialState = {
    defaultUser: {
        id: '',
        name: '',
        email: '',
        isSignedIn: false
    }
}

const userReducer = (state = initialState, action) => {
    console.log(state);
    switch (action.type) {
        case ADD_DEFAULT_USER:{
            console.log('ADD_DEFAULT_USER was entered');
            console.log(action.payload);
            return {
                ...state,
                defaultUser: action.payload
            }
        }
        default:
            return state;
    }
}
export default userReducer;