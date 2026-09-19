import CssFilterConverter from "css-filter-converter"

const { hexToFilter: h2f, } = CssFilterConverter

export const hexToFilter = (hex: string) => {
    return h2f(hex).color
}
