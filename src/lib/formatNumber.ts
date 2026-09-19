export const formatNumber = (number: number, formatWith: string = ","): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, formatWith)
}
