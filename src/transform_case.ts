import tokenizer from "./tokenizer.js"

const sentenceCase = (str: string, midSentence = false): string => {
    let result = ""
    let isStart = !midSentence

    for (const token of tokenizer(str)) {
        switch (token.group) {
            case "chars":
                if (isStart) {
                    result += upper(token.value)
                    isStart = false
                } else {
                    result += lower(token.value)
                }
                break

            case "terminal":
                result += token.value
                isStart = true
                break

            case "fquote":
            case "quote":
            case "uppercase":
                result += token.value
                if (isStart) {
                    isStart = false
                }
                break

            case "whitespace":
            default:
                result += token.value
        }
    }

    return result
}
export default sentenceCase

const reAlphanumeric = /[\p{L}\d]+/gu

export const lower = (str: string): string => {
    return str.replace(reAlphanumeric, (s) => {
        return s.charAt(0).toLocaleLowerCase() + s.slice(1)
    })
}

export const upper = (str: string): string => {
    return str.replace(reAlphanumeric, (s, i) => {
        if (i > 0) {
            return s
        }
        return s.charAt(0).toLocaleUpperCase() + s.slice(1)
    })
}
