import {
    writable,
    type Writable,
} from "svelte/store"

export const channelsStore: Writable<{ [key: string]: BroadcastChannel }> = writable({})
