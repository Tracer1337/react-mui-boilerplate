/**
 * Attach the listeners to the event target and return a function which removes them.
 * 
 * @param {EventTarget|Emittable} target 
 * @param {Array<[String, Function]>} events 
 */
export function createListeners(target, events) {
    events.forEach(([name, fn]) => {
        target.addEventListener(name, fn, false)
    })

    return () => events.forEach(([name, fn]) => {
        target.removeEventListener(name, fn, false)
    })
}