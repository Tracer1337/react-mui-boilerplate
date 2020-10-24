import axios from "axios"

import format, {
    TEMPLATES,
    STICKERS,
    LOGIN,
    USERS,
    USER,
    POSTS
} from "./formatAPI.js"
import { BASE_URL, API_BASE_URL } from "./constants.js"
import { cachedRequest } from "../utils/cache.js"

export function setTokenHeader(token) {
    axios.defaults.headers.common = {
        "Authorization": "Bearer " + token
    }
}

function url(path) {
    return API_BASE_URL + path
}

export const authorize = (password) => axios.post(url("/auth/authorize"), { password })

export const getTemplates = () => cachedRequest(url("/templates")).then(format(TEMPLATES))
export const uploadTemplate = (body) => axios.post(url("/templates"), body)
export const editTemplate = (body) => axios.put(url("/templates"), body)
export const deleteTemplate = (id) => axios.delete(url("/templates/" + id))
export const registerTemplateUse = (id) => axios.post(url("/templates/register-use/" + id))
export const getTemplatesByUser = (userId) => axios.get(url("/templates/user/"+ userId)).then(format(TEMPLATES))

export const getStickers = () => cachedRequest(url("/stickers")).then(format(STICKERS))
export const uploadSticker = (formData) => axios.post(url("/stickers"), formData)
export const deleteSticker = (id) => axios.delete(url("/stickers/" + id))
export const registerStickerUse = (id) => axios.post(url("/stickers/register-use/" + id))

export const uploadFile = (formData) => axios.post(BASE_URL + "/upload", formData)

export const register = (body) => axios.post(url("/auth/register"), body).then(format(LOGIN))
export const login = (body) => axios.post(url("/auth/login"), body).then(format(LOGIN))

export const getUserByUsername = (username) => axios.get(url("/users/get/" + username))
export const getUsersByQueryString = (query) => axios.get(url("/users/find?q=" + encodeURI(query)))

export const addFriend = (id) => axios.post(url("/friends/" + id))
export const removeFriend = (id) => axios.delete(url("/friends/" + id))
export const getFriendsPosts = (page) => axios.get(url("/friends/posts?page=" + page)).then(format(POSTS))

export const getAllPosts = (page) => axios.get(url("/posts?page=" + page)).then(format(POSTS))
export const getPostsByUser = (id) => axios.get(url("/posts/user/" + id)).then(format(POSTS))
export const createPost = (formData) => axios.post(url("/posts"), formData)
export const deletePost = (id) => axios.delete(url("/posts/" + id))

export const getProfile = () => axios.get(url("/profile")).then(format(USER))
export const getMyFriends = () => axios.get(url("/profile/friends")).then(format(USERS))
export const editAvatar = (formData) => axios.post(url("/profile/avatar"), formData).then(format(USER))