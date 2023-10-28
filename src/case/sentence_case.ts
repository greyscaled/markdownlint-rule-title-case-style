import tokenizer from "./tokenizer.js"
import { lower, upper } from "./transform_case.js"

const sentenceCase = (str: string, midSentence = false): string => {
    let result = ""
    let isStart = !midSentence

    for (const token of tokenizer(str)) {
        switch (token.group) {
            case "chars":
                if (isStart) {
                    result += upper(token.value)
                    isStart = false
                } else {
                    result += lower(token.value)
                }
                break

            case "terminal":
                result += token.value
                isStart = true
                break

            case "fquote":
            case "quote":
            case "uppercase":
                result += token.value
                if (isStart) {
                    isStart = false
                }
                break

            case "whitespace":
            default:
                result += token.value
        }
    }

    return result
}
export default sentenceCase
