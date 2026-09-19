/** @type { import("eslint").Linter.Config } */
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        extraFileExtensions: [ ".svelte", ],
    },
    plugins: [
        "prettier",
        "@typescript-eslint",
        "eslint-plugin-no-template-curly-in-string-fix",
        "autofix",
        "modules-newlines",
    ],
    extends: [
        "plugin:prettier/recommended",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:svelte/recommended",
        "plugin:prettier/recommended",
    ],
    settings: {
        "import/resolver": {
            node: {
                extensions: [
                    "*.js",
                    "*.jsx",
                    "*.ts",
                    "*.tsx",
                ],
            },
        },
    },
    root: true,
    overrides: [
        {
            files: [ "*.svelte", ],
            parser: "svelte-eslint-parser",
            parserOptions: { parser: "@typescript-eslint/parser", },
            rules: {
                "svelte/max-attributes-per-line": [
                    "warn",
                    {
                        multiline: 1,
                        singleline: 1,
                    },
                ],
                "svelte/indent": [
                    "warn",
                    {
                        indent: 4,
                        ignoredNodes: [],
                        switchCase: 1,
                        alignAttributesVertically: true,
                    },
                ],
                "svelte/first-attribute-linebreak": [
                    "warn",
                    {
                        multiline: "below",
                        singleline: "beside",
                    },
                ],
                "svelte/html-closing-bracket-spacing": [
                    "warn",
                    {
                        startTag: "never",
                        endTag: "never",
                        selfClosingTag: "always",
                    },
                ],
                "svelte/html-quotes": [
                    "warn",
                    {
                        prefer: "double",
                        dynamic: {
                            quoted: false,
                            avoidInvalidUnquotedInHTML: false,
                        },
                    },
                ],
                "svelte/no-spaces-around-equal-signs-in-attribute": "warn",
                "svelte/spaced-html-comment": [
                    "warn",
                    "always",
                ],
                "svelte/shorthand-attribute": [
                    "warn",
                    { prefer: "always", },
                ],
                "svelte/shorthand-directive": [
                    "warn",
                    { prefer: "always", },
                ],
                "svelte/no-trailing-spaces": [
                    "warn",
                    {
                        skipBlankLines: false,
                        ignoreComments: false,
                    },
                ],
                "svelte/prefer-class-directive": [ "warn", ],
                "svelte/prefer-style-directive": [ "warn", ],
                "svelte/valid-compile": [ "off", ],
                "svelte/html-closing-bracket-new-line": [
                    "warn",
                    {
                        singleline: "never",
                        multiline: "always",
                        selfClosingTag: {
                            singleline: "never",
                            multiline: "always",
                        },
                    },
                ],
                "svelte/sort-attributes": [
                    "warn",
                    {
                        order: [
                            "this",
                            "bind:this",
                            "id",
                            "name",
                            "class",
                            {
                                match: "/^class:/u",
                                sort: "alphabetical",
                            },
                            "slot",
                            {
                                match: "/^--/u",
                                sort: "alphabetical",
                            },
                            [
                                "style",
                                "/^style:/u",
                            ],
                            {
                                match: [
                                    "!/:/u",
                                    "!/^(?:this|id|name|style|class)$/u",
                                    "!/^--/u",
                                ],
                                sort: "alphabetical",
                            },
                            [
                                "/^bind:/u",
                                "!bind:this",
                                "/^on:/u",
                            ],
                            {
                                match: "/^use:/u",
                                sort: "alphabetical",
                            },
                            {
                                match: "/^transition:/u",
                                sort: "alphabetical",
                            },
                            {
                                match: "/^in:/u",
                                sort: "alphabetical",
                            },
                            {
                                match: "/^out:/u",
                                sort: "alphabetical",
                            },
                            {
                                match: "/^animate:/u",
                                sort: "alphabetical",
                            },
                            {
                                match: "/^let:/u",
                                sort: "alphabetical",
                            },
                        ],
                    },
                ],
                "indent": "off",
                "no-trailing-spaces": "off",
                "no-unused-vars": "off",
            },
        },
        {
            files: [
                "**/*.cjs",
                "**/*.js",
            ],
            parser: "espree",
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: "script",
            },
            env: { node: true, },
        },
        {
            files: [
                "**/*.ts",
                "**/*.js",
                "**/*.jsx",
                "**/*.tsx",
            ],
            parser: "@typescript-eslint/parser",
            parserOptions: { project: "./tsconfig.json", },
        },
    ],
    rules: {
        "prettier/prettier": 0,
        "indent": [
            "warn",
            4,
            { SwitchCase: 1, },
        ],
        "comma-spacing": "warn",
        "max-len": [
            "warn",
            {
                code: 180,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreRegExpLiterals: true,
            },
        ],
        "space-infix-ops": [
            "warn",
            { int32Hint: false, },
        ],
        "no-nested-ternary": "warn",
        "no-var": "warn",
        "quotes": [
            "warn",
            "double",
        ],
        "semi": [
            "warn",
            "never",
        ],
        "prefer-destructuring": [
            "warn",
            {
                array: true,
                object: true,
            },
            { enforceForRenamedProperties: false, },
        ],
        "no-trailing-spaces": "warn",
        "no-unused-vars": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "radix": "off",
        "quote-props": [
            "warn",
            "consistent-as-needed",
        ],
        "array-element-newline": [
            "warn",
            "always",
        ],
        "array-bracket-newline": [
            "warn",
            {
                multiline: true,
                minItems: 2,
            },
        ],
        "comma-dangle": [
            "warn",
            {
                arrays: "always",
                objects: "always",
                imports: "always-multiline",
                exports: "always-multiline",
                functions: "always-multiline",
            },
        ],
        "object-curly-newline": [
            "warn",
            {
                ObjectExpression: {
                    multiline: true,
                    minProperties: 2,
                },
                ObjectPattern: {
                    multiline: true,
                    minProperties: 2,
                },
                ImportDeclaration: {
                    multiline: true,
                    minProperties: 2,
                },
                ExportDeclaration: {
                    multiline: true,
                    minProperties: 3,
                },
            },
        ],
        "object-property-newline": [
            "warn",
            { allowAllPropertiesOnSameLine: false, },
        ],
        "no-template-curly-in-string": "off",
        "no-template-curly-in-string-fix/no-template-curly-in-string": "warn",
        "@typescript-eslint/member-delimiter-style": [
            "warn",
            {
                multiline: {
                    delimiter: "none",
                    requireLast: false,
                },
                singleline: {
                    delimiter: "comma",
                    requireLast: false,
                },
            },
        ],
        "one-var": [
            "warn",
            "never",
        ],
        "one-var-declaration-per-line": [
            "warn",
            "initializations",
        ],
        "object-curly-spacing": [
            "warn",
            "always",
        ],
        "array-bracket-spacing": [
            "warn",
            "always",
        ],
        "space-in-parens": [
            "warn",
            "never",
        ],
        "eol-last": [
            "warn",
            "always",
        ],
        "no-multiple-empty-lines": [
            "warn",
            {
                max: 1,
                maxEOF: 0,
                maxBOF: 0,
            },
        ],
        "no-multi-spaces": [
            "warn",
            { ignoreEOLComments: false, },
        ],
        "padding-line-between-statements": [
            "warn",
            {
                blankLine: "always",
                prev: "*",
                next: "return",
            },
            {
                blankLine: "always",
                prev: "*",
                next: "block-like",
            },
            {
                blankLine: "never",
                prev: "*",
                next: "break",
            },
            {
                blankLine: "always",
                prev: "case",
                next: "*",
            },
            {
                blankLine: "always",
                prev: "for",
                next: "*",
            },
            {
                blankLine: "always",
                prev: "*",
                next: "for",
            },
            {
                blankLine: "always",
                prev: "while",
                next: "*",
            },
            {
                blankLine: "always",
                prev: "*",
                next: "while",
            },
            {
                blankLine: "always",
                prev: "*",
                next: "export",
            },
            {
                blankLine: "never",
                prev: "export",
                next: "export",
            },
            {
                blankLine: "always",
                prev: "import",
                next: "*",
            },
            {
                blankLine: "never",
                prev: "import",
                next: "import",
            },
        ],
        "space-before-function-paren": [
            "warn",
            {
                anonymous: "never",
                named: "never",
                asyncArrow: "always",
            },
        ],
        "key-spacing": [
            "warn",
            {
                beforeColon: false,
                afterColon: true,
            },
        ],
        "function-call-argument-newline": [
            "warn",
            "consistent",
        ],
        "arrow-spacing": [
            "warn",
            {
                before: true,
                after: true,
            },
        ],
        "implicit-arrow-linebreak": [
            "warn",
            "beside",
        ],
        "prefer-arrow-callback": "warn",

        "autofix/func-call-spacing": [
            "warn",
            "never",
        ],
        "autofix/no-confusing-arrow": "warn",
        "no-plusplus": "off",
        "autofix/no-plusplus": [
            "warn",
            { allowForLoopAfterthoughts: true, },
        ],
        "modules-newlines/export-declaration-newline": "warn",
        "modules-newlines/import-declaration-newline": "warn",
    },
}
