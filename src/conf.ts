import TitleCaseStyleError from "./error.js"

export interface RuleConfig {
    case: "sentence" | "title"
}

export const defaultRuleConfig: RuleConfig = {
    case: "sentence",
}

const parseConfig = (config: unknown): RuleConfig => {
    const result = {
        ...defaultRuleConfig,
    }

    if (!config || typeof config !== "object") {
        return result
    }

    if ("case" in config) {
        if (typeof config.case !== "string") {
            throw new TitleCaseStyleError(
                `config: case: expected 'string', got '${typeof config.case}'`,
            )
        }

        switch (config.case) {
            case "sentence":
                result.case = "sentence"
                break
            case "title":
                result.case = "title"
                break
            default:
                throw new TitleCaseStyleError(
                    `config: case: expected ['sentence', 'title'], got '${config.case}'`,
                )
        }
    }

    return result
}
export default parseConfig
