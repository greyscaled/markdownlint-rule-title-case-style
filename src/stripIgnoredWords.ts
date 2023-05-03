export interface StripIgnoreWords {
    value: string
    ignoredIndicies: number[]
}

const stripIgnoreWords = (content: string, ignoredWords: unknown[]): StripIgnoreWords => {
    const ignoredIndicies: number[] = []

    for (const ignoredWord of ignoredWords) {
        if (typeof ignoredWord !== "string") {
            throw new Error(
                `title-case-style: unexpected value in config.ignore. Expected: string; Actual: ${typeof ignoredWord}`
            )
        }
    }

    const value = content
        .split(" ")
        .filter((word, idx) => {
            if (idx === 0) {
                return true
            }

            const withoutCommas = word.endsWith(",") ? word.slice(0, word.length - 1) : word

            if (ignoredWords.includes(withoutCommas)) {
                ignoredIndicies.push(idx)
                return false
            }

            return true
        })
        .join(" ")
    return { value, ignoredIndicies }
}

export default stripIgnoreWords

export const withIgnored = (
    original: string,
    stripped: string,
    ignoredIndicies: number[]
): string => {
    const originalWords = original.split(" ")
    const strippedWords = stripped.split(" ")
    const result: string[] = []

    for (const [idx, word] of strippedWords.entries()) {
        if (ignoredIndicies.includes(idx)) {
            result.push(originalWords[idx])
        }
        result.push(word)
    }

    for (let i = result.length; i < originalWords.length; i++) {
        result.push(originalWords[i])
    }

    return result.join(" ")
}
