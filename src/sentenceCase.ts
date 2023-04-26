const sentenceCase = (str: string): string => {
    return str.split(" ").reduce((prev, curr, idx) => {
        if (idx === 0) {
            return curr.charAt(0).toUpperCase() + curr.slice(1)
        } else {
            return prev + " " + curr.toLowerCase()
        }
    }, "")
}

export default sentenceCase
