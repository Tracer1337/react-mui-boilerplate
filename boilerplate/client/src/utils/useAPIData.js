import { useState, useEffect, useReducer } from "react"

import * as API from "../config/api.js"

const cache = new Map()

/**
 * Fetch data from given endpoint
 * 
 * @param {String | Object} props Name of the API function to use of configuration object
 * @param {String} props.method Name of the API function to use
 * @param {Any} props.data Arguments to be passed to the API function
 * @param {Boolean} props.useCache Whether or not to cache requests and use a cached response as the initial data
 * @param {Any} props.defaultValue Default value for data
 * @param {Function} props.onLoad Will be triggered when the requests was performed successfully. Receives the data as the first argument
 * 
 * @returns {Object} response A custom response object
 * @returns {Object} response.data The data returned from the API
 * @returns {Boolean} response.isLoading If the request is pending or complete
 * @returns {Object} response.error The error thrown by the request, undefined if there is none
 * @returns {Function} response.reload Perform the request again
 */
function useAPIData(props) {
    props = {
        method: typeof props === "string" ? props : props.method,
        useCache: true,
        ...(typeof props === "object" ? props : {})
    }

    if (!props.method) {
        throw new Error("API Method not found")
    }

    const method = API[props.method].bind(null, props.data)

    const [isLoading, setIsLoading] = useState(!(props.defaultValue || cache.get(props.method)))
    const [error, setError] = useState()

    const [data, setData] = useReducer((state, newValue) => {
        cache.set(props.method, newValue)
        return newValue
    }, props.defaultValue || (props.useCache && cache.get(props.method)))

    const [version, reload] = useReducer((key) => key + 1, 0)

    useEffect(() => {
        if (data && version === 0) {
            return
        }

        setIsLoading(true)

        method()
            .then(res => {
                setData(res.data)
                setError(null)
                setIsLoading(false)

                if (props.onLoad) {
                    props.onLoad(res.data)
                }
            })
            .catch(error => {
                setData(null)
                setError(error)
                setIsLoading(false)
            })
        // eslint-disable-next-line
    }, [version])

    return {
        isLoading,
        data,
        error,
        reload
    }
}

export default useAPIData