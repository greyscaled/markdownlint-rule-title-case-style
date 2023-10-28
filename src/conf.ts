import TitleCaseStyleError from "./error.js"

export interface RuleConfig {
    case: "sentence" | "title"
    ignore: string[]
}

export const defaultRuleConfig: RuleConfig = {
    case: "sentence",
    ignore: [],
}

const parseConf = (config: unknown): RuleConfig => {
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

    if ("ignore" in config) {
        if (!Array.isArray(config.ignore)) {
            throw new TitleCaseStyleError(
                `config: ignore: expected 'array', got '${typeof config.ignore}'`,
            )
        }

        const invalidTypes = config.ignore.filter((v) => typeof v !== "string")
        if (invalidTypes.length) {
            throw new TitleCaseStyleError(`config: ignore: ignore must be of type string[]`)
        }

        result.ignore = config.ignore as string[]
    }

    return result
}
export default parseConf
