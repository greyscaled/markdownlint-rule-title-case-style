export type TokenType = "number" | "other" | "punctuation" | "whitespace"
export interface Token {
    columnStart: number
    columnEnd: number
    isIgnoredWord: boolean
    type: TokenType
    value: string
}

const tokenizer = (str: string, ignoredWords: string[]): Token[] => {
    const result: Token[] = []

    if (!str.length) {
        return result
    }

    let columnStart = 1
    let columnEnd = 0
    for (let i = 0; i < str.length; i++) {
        columnEnd += 1

        const c = str[i]
        const type = tokenType(c)
        const nextType = i + 1 >= str.length ? null : tokenType(str[i + 1])

        if (type === nextType) {
            continue
        }

        const value = str.slice(columnStart - 1, columnEnd)
        const isIgnoredWord = ignoredWords.includes(value)

        result.push({
            columnStart,
            columnEnd,
            isIgnoredWord,
            type,
            value,
        })

        columnStart = columnEnd + 1
    }

    return result
}
export default tokenizer

const tokenType = (str: string): TokenType => {
    if (/[0-9]/.test(str)) {
        return "number"
    }

    if ([",", ".", "?", "!"].includes(str)) {
        return "punctuation"
    }

    if (str === " ") {
        return "whitespace"
    }

    return "other"
}
