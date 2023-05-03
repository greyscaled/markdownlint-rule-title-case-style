export interface StripLead {
    value: string
    stripped: string
}

const stripLead = (str: string): StripLead => {
    const re = /^\d+\.\s+/

    let result = str
    let stripped = ""

    const matches = str.match(re)
    if (matches && matches.length && matches[0]) {
        result = str.replace(re, "")
        stripped = matches[0]
    }

    return {
        value: result,
        stripped,
    }
}

export default stripLead
