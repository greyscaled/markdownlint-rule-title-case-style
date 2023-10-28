/* eslint-disable perfectionist/sort-objects */
import { expect, test } from "@jest/globals"

import sentenceCase from "./sentence_case.js"

test("sentenceCase", () => {
    const testCases: Array<{ expected: string; ignore?: string[]; mid?: boolean; str: string }> = [
        { str: "2023", expected: "2023" },
        { str: "test", expected: "Test" },
        { str: "Test", expected: "Test" },
        { str: "two words", expected: "Two words" },
        { str: "Two Words", expected: "Two words" },
        { str: "one. two.", expected: "One. Two." },
        { str: "we keep NASA capitalized", expected: "We keep NASA capitalized" },
        { str: "pass camelCase through", expected: "Pass camelCase through" },
        { str: "follow Step-by-Step instructions", expected: "Follow step-by-step instructions" },
        { str: "Your Hair[cut] Looks (Nice)", expected: "Your hair[cut] looks (nice)" },
        { str: "Leave Q&A Unscathed", expected: "Leave Q&A unscathed" },
        {
            str: "piña colada while you listen to ænima",
            expected: "Piña colada while you listen to ænima",
        },
        { str: "don't break", expected: "Don't break" },
        { str: "Don't Break", expected: "Don't break" },
        { str: "Don't break", expected: "Don't break" },
        { str: '"double quotes" thing', expected: '"double quotes" thing' },
        { str: '"Double Quotes" Thing', expected: '"Double Quotes" thing' },
        {
            str: 'double quotes "Inner" word',
            expected: 'Double quotes "Inner" word',
        },
        {
            str: "fancy double quotes “inner” word",
            expected: "Fancy double quotes “inner” word",
        },
        {
            str: "have you read “the lottery”?",
            expected: "Have you read “the lottery”?",
        },
        {
            str: 'Notes and Observations Regarding Apple\'s Announcements from "The Beat Goes On" special event',
            expected:
                'Notes and observations regarding Apple\'s announcements from "The Beat Goes On" special event',
            ignore: ["Apple's"],
        },
    ]

    for (const tc of testCases) {
        expect(sentenceCase(tc.str, tc.mid, tc.ignore)).toBe(tc.expected)
    }
})
