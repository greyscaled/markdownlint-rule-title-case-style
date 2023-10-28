const reAlphanumeric = /[\p{L}\d]+/gu

export const lower = (str: string): string => {
    return str.replace(reAlphanumeric, (s) => {
        return s.charAt(0).toLocaleLowerCase() + s.slice(1)
    })
}

export const upper = (str: string): string => {
    return str.replace(reAlphanumeric, (s, i) => {
        if (i > 0) {
            return s
        }
        return s.charAt(0).toLocaleUpperCase() + s.slice(1)
    })
}
