export const TYPE = "TYPE"

export default function format(type) {
    let fn

    if (type === TYPE) {
        fn = () => {}
    }

    return (data) => {
        return new Promise(resolve => {
            fn(data)
            resolve(data)
        })
    }
}