import moment from "moment"

import { BASE_URL } from "../config/constants.js"
import { getCachedImage } from "../utils/cache.js"

export const TEMPLATES = "TEMPLATES"
export const STICKERS = "STICKERS"
export const LOGIN = "LOGIN"
export const USERS = "USERS"
export const USER = "USER"
export const POSTS = "POSTS"

function formatRelativeURL(url) {
    return BASE_URL + url
}

async function formatTemplate(template) {
    template.image_url = formatRelativeURL(template.image_url)
    template.image_url = await getCachedImage(template.image_url)
    
    template.model = JSON.parse(template.model)
}

async function formatSticker(sticker) {
    sticker.image_url = formatRelativeURL(sticker.image_url)
    sticker.image_url = await getCachedImage(sticker.image_url)
}

function formatUser(user) {
    user.created_at = moment(user.created_at)

    if (user.avatar_url) {
        user.avatar_url = formatRelativeURL(user.avatar_url)
    }
}

function formatUpload(upload) {
    upload.url = formatRelativeURL(upload.url)
    upload.embedUrl = formatRelativeURL(upload.embedUrl)
    upload.altUrl = formatRelativeURL(upload.altUrl)
    upload.altEmbedUrl = formatRelativeURL(upload.altEmbedUrl)
}

function formatPost(post) {
    post.created_at = moment(post.created_at)

    formatUpload(post.upload)
    
    if (post.user) {
        formatUser(post.user)
    }
}

function map(elements, fn) {
    return Promise.all(elements.map(async (element) => fn(element)))
}

export default function format(type) {
    let fn

    if (type === TEMPLATES) {
        fn = (data) => map(data.data, formatTemplate)
    } else if (type === STICKERS) {
        fn = (data) => map(data.data, formatSticker)
    } else if (type === LOGIN) {
        fn = (data) => formatUser(data.data.user)
    } else if (type === USERS) {
        fn = (data) => map(data.data, formatUser)
    } else if (type === USER) {
        fn = (data) => formatUser(data.data)
    } else if (type === POSTS) {
        fn = (data) => map(data.data, formatPost)
    }

    return (data) => {
        return new Promise(async resolve => {
            await fn(data)
            resolve(data)
        })
    }
}