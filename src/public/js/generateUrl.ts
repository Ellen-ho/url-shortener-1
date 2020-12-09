function sample(collection: string): string {
    const index = Math.floor(Math.random() * collection.length)
    return collection[index]
}

function generateUrl(length: number): string {
    // define things user might want
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseLetters = lowerCaseLetters.toUpperCase()
    const numbers = '1234567890'
    const collection = lowerCaseLetters + upperCaseLetters + numbers
    let url = ''

    while (url.length < length) {
        url += sample(collection)
    }
    return url
}

export default generateUrl