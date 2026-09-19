import { CaseTransformer } from "./lib/caseTransformer"
import path from "path"
import fs from "fs"
import { getProjectRoot } from "./lib/getProjectRoot"
import { fileURLToPath } from "url"

const args = process.argv.slice(2)

const [
    createType,
    _createName,
    ...createTypeArgs
] = args

interface CreateTypeOptions {
    filePath: string
    fileName: string
    fileExt: string
}

interface CreateTypes {
    [key: string]: CreateTypeOptions
}

const argsHashMap = Object.fromEntries(createTypeArgs.map((arg) => [
    arg,
    true,
]))

const createTypes = {
    page: {
        filePath: "src/routes",
        fileName: "%kebab-case%/+page",
        fileExt: "svelte",
    },
    component: {
        filePath: "src/components",
        fileName: "%PascalCase%",
        fileExt: "svelte",
    },
    store: {
        filePath: "src/stores",
        fileName: "%camelCase%",
        fileExt: "ts",
    },
} as const satisfies CreateTypes

if (!(createType in createTypes)) {
    console.error(`Invalid create type: ${createType}`)
    process.exit(1)
}

let createName: CaseTransformer

try {
    createName = new CaseTransformer(_createName)
} catch (error) {
    console.error(`Invalid create name: ${_createName}`)
    process.exit(1)
}

const templateLiterals = {
    "%kebab-case%": ()=>(createName.convertToCase("kebab")),
    "%snake_case%": ()=>(createName.convertToCase("snake")),
    "%PascalCase%": ()=>(createName.convertToCase("pascal")),
    "%camelCase%": ()=>(createName.convertToCase("camel")),
} as const

const currentScriptPath = path.dirname(fileURLToPath(import.meta.url))
const templatePath = path.join(currentScriptPath, "templates", `${createType}.txt`)

if (!fs.existsSync(templatePath)) {
    console.error(`Template not found: ${templatePath}`)
    process.exit(1)
}

const template = fs.readFileSync(templatePath, "utf-8")

const replaceTemplateString = (template: string)=>{
    const templateLiteralsFunctions = Object.fromEntries(
        Object.entries(templateLiterals).map(([
            key,
            value,
        ]) => [
            key,
            value(),
        ]),
    )

    return Object.entries(templateLiteralsFunctions).reduce((acc, [
        key,
        value,
    ])=>{
        return acc.replace(new RegExp(key, "g"), value)
    }, template)
}

const templateReplaced = replaceTemplateString(template)

const projectRoot = await getProjectRoot()

const createPath = path.join(
    projectRoot,
    createTypes[createType].filePath,
    `${replaceTemplateString(createTypes[createType].fileName)}.${createTypes[createType].fileExt}`,
)

const createDir = path.dirname(createPath)

if (!fs.existsSync(createDir)) {
    fs.mkdirSync(createDir, { recursive: true, })
}

if (fs.existsSync(createPath) && !argsHashMap["-f"]) {
    console.error(`File already exists, rename, delete or add a -f flag to force rewrite: ${createPath}`)
}

fs.writeFileSync(createPath, templateReplaced, { encoding: "utf-8", })

console.log(`Created ${createType}: ${createPath}`)
