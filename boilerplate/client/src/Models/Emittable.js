class Emittable {
    constructor() {
        this.listeners = []
    }

    addEventListener(event, fn) {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }

        this.listeners[event].push(fn)
    }

    removeEventListener(event, fn) {
        if (this.listeners[event]) {
            const index = this.listeners[event].findIndex(listener => listener === fn)
            this.listeners[event].splice(index, 1)
        }
    }

    dispatchEvent(event, data = {}) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(fn => fn(data))
        }
    }
}

export default Emittable