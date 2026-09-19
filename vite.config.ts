import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import fs from "fs"

type PathsType = {
    [key: string]: string[]
}

const tsConfigFilePath = ".svelte-kit/tsconfig.json"
const tsConfigExists = fs.existsSync(tsConfigFilePath)

let alias = {}

if (tsConfigExists) {
    const tsConfigFile = fs.readFileSync(tsConfigFilePath, "utf-8")
    const tsconfig = JSON.parse(tsConfigFile)

    const { paths, } = tsconfig.compilerOptions as { paths: PathsType }
    alias = Object.fromEntries(
        Object.entries(paths)
            .filter(([ key, ]) => !key.includes("*"))
            .map(([
                key,
                [ path, ],
            ]) => [
                key,
                path.replace(/^\.\./, ""),
            ])
    )
}

export default defineConfig({
    plugins: [ sveltekit(), ],
    css: {
        preprocessorOptions: {
            sass: {
                additionalData: `
                    @use "src/styles/vars"
                `,
            },
        },
    },
    resolve: { alias, },
})
