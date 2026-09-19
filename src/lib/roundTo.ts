/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param n - The number to round.
 * @param roundTo - The number of decimal places to round to.
 * @returns The rounded number.
 *
 * @example
 * // Round to 2 decimal places
 * roundTo(3.14159, 2); // returns 3.14
 *
 * @example
 * // Round to nearest integer
 * roundTo(3.14159, 0); // returns 3
 */
export function roundTo(n: number, roundTo: number): number {
    const factor = Math.pow(10, roundTo)

    return Math.round(n * factor) / factor
}
