// reToken is used to capture groups of interest for the purpose of sentence
// casing. This attempts to keep locale in mind with unicode support.
//
// A title is always a "line" (newline ends the title in Markdown lexing), and
// so we can conceive of a "line" containing various useful tokens:
//
//  <token> := <term> | <upper> | <quote> | <fquote> | <chars> | <ws>
//
//   <term> := "!" | "." | "?"
//
//  <upper> := a set of <chars> whereby each char is UPPERCASE
//
//  <quote> := a set of <chars> inside an enclosing pair of double quotes
//
// <fquote> := a set of <chars> inside an enclosing pair of fancy quotes “”
//
//  <chars> := a set of characters excluding whitespace and <terms>
//
//     <ws> := any whitespace character
const reToken =
    /(?<term>[!.?])|(?<upper>[^\s!.?\p{Ll}]{2,}(?=[\s!.?]|$))|(?<quote>"[^"]+")|(?<fquote>“[^“”]+”)|(?<chars>[^\s!.?]+)|(?<ws>.)/gu

export interface Token {
    group: "chars" | "fquote" | "quote" | "terminal" | "uppercase" | "whitespace"
    value: string
}

const tokenizer = (str: string): Token[] => {
    const tokens: Token[] = []

    const matches = str.matchAll(reToken)

    for (const match of matches) {
        const [value] = match

        let group: Token["group"] = "chars"
        if (typeof match.groups?.fquote !== "undefined") {
            group = "fquote"
        }
        if (typeof match.groups?.quote !== "undefined") {
            group = "quote"
        }
        if (typeof match.groups?.term !== "undefined") {
            group = "terminal"
        }
        if (typeof match.groups?.upper !== "undefined") {
            group = "uppercase"
        }
        if (typeof match.groups?.ws !== "undefined") {
            group = "whitespace"
        }

        tokens.push({
            group,
            value,
        })
    }

    return tokens
}
export default tokenizer
