import axios from "axios"

import { IS_DEV, CACHE_NAME, IS_OFFLINE } from "../config/constants.js"

const isCacheSupported = "caches" in window

export async function cachedRequest(url) {
    // Do not cache in development mode
    if (IS_DEV || !isCacheSupported) {
        return await axios.get(url)
    }

    const cache = await caches.open(CACHE_NAME)
    
    // Return cached data if neccessary
    if (IS_OFFLINE) {
        const cachedData = await cache.match(url)

        return {
            data: await cachedData.json()
        }
    }

    // Write data to cache
    const response = await axios.get(url)

    cache.put(url, new Response(response.request.response, {
        status: response.status,
        headers: response.headers
    }))

    return response
}

export async function getCachedImage(url) {
    if (!isCacheSupported) {
        return url
    }

    const cache = await caches.open(CACHE_NAME)

    const response = await cache.match(url)

    if (!response) {
        return url
    }

    // Create local image url from response
    const blob = await response.blob()
    const imageURL = URL.createObjectURL(blob)

    return imageURL
}

export async function cacheImage(url) {
    if (!isCacheSupported) {
        return
    }

    // Do not cache blob / in development mode
    if (url.indexOf("blob") === 0 || IS_DEV) {
        return
    }

    const cache = await caches.open(CACHE_NAME)

    const cachedData = await cache.match(url)

    if (!cachedData) {
        // Store image in cache
        const response = await fetch(url)
        cache.put(url, response)
    }
}