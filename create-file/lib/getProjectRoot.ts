import { fileURLToPath } from "url"
import findUpSync from "find-up"
import path from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const getProjectRoot = async (): Promise<string> => {
    const packageJsonPath = await findUpSync("package.json", { cwd: __dirname, })

    if (!packageJsonPath) {
        throw new Error("Could not find project root")
    }

    return path.dirname(packageJsonPath)
}
