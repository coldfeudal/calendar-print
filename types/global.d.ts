/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import type { IElectronAPI } from "../electron/preload"

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}

interface ImportMeta {
    hot: {
        dispose(callback: () => void): void;
    }
}
