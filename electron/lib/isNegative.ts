const isNegative = (num: number): boolean => {
    return num < 0 || Object.is(num, -0)
}

export default isNegative
