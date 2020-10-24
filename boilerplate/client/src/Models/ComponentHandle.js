import Emittable from "./Emittable.js"

class ComponentHandle extends Emittable {
    static idCounter = 0
    
    constructor({ component, data = {}, isOpen = true }) {
        super()
        
        this.id = ComponentHandle.idCounter++
        this.component = component
        this.data = data
        this.isOpen = isOpen
    }

    set(data) {
        Object.assign(this.data, data)
        this.dispatchEvent("update")
    }
}

export default ComponentHandle