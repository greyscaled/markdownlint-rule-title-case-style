import { Rule, RuleOnError, RuleParams } from "markdownlint"

// import { parse } from "./conf.js"
import filterHeadings from "./filter_headings.js"
import validateCase from "./validate_case.js"

const rule: Rule = {
    description: "Enforces case style in titles",
    function: (params: RuleParams, onError: RuleOnError): void => {
        // config = parse(params.config)

        for (const heading of filterHeadings(params.tokens)) {
            const violations = validateCase(heading)

            for (const violation of violations) {
                onError({
                    detail: violation.detail,
                    fixInfo: violation.fixInfo,
                    lineNumber: violation.lineNumber,
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
