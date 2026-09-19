/* eslint-disable @typescript-eslint/no-var-requires */

import {
    BrowserWindow,
    contextBridge,
    ipcRenderer,
} from "electron"
import type { WindowOptions } from "./main"

const electronAPI = {
    windowAction: async (action: unknown[]) => {
        const result = await ipcRenderer.invoke("windowAction", action)

        return result
    },
    selectFolder: async (action: unknown[]) => {
        const result = await ipcRenderer.invoke("selectFolder", action)

        return result
    },

    on: (channel: string, func: (...args: unknown[]) => void) => {
        const validChannels = [ "example", ]

        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => func(...args))
        }
    },

    removeListener: (channel: string, func: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void) => {
        ipcRenderer.removeListener(channel, func)
    },

    store: {
        get(key: string): unknown {
            return ipcRenderer.sendSync("electron-store-get", key)
        },
        set(property: string, val: unknown) {
            ipcRenderer.send("electron-store-set", property, val)
        },
        // Other method you want to add like has(), reset(), etc.
    },

    openNewWindow: async (options: WindowOptions = {}) => {
        const result = await ipcRenderer.invoke("openNewWindow", options) as number

        return result
    },

    getWindowIds: async () => {
        const result = await ipcRenderer.invoke("getWindowIds") as string[]

        return result
    },

    closeWindowById: async (windowId: number) => {
        const result = await ipcRenderer.invoke("closeWindowById", windowId)

        return result
    },

    getScreenSize: async () => {
        const result = await ipcRenderer.invoke("getScreenSize") as Electron.Size

        return result
    },
}

contextBridge.exposeInMainWorld("electronAPI", electronAPI)

type IElectronAPI = typeof electronAPI

export type { IElectronAPI }
