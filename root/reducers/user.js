import { ADD_DEFAULT_USER, QUIZ_RESULTS, ADD_QUIZZ_ITEM } from '../constants';
import { symptoms } from '../../config/symptoms';

const initialState = {
    defaultUser: {
        id: '',
        name: '',
        email: '',
        isSignedIn: true
    },
    quizz: [{data: '',
    elems: [''],
    date: '',
    quizzResult: '', 
    sypthomType: '',
    time: ''
}],
    quizzItems: symptoms
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DEFAULT_USER: {
            return {
                ...state,
                defaultUser: action.payload
            }
        }
        case QUIZ_RESULTS: {
            return {
                ...state,
                quizz: [...state.quizz, action.payload ]
            }
        }
        case ADD_QUIZZ_ITEM: {
            return {
                ...state,
                quizzItems: {...state.quizzItems, [action.payload.type]: [ action.payload.elem, ...state.quizzItems[action.payload.type] ] }
            }
        }
        default:
            return state;
    }
}
export default userReducer;