import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
    pendingRequests: 0,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state }
        case UPDATE_PROFILE:
            return { ...state, userData: Object.assign({}, state.userData, action.payload) }
        default:
            return state;
    }
}