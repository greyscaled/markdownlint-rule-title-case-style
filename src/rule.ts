import { Rule, RuleOnError, RuleParams } from "markdownlint"

// import { parse } from "./conf.js"
import filterHeadings from "./filter_headings.js"

const rule: Rule = {
    description: "Enforces case style in titles",
    function: (params: RuleParams, onError: RuleOnError): void => {
        // config = parse(params.config)

        for (const heading of filterHeadings(params.tokens)) {
            const actual = heading.content
            const expected = "" // TODO

            if (expected !== heading.content) {
                onError({
                    detail: `Expected: ${expected}; Actual: ${actual}`,
                    fixInfo: {
                        deleteCount: actual.length,
                        // editColumn is 1s based, hence the + 1
                        editColumn: heading.line.indexOf(heading.content) + 1,
                        insertText: expected,
                        lineNumber: heading.lineNumber,
                    },
                    lineNumber: heading.lineNumber,
                })
            }
        }
    },
    information: new URL(
        "https://github.com/greyscaled/markdownlint-rule-title-case-style/tree/main#usage",
    ),
    names: ["title-case-style"],
    tags: ["headers", "headings"],
}
export default rule
