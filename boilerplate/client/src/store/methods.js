import middleware from "./middleware.js"
import State from "./state.js"

/**
 * Assign properties to object without deleting exisiting ones
 */
function assign(target, val) {
    for (let key in val) {
        if (target[key] && val[key]?.constructor.name === "Object") {
            assign(target[key], val[key])
        } else {
            target[key] = val[key]
        }
    }
}

const methods = {}

methods.set = function(values) {
    middleware(values)

    assign(this.store, values)

    this.update()
}

methods.reloadProfile = function() {
    this.store.event.dispatchEvent("reloadProfile")
}

methods.resetEditor = function () {
    this.store.dispatchEvent("resetCanvas")

    const defaultState = new State()

    methods.set.call(this, {
        isEmptyState: defaultState.isEmptyState,
        currentTemplate: defaultState.currentTemplates,
        focus: defaultState.focus,
        rootElement: defaultState.rootElement,
        elements: defaultState.elements,
        drawing: defaultState.drawing
    })
}

export default methods