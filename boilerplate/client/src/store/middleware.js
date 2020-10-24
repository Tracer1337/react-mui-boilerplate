import { setTokenHeader } from "../config/api.js"

function middleware(values) {
    if ("auth" in values) {
        if (values.auth.token) {
            localStorage.setItem("token", values.auth.token)
            setTokenHeader(values.auth.token)
        } else if (values.auth.token === null) {
            localStorage.removeItem("token")
            setTokenHeader(null)
        }
    }
}

export default middleware