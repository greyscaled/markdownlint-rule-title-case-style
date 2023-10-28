import { MarkdownItToken, RuleOnErrorInfo } from "markdownlint"
import { titleCase } from "title-case"

import TitleCaseStyleError from "./error.js"
import sentenceCase from "./transform_case.js"

export interface TextNodeTranformer {
    transform: (str: string, midSentence?: boolean) => string
}

export const createTransformer = (style: "sentence" | "title" = "sentence"): TextNodeTranformer => {
    if (style === "title") {
        return {
            transform: (str: string) => titleCase(str),
        }
    }
    return {
        transform: sentenceCase,
    }
}

export interface Violation {
    detail: RuleOnErrorInfo["detail"]
    fixInfo: RuleOnErrorInfo["fixInfo"]
    lineNumber: RuleOnErrorInfo["lineNumber"]
}

const lintInline = (inlineToken: MarkdownItToken, transformer: TextNodeTranformer): Violation[] => {
    // If outermost token isn't `inline`, we've done something wrong with
    // filtering the right tokens
    if (inlineToken.type !== "inline") {
        throw new TitleCaseStyleError(
            `validate: invalid token: expected 'inline', got '${inlineToken.type}'`,
            true,
        )
    }

    // title-case-style doesn't take an opinion on empty headings (ie: `#`), as
    // this is technically "valid" strictly from a case perspective. Regular
    // markdownlint rules should catch this.
    if (!inlineToken.content || !inlineToken.children.length) {
        return []
    }

    const violatons: Violation[] = []
    let ctx: "link" | "text" = "text"
    let midSentence = false

    for (const [i, child] of [...inlineToken.children].entries()) {
        switch (child.type) {
            case "code_inline":
                // Heading starts with code: case insensitive
                if (i === 0) midSentence = true
                break
            case "link_open":
                ctx = "link"
                break
            case "link_close":
                ctx = "text"
                break
            case "text": {
                // In <link_open><text><link_close>, the <text> is ignored.
                if (ctx === "link") {
                    // Heading starts with link: case insensitive
                    if (i === 0) midSentence = true
                    continue
                }

                // Blank <text> around <strong_open>, <strong_close>
                if (child.content === "") {
                    continue
                }

                const expected = transformer.transform(child.content, midSentence)
                if (child.content !== expected) {
                    violatons.push({
                        detail: `Expected: '${expected}'; Actual: '${child.content}'`,
                        fixInfo: {
                            deleteCount: child.content.length,
                            // editColumn is 1s based, hence the + 1
                            editColumn: inlineToken.line.indexOf(child.content) + 1,
                            insertText: expected,
                            lineNumber: inlineToken.lineNumber,
                        },
                        lineNumber: inlineToken.lineNumber,
                    })
                }
                midSentence = true
                break
            }
            case "em_open":
            case "em_close":
            case "image":
            case "strong_open":
            case "strong_close":
            default:
                // TODO: info log for unrecognized node
                continue
        }
    }

    return violatons
}
export default lintInline
