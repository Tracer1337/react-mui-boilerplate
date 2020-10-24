import dialogsMap from "../Dialogs"
import ComponentHandle from "../../Models/ComponentHandle.js"

function createOpener(open) {
    return function openDialog(name, data) {
        if (!dialogsMap[name]) {
            throw new Error(`The dialog '${name}' does not exist`)
        }

        return open(new ComponentHandle({
            component: dialogsMap[name],
            data
        }))
    }
}

export default createOpener