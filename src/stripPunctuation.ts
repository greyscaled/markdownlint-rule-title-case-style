export interface StripPunctuation {
    value: string
    stripped: string
}

const stripPunctuation = (str: string): StripPunctuation => {
    const lastChar = str[str.length - 1]
    const punctuation = [".", "?", "!"]

    if (punctuation.includes(lastChar)) {
        return {
            value: str.slice(0, str.length - 1),
            stripped: lastChar,
        }
    }

    return {
        value: str,
        stripped: "",
    }
}

export default stripPunctuation
