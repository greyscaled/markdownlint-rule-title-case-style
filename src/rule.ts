import { Rule, RuleOnError, RuleParams } from "markdownlint"

import parseConf from "./conf.js"
import filterHeadings from "./filter_headings.js"
import lintInline from "./lint_inline.js"

const rule: Rule = {
    description: "Letter case style",
    function: (params: RuleParams, onError: RuleOnError): void => {
        const conf = parseConf(params.config)

        for (const heading of filterHeadings(params.tokens)) {
            const violations = lintInline(heading, conf)

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
