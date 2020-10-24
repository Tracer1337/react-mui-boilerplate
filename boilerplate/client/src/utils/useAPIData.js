import { useState, useEffect, useReducer } from "react"

import * as API from "../config/api.js"

const cache = new Map()

function createKey(props) {
    return props.method + (props.data ? JSON.stringify(props.data) : "")
}

/**
 * Fetch data from given endpoint
 * 
 * @param {String | Object} props - Name of the API function to use of configuration object
 * @param {String} props.method - Name of the API function to use
 * @param {Any} props.data - Arguments to be passed to the API function
 * @param {Boolean} props.useCache - Whether or not to cache requests and use a cached response as the initial data
 * @param {Any} props.defaultValue - Default value for data
 * @param {Function} props.onLoad - Will be triggered when the requests was performed successfully. Receives the data as the first argument
 * @param {Boolen} props.initialRequest - If the hook should make an initial requests or not - Useful when you want to control the requests via "reload"
 * 
 * @returns {Object} response - A custom response object
 * @returns {Object} response.data - The data returned from the API
 * @returns {Boolean} response.isLoading - If the request is pending or complete
 * @returns {Object} response.error - The error thrown by the request, undefined if there is none
 * @returns {Function} response.reload - Perform the request again
 * @returns {Function} response.reset - Set the data to null
 */
function useAPIData(props) {
    props = {
        method: typeof props === "string" ? props : props.method,
        useCache: true,
        initialRequest: true,
        ...(typeof props === "object" ? props : {})
    }

    const key = createKey(props)

    if (!(props.method in API)) {
        throw new Error(`API method '${props.method}' not found`)
    }

    const method = API[props.method].bind(null, props.data)

    const [isLoading, setIsLoading] = useState(!(props.defaultValue || cache.get(key) || !props.initialRequest))
    const [error, setError] = useState()

    const [data, setData] = useReducer((state, newValue) => {
        cache.set(key, newValue)
        return newValue
    }, props.defaultValue || (props.useCache && cache.get(key)))

    const [version, reload] = useReducer((key) => key + 1, 0)

    useEffect(() => {
        if ((data || !props.initialRequest) && version === 0) {
            return
        }

        setIsLoading(true)

        method()
            .then(res => {
                setData(res.data)
                setError(null)

                if (props.onLoad) {
                    props.onLoad(res.data)
                }
            })
            .catch(error => {
                console.error(error)
                
                setData(null)
                setError(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
        // eslint-disable-next-line
    }, [version])

    return {
        isLoading,
        data,
        error,
        reload,
        reset: () => setData(null)
    }
}

export default useAPIData