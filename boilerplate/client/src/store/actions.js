import { LOGIN, LOGOUT } from "./actionTypes.js"

export function login({ token, user }) {
    return {
        type: LOGIN,
        token,
        user
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}