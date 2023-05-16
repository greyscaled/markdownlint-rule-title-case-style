import { Token } from "./tokenizer"

export interface TokenWithAnalysis extends Token {
    expected: string
}

export type TokenAnalysisStrategy = "sentence" | "title"

const tokenAnalyzer = (tokens: Token[], strategy: TokenAnalysisStrategy): TokenWithAnalysis[] => {
    if (strategy === "sentence") {
        return sentenceStrategy(tokens)
    }
    return []
}
export default tokenAnalyzer

const sentenceStrategy = (tokens: Token[]): TokenWithAnalysis[] => {
    let isFirstWord = false

    return tokens.map((token) => {
        const result: TokenWithAnalysis = { ...token, expected: token.value }

        if (token.type !== "other") {
            return result
        }

        if (!token.isIgnoredWord) {
            result.expected = isFirstWord
                ? lowercaseFirst(token.value)
                : capitalizeFirst(token.value)
        }

        if (!isFirstWord) {
            isFirstWord = true
        }

        return result
    })
}

const titleStrategy = (tokens: Token[]): TokenWithAnalysis[] => {
    return tokens.map((token) => {
        const result: TokenWithAnalysis = { ...token, expected: token.value }

        if (token.type !== "other") {
            return result
        }

        if (!token.isIgnoredWord) {
            result.expected = isFirstWord
                ? lowercaseFirst(token.value)
                : capitalizeFirst(token.value)
        }

        if (!isFirstWord) {
            isFirstWord = true
        }

        return result
    })
}

const capitalizeFirst = (str: string): string => {
    if (!str.length) {
        return str
    }

    return str[0].toUpperCase() + str.slice(1)
}

const lowercaseFirst = (str: string): string => {
    if (!str.length) {
        return str
    }

    return str[0].toLowerCase() + str.slice(1)
}
