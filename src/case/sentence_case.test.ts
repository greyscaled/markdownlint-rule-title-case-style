import { describe, expect, test } from "@jest/globals"

import sentenceCase from "./sentence_case.js"

describe("sentenceCase", () => {
    test.each<[string, string, string]>([
        ["Empty", "", ""],
        ["EmptySpaces", "  ", "  "],

        ["Year", "2023", "2023"],

        ["SingleLowerCase", "test", "Test"],
        ["SingleUppserCase", "Test", "Test"],

        ["TwoWordsLowerCase", "two words", "Two words"],
        ["TwoWordsTitleCase", "Two Words", "Two words"],
        ["TwoWordsSentenceCase", "Two words", "Two words"],

        ["PeriodLowerCase", "one. two.", "One. Two."],
        ["PeriodTitleCase", "One. Two.", "One. Two."],

        ["SentenceLowerCase", "small word ends on", "Small word ends on"],
        ["SentenceTitleCase", "Small Word Ends On", "Small word ends on"],
        ["SentenceSentenceCase", "Small word ends on", "Small word ends on"],

        ["NASALowerCase", "we keep NASA capitalized", "We keep NASA capitalized"],
        ["NASATitleCase", "We Keep NASA Capitalized", "We keep NASA capitalized"],
        ["NASASentenceCase", "We keep NASA capitalized", "We keep NASA capitalized"],

        ["camelLowerCase", "pass camelCase through", "Pass camelCase through"],
        ["camelTitleCase", "Pass camelCase Through", "Pass camelCase through"],
        ["camelSentenceCase", "Pass camelCase through", "Pass camelCase through"],

        ["DashLowerCase", "follow Step-by-Step instructions", "Follow step-by-step instructions"],
        ["DashTitleCase", "Follow Step-by-Step Instructions", "Follow step-by-step instructions"],
        [
            "DashSentenceCase",
            "Follow Step-by-Step instructions",
            "Follow step-by-step instructions",
        ],

        ["ParensLowerCase", "your hair[cut] looks (nice)", "Your hair[cut] looks (nice)"],
        ["ParensTitleCase", "Your Hair[cut] Looks (Nice)", "Your hair[cut] looks (nice)"],
        ["ParensSentenceCase", "Your hair[cut] looks (nice)", "Your hair[cut] looks (nice)"],

        ["Q&ALowerCase", "leave Q&A unscathed", "Leave Q&A unscathed"],
        ["Q&ATitleCase", "Leave Q&A Unscathed", "Leave Q&A unscathed"],
        ["Q&ASentenceCase", "Leave Q&A unscathed", "Leave Q&A unscathed"],

        [
            "PiñaLowerCase",
            "piña colada while you listen to ænima",
            "Piña colada while you listen to ænima",
        ],
        [
            "PiñaTitleCase",
            "Piña Colada While You Listen to Ænima",
            "Piña colada while you listen to ænima",
        ],
        [
            "PiñaSentenceCase",
            "Piña colada while you listen to ænima",
            "Piña colada while you listen to ænima",
        ],

        ["Don'tLowerCase", "don't break", "Don't break"],
        ["Don'tTitleCase", "Don't Break", "Don't break"],
        ["Don'tSentenceCase", "Don't break", "Don't break"],

        ["DoubleQuoteStartLowerCase", '"double quotes" thing', '"double quotes" thing'],
        ["DoubleQuoteStartTitleCase", '"Double Quotes" Thing', '"Double Quotes" thing'],
        ["DoubleQuoteStartSentenceCase", '"Double quotes" thing', '"Double quotes" thing'],

        ["DoubleQuoteInnerLowerCase", 'double quotes "inner" word', 'Double quotes "inner" word'],
        ["DoubleQuoteInnerTitleCase", 'Double Quotes "Inner" Word', 'Double quotes "Inner" word'],
        [
            "DoubleQuoteInnerSentenceCase",
            'Double quotes "inner" word',
            'Double quotes "inner" word',
        ],

        [
            "FancyQuoteInnerLowerCase",
            "fancy double quotes “inner” word",
            "Fancy double quotes “inner” word",
        ],
        [
            "FancyQuoteInnerTitleCase",
            "Fancy Double Quotes “Inner” Word",
            "Fancy double quotes “Inner” word",
        ],
        [
            "FancyQuoteInnerSentenceCase",
            "Fancy double quotes “inner” word",
            "Fancy double quotes “inner” word",
        ],

        ["FancyQuoteEndLowerCase", "have you read “the lottery”?", "Have you read “the lottery”?"],
        ["FancyQuoteEndTitleCase", "Have You Read “The Lottery”?", "Have you read “The Lottery”?"],
        [
            "FancyQuoteEndSentenceCase",
            "Have you read “The lottery”?",
            "Have you read “The lottery”?",
        ],

        ["ColonLowerCase", "one: two", "One: two"],
        ["ColonTitleCase", "One: Two", "One: two"],
        ["ColonSentenceCase", "One: two", "One: two"],

        [
            "BeatGoesOn",
            "Notes and Observations Regarding Apple’s Announcements from ‘The Beat Goes On’ special event",
            "Notes and observations regarding Apple’s announcements from ‘The Beat Goes On’ special event",
        ],

        [
            "BrownFox",
            "the quick brown fox jumps over the lazy dog",
            "The quick brown fox jumps over the lazy dog",
        ],
        // [
        //     "Is human activity responsible for the climate emergency? New report calls it ‘unequivocal.’",
        //     "Is Human Activity Responsible for the Climate Emergency? New Report Calls It ‘Unequivocal.’",
        // ],
        // ["лев николаевич толстой", "Лев Николаевич Толстой"],
        // ["Read foo-bar.com", "Read foo-bar.com"],
    ])("Start%s", (_, str, expected) => {
        expect(sentenceCase(str)).toBe(expected)
    })
})
