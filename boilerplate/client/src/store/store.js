import { useState, useReducer } from "react"

import methods from "./methods.js"
import State from "./state.js"

function useStore() {
    const [store, setStore] = useState(new State())

    // eslint-disable-next-line
    const [updateKey, update] = useReducer(key => key + 1, 0)

    const boundMethods = {}

    Object.entries(methods).forEach(([name, fn]) => {
        boundMethods[name] = fn.bind({ store, setStore, update })
    })

    return Object.assign(store, boundMethods)
}

export { useStore }