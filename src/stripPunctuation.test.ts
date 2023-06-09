import stripPunctuation from "./stripPunctuation"

describe("stripPunctuation", () => {
    test.each<[string, string, string]>([
        // Empty cases
        ["", "", ""],
        [" ", " ", ""],

        // Nothing to strip
        ["Hello world", "Hello world", ""],

        // Strip
        ["Hello world!", "Hello world", "!"],
        ["Goodbye.", "Goodbye", "."],
        ["Et tu, Brute?", "Et tu, Brute", "?"],
    ])(`stripPunctuation(%p) = { value: %p, stripped: %p}`, (str, value, stripped) => {
        const result = stripPunctuation(str)
        expect(result.value).toBe(value)
        expect(result.stripped).toBe(stripped)
    })
})
