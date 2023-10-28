import { MarkdownItToken, RuleOnErrorInfo } from "markdownlint"

import TitleCaseStyleError from "./error.js"

export interface Violation {
    detail: RuleOnErrorInfo["detail"]
    fixInfo: RuleOnErrorInfo["fixInfo"]
    lineNumber: RuleOnErrorInfo["lineNumber"]
}

const validateCase = (tok: MarkdownItToken): Violation[] => {
    // If outermost token isn't `inline`, we've done something wrong with
    // collecting/filtering the right tokens, or we are missing an edge case in
    // the specification.
    if (tok.type !== "inline") {
        throw new TitleCaseStyleError(
            `validate: invalid token: expected 'inline', got '${tok.type}'`,
            true,
        )
    }

    // title-case-style doesn't take an opinion on empty headings (ie: `#`), as
    // this is technically "valid" strictly from a case perspective. Regular
    // markdownlint rules should catch this.
    if (!tok.content || !tok.children.length) {
        return []
    }

    const violatons: Violation[] = []

    const remaining = [...tok.children]

    // Only process text symbols
    // ignore links
    // Keep track of whether or not we've hit punctuation
    for (const [i, child] of remaining.entries()) {
        console.log(i)
        console.log(JSON.stringify(child, null, 2)) // REMOVE ME
    }

    return violatons
}
export default validateCase
