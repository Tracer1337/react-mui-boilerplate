export function dataURLToFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new window._File([u8arr], filename, { type: mime });
}

export function importFile(accept) {
    return new Promise(resolve => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = accept
        document.body.appendChild(input)

        input.onchange = e => {
            const file = e.target.files[0]
            resolve(file)
        }

        input.click()
        input.remove()
    })
}

export function fileToImage(file) {
    return new Promise(resolve => {
        const reader = new FileReader()

        reader.onload = () => resolve(reader.result)

        reader.readAsDataURL(file)
    })
}

// Source: https://stackoverflow.com/questions/2570972/css-font-border

export function textShadow(stroke, color) {
    if (stroke === 0) {
        return ""
    }

    const shadows = []

    for (let i = -stroke; i <= stroke; i++) {
        for (let j = -stroke; j <= stroke; j++) {
            shadows.push(`${i}px ${j}px 0 ${color}`)
        }
    }

    return shadows.join(",")
}

// Source: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

export function makeId(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function getDateString() {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, "0")
    const mm = String(today.getMonth() + 1).padStart(2, "0")
    const yyyy = today.getFullYear()

    return dd + mm + yyyy
}

export function createListeners(target, events) {
    events.forEach(([name, fn]) => {
        target.addEventListener(name, fn, false)
    })

    return () => events.forEach(([name, fn]) => {
        target.removeEventListener(name, fn, false)
    })
}