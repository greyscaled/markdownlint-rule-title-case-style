import { describe, expect, test } from "@jest/globals"
import sentenceCase from "./sentenceCase"

describe("sentenceCase", () => {
    test.each<[string, string]>([
        // Empty cases
        ["", ""],

        // Single letter/word cases
        ["a", "A"],
        ["CAPS", "CAPS"],

        // Typical cases
        ["Hello World", "Hello world"],
        ["Hello world", "Hello world"],

        // Delimiter cases
        ["Some-Hyphen Thing", "Some-Hyphen thing"],
        ["Hello_World Good-Bye", "Hello_World good-bye"],
    ])(`sentenceCase(%p) = %p`, (a, b) => {
        expect(sentenceCase(a)).toBe(b)
    })
})
