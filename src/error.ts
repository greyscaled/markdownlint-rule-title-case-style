const issueTracker = "https://github.com/greyscaled/markdownlint-rule-title-case-style/issues"

class TitleCaseStyleError extends Error {
    constructor(err: string, internal = false) {
        let msg = `title-case-style: ${err}`
        if (internal) {
            msg += `: this may be an error with title-case-style; file a bug report: ${issueTracker}`
        }
        super(msg)
    }
}
export default TitleCaseStyleError
