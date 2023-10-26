import { describe, expect, test } from "@jest/globals"
import stripIgnoreWords, { withIgnored } from "./stripIgnoredWords.js"

describe("stripIgnoredWords", () => {
    test.each<[string, string[], string, number[]]>([
        // Empty cases
        ["", [], "", []],
        [" ", [], " ", []],
        ["", ["hello"], "", []],

        // No ignored words or no ignored words match
        ["Hello how are you", [], "Hello how are you", []],
        ["Hello how are you", ["goodbye"], "Hello how are you", []],

        // ignored words must match exactly
        ["Hello how are you", ["how"], "Hello are you", [1]],
        ["Hello how are you", ["how", "are", "you", "test"], "Hello", [1, 2, 3]],

        // First word is always ignored
        ["Hello how are you", ["Hello"], "Hello how are you", []],
        ["Hello Hello how are you", ["Hello"], "Hello how are you", [1]],

        // Differing cases do not match
        ["Hello", ["hello"], "Hello", []],
    ])(`stripIgnoredWords(%p, %p) = %p %p`, (content, ignoreWords, expected, ignoredIndicies) => {
        expect(stripIgnoreWords(content, ignoreWords).value).toBe(expected)
        expect(stripIgnoreWords(content, ignoreWords).ignoredIndicies).toEqual(ignoredIndicies)
    })
})

describe("withIgnored", () => {
    test.each<[string, string, number[], string]>([
        // Empty
        ["", "", [], ""],
        ["Hello how are you", "Hello how are you", [], "Hello how are you"],

        // Re-add ignored words
        ["Hello how are you", "Hello", [1, 2, 3], "Hello how are you"],

        // First-word
        ["Hello Hello how are you", "Hello how are you", [1], "Hello Hello how are you"],
    ])(`withIgnored(%p, %p, %p) = %p`, (original, stripped, ignoredIndicies, expected) => {
        expect(withIgnored(original, stripped, ignoredIndicies)).toBe(expected)
    })
})
