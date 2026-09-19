import {
    app,
    BrowserWindow,
    ipcMain,
    dialog,
    screen,
} from "electron"
import { join } from "path"
import Store from "electron-store"
import serve from "electron-serve"
import {
    mkdir,
    writeFile,
} from "fs/promises"
import isNegative from "./lib/isNegative"

const store = new Store()
const __dirname = app.getAppPath()
const serveDir = serve({ directory: "svelte-build", })

// Registry to keep track of open windows
const windows: Map<number, BrowserWindow> = new Map()

export interface WindowOptions {
    pathSegment?: string
    windowWidth?: number
    windowHeight?: number
    devZoomFactor?: number
    devToolsPosition?: "right" | "bottom"
    x?: number
    y?: number
    transparent?: boolean
    frame?: boolean
    devTools?: boolean
    alwaysOnTop?: boolean
    clickThrough?: boolean
    doNotShowInTaskbar?: boolean
}

// Function to create a new BrowserWindow
function createWindow({
    pathSegment = "",
    windowWidth = 1920,
    windowHeight = 1080,
    devZoomFactor = .8,
    devToolsPosition = "bottom", // right | bottom
    x = undefined,
    y = undefined,
    transparent = false,
    frame = true,
    devTools = true,
    alwaysOnTop = false,
    clickThrough = false,
    doNotShowInTaskbar = false,
}: WindowOptions = {}) {
    const config = {
        width: Math.round(windowWidth),
        height: Math.round(windowHeight),
        icon: join(
            __dirname,
            "static",
            "favicon.ico",
        ),
        show: false,
        webPreferences: { preload: join(__dirname, "preload.js"), },
        transparent,
        frame,
        alwaysOnTop,
    }

    const devToolsVerticalAdd = { // On the right
        width: 532 + +frame * 39,
        height: 0 + (+frame * 39),
    }

    const devToolsHorizontalAdd = { // On the bottom
        width: 0 + (+frame * 16),
        height: 323 + (+frame * 16),
    }

    const devToolsAdd = devToolsPosition === "right" ? devToolsVerticalAdd : devToolsHorizontalAdd

    const devWidth = windowWidth * devZoomFactor + (devTools ? devToolsAdd.width : +frame * 16)
    const devHeight = windowHeight * devZoomFactor + (devTools ? devToolsAdd.height : +frame * 39)

    const screenSize = screen.getPrimaryDisplay().workAreaSize

    const devPosX = x !== undefined && isNegative(x)
        ? screenSize.width + x - devWidth
        : x ?? (screenSize.width / 2 - devWidth) / 2 + screenSize.width / 2

    const devPosY = y !== undefined && isNegative(y)
        ? screenSize.height + y - devHeight
        : y ?? (screenSize.height - devHeight) / 2

    const devConfig = {
        x: Math.round(devPosX),
        y: Math.round(devPosY),
        width: Math.round(devWidth),
        height: Math.round(devHeight),
        webPreferences: { preload: join(__dirname, "preload.js"), },
    }

    const posX = x !== undefined && isNegative(x)
        ? screenSize.width + x - windowWidth
        : x ?? (screenSize.width / 2 - devWidth) / 2 + screenSize.width / 2

    const posY = y !== undefined && isNegative(y)
        ? screenSize.height + y - windowHeight
        : y ?? (screenSize.height - devHeight) / 2

    let prodSize = {}

    if (x !== undefined && y !== undefined) {
        prodSize = {
            x: Math.round(posX),
            y: Math.round(posY),
        }
    }

    const prodConfig = {
        fullscreen: false,
        ...prodSize,
    }

    if (app.isPackaged) {
        Object.assign(config, prodConfig)
    } else {
        Object.assign(config, devConfig)
    }

    if (!app.isPackaged) {
        app.commandLine.appendSwitch("unsafely-disable-devtools-self-xss-warnings")
    }

    const win = new BrowserWindow(config)
    console.log(`Created new window (${win.id}) with pathSegment: "${pathSegment}"`)

    if (clickThrough) {
        win.setIgnoreMouseEvents(true, { forward: true, })
    }

    if (doNotShowInTaskbar) {
        win.setSkipTaskbar(true)
    }

    // Add the window to the registry
    windows.set(win.id, win)

    win.setMenuBarVisibility(false)

    // Determine the correct URL based on the mode and pathSegment
    let urlToLoad

    if (app.isPackaged) {
        // In production, use app://- protocol for routing
        urlToLoad = `app://-/${pathSegment ? `${pathSegment}.html` : ""}`
    } else {
        // In development, append the pathSegment to the local server URL
        urlToLoad = `http://localhost:5173${pathSegment}`
    }

    // Load the determined URL
    if (urlToLoad) {
        win.loadURL(urlToLoad).catch((err) => {
            console.error(`Failed to load URL: ${urlToLoad}`, err)
        })
    } else if (app.isPackaged) {
        serveDir(win)
    } else {
        win.loadURL("http://localhost:5173").catch((err) => {
            console.error("Failed to load local server URL.", err)
        })
    }

    win.once("ready-to-show", () => {
        win.show()
        win.flashFrame(false)

        if (!app.isPackaged) {
            win.webContents.enableDeviceEmulation({
                screenPosition: "desktop",
                screenSize: {
                    width: windowWidth,
                    height: windowHeight,
                },
                viewSize: {
                    width: windowWidth,
                    height: windowHeight,
                },
                scale: devZoomFactor,
                viewPosition: {
                    x: 0,
                    y: 0,
                },
                deviceScaleFactor: 1,
            })
        }
    })

    // Optional: Open DevTools automatically for new windows in development
    if (!app.isPackaged) {
        win.webContents.on("did-finish-load", () => {
            if (devTools) {
                win.webContents.openDevTools({ mode: devToolsPosition, })
            }
        })
    }

    win.on("closed", () => {
        console.log(`Window closed (${win.id}):`, pathSegment)
        // Remove the window from the registry
        windows.delete(win.id)
        // Perform any necessary cleanup here
    })

    return win
}

// Register IPC handlers **once** when the app is ready
function registerIpcHandlers() {
    // Handle window actions like minimize, maximize, etc.
    ipcMain.handle("windowAction", (event, action) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        if (!win) return

        switch (action) {
            case "minimize":
                win.minimize()
                break

            case "maximize":
                win.maximize()
                break

            case "unmaximize":
                win.unmaximize()
                break

            case "close":
                win.close()
                break

            case "isMaximized":
                return win.isMaximized()

            default:
                return undefined
        }
    })

    // Handle folder selection
    ipcMain.handle("selectFolder", (event) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        if (!win) return
        const folder = dialog.showOpenDialogSync(win, { properties: [ "openDirectory", ], })

        return folder
    })

    // Handle Electron Store get
    ipcMain.on("electron-store-get", (event, val) => {
        event.returnValue = store.get(val)
    })

    // Handle Electron Store set
    ipcMain.on("electron-store-set", (
        event, key, val,
    ) => {
        store.set(key, val)
    })

    // Handle incoming messages and broadcast to all windows
    ipcMain.on("sendMessage", (event, message) => {
        for (const [
            // windowId
            ,
            win,
        ] of windows) {
            if (win.webContents !== event.sender) {
                win.webContents.send("message", message)
            }
        }
    })

    // Handle saving file
    ipcMain.handle("saveFile", async (
        event, path, fileName, data,
    ) => {
        const filePath = join(path, fileName)

        try {
            await mkdir(path, { recursive: true, })
            await writeFile(filePath, data)

            return { success: true, }
        } catch (error: unknown) {
            console.error("Failed to save file:", error)

            return {
                success: false,
                message: (error as Error)?.message,
            }
        }
    })

    // Handle opening new windows
    ipcMain.handle("openNewWindow", (event, options: WindowOptions) => {
        console.log(`IPC Handler: openNewWindow called with pathSegment: ${options.pathSegment ?? "/"}`)

        const newWin = createWindow(options)

        return newWin.id
    })

    // Handle closing windows by ID
    ipcMain.handle("closeWindowById", (event, windowId) => {
        console.log(`IPC Handler: closeSpecificWindow called with windowId: ${windowId}`)
        const win = windows.get(windowId)

        if (win) {
            win.close()

            return { success: true, }
        } else {
            return {
                success: false,
                message: "Window ID not found.",
            }
        }
    })

    // Handle getting all window IDs
    ipcMain.handle("getWindowIds", () => {
        return Array.from(windows.keys())
    })

    ipcMain.handle("getScreenSize", () => {
        return screen.getPrimaryDisplay().workAreaSize
    })
}

app.whenReady().then(() => {
    createWindow()

    // Register IPC handlers after app is ready
    registerIpcHandlers()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// Quit when all windows are closed, except on macOS
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})
