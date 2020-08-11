import { LOGIN, LOGOUT } from "../actionTypes.js"
import { setTokenHeader } from "../../config/api.js"

const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isLoggedIn: false
}

setTokenHeader(localStorage.getItem("token"))

function authReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            localStorage.setItem("token", action.token)
            setTokenHeader(action.token)

            return {
                ...state,
                token: action.token,
                user: action.user,
                isLoggedIn: true
            }
        
        case LOGOUT:
            localStorage.removeItem("token")
            setTokenHeader(null)

            return {
                ...initialState,
                token: null
            }

        default:
            return state
    }
}

export default authReducer