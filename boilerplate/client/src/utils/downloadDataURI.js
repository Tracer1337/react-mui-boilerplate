import { IS_CORDOVA, GALLERY_FOLDER_NAME } from "../config/constants.js"
import { getDateString, makeId } from "./index.js"

// Source: https://forum.ionicframework.com/t/save-base64-encoded-image-to-specific-filepath/96180/3

function b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

function toBlob(dataURI) {
    const mimeType = dataURI.match(/data:([^;]*)/)[1]
    const blob = b64toBlob(dataURI.replace("data:image/png;base64,", ""), mimeType)
    return blob
}

function downloadDataURI(src) {
    if (!IS_CORDOVA) {
        const a = document.createElement("a")
        a.href = src
        a.download = "download.png"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    } else {
        // This should be adjusted when publishing to iOS
        const storageLocation = window.cordova.file.externalRootDirectory
        const filename = `MemeBros-${getDateString()}-${makeId(7)}.png`

        const blob = toBlob(src)

        return new Promise(resolve => {
            window.resolveLocalFileSystemURL(storageLocation, dir => {
                
                // Get / Create "Pictures" Folder
                dir.getDirectory("Pictures", { create: true, exclusive: false }, dir => {
                    
                    // Get / Create Gallery Folder
                    dir.getDirectory(GALLERY_FOLDER_NAME, { create: true, exclusive: false }, dir => {
                        console.log(dir)
                        
                        // Create image
                        dir.getFile(filename, { create: true }, file => {
                            file.createWriter(fileWriter => {
                                fileWriter.write(blob)
                                resolve()
                            }, console.error)
                        }, console.error)
                    }, console.error)
                }, console.error)
            }, console.error)
        })
    }
}

export default downloadDataURI