import { MarkdownItToken } from "markdownlint"

const filterHeadings = (tokens: MarkdownItToken[]): MarkdownItToken[] => {
    const result: MarkdownItToken[] = []

    let heading = null

    for (const token of tokens) {
        if (token.type === "heading_open") {
            heading = token
        } else if (token.type === "heading_close") {
            heading = null
        } else if (token.type === "inline" && heading) {
            result.push(token)
        }
    }

    return result
}
export default filterHeadings
