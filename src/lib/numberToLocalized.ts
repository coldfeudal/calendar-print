/**
 * Returns the appropriate grammatical form for Russian nouns based on the number.
 *
 * @param n The number value
 * @param s1 Singular form (1 товар)
 * @param s2 Genitive singular form for 2-4 (2 товара)
 * @param s5 Genitive plural form for 0, 5-20, etc (5 товаров)
 * @returns The appropriate string form for the given number
 */
const numberLocalized = (n: number, s1: string, s2: string, s5: string): string => {
    // Handle negative numbers
    const absN = Math.abs(n)

    // Special case for numbers ending in 11-19
    const mod100 = absN % 100

    if (mod100 >= 11 && mod100 <= 19) {
        return s5
    }

    // For other cases, check the last digit
    const mod10 = absN % 10

    if (mod10 === 1) {
        return s1
    } else if (mod10 >= 2 && mod10 <= 4) {
        return s2
    } else {
        return s5
    }
}

export default numberLocalized
