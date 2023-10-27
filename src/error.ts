class TitleCaseStyleError extends Error {
    constructor(err: string) {
        super(`title-case-style: ${err}`)
    }
}
export default TitleCaseStyleError
