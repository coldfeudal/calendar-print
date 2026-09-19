const validCases = [
    "camel",
    "pascal",
    "snake",
    "kebab",
] as const

type Case = typeof validCases[number]

export class CaseTransformer {
    public words: string[] = []

    constructor(private readonly str: string) {
        const caseType = this.detectCase()
        this.str = str
        this.words = this.splitWords(caseType)
    }

    isCamelCase = (str: string): boolean => {
        return /^[a-z0-9]+(?:[A-Z][a-z0-9]*)*$/.test(str)
    }

    isPascalCase = (str: string): boolean => {
        return /^[A-Z][a-z0-9]*(?:[A-Z][a-z0-9]*)*$/.test(str)
    }

    isSnakeCase = (str: string): boolean => {
        return /^[a-z]+(?:_[a-z0-9]+)*$/.test(str)
    }

    isKebabCase = (str: string): boolean => {
        return /^[a-z]+(?:-[a-z0-9]+)*$/.test(str)
    }

    detectCase = (): Case => {
        if (this.isSnakeCase(this.str)) {
            return "snake"
        }

        if (this.isKebabCase(this.str)) {
            return "kebab"
        }

        if (this.isCamelCase(this.str)) {
            return "camel"
        }

        if (this.isPascalCase(this.str)) {
            return "pascal"
        }

        throw new Error("Invalid case")
    }

    splitWords = (fromCase: Case): string[] => {
        let split: string[] = []

        switch (fromCase) {
            case "camel":

            // eslint-disable-next-line no-fallthrough
            case "pascal":
                // Use match to group multiple digits together and split on uppercase
                split = this.str.match(/[A-Z]?[a-z]+|\d+|[A-Z]+(?![a-z])|[A-Z]+/g) ?? []
                break

            case "snake":
                split = this.str.split("_")
                break

            case "kebab":
                split = this.str.split("-")
                break
        }

        return split.map(word => word.toLowerCase())
    }

    convertToCase = (toCase: Case): string => {
        switch (toCase) {
            case "camel":
                return this.words.map((word, index) => {
                    if (index === 0) {
                        return word
                    }

                    return word.charAt(0).toUpperCase() + word.slice(1)
                }).join("")

            case "pascal":
                return this.words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")

            case "snake":
                return this.words.join("_")

            case "kebab":
                return this.words.join("-")
        }
    }
}
