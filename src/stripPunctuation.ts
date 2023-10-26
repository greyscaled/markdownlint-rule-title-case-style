export interface StripPunctuation {
    stripped: string
    value: string
}

const stripPunctuation = (str: string): StripPunctuation => {
    const lastChar = str[str.length - 1]
    const punctuation = [".", "?", "!"]

    if (punctuation.includes(lastChar)) {
        return {
            stripped: lastChar,
            value: str.slice(0, str.length - 1),
        }
    }

    return {
        stripped: "",
        value: str,
    }
}

export default stripPunctuation
