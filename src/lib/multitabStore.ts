import { channelsStore } from "$stores/broadcastChannels"
import {
    get,
    writable,
    type Writable as SvelteWritable,
} from "svelte/store"

/**
 * Creates a multitab store with broadcast synchronization.
 *
 * @param initialValue The initial value of your store.
 * @param channelName The name for the BroadcastChannel.
 * @param applyRemoteUpdate A function to apply remote message updates. Receives
 *                          the current store value and the message, and should
 *                          return an updated store value.
 * @param selfSend If true, the sender applies the update locally as well.
 * @returns A Svelte writable store extended with a `send` method to broadcast changes.
 */
export function createMultiTabStore<T, M>(
    initialValue: T, 
    channelName: string,
    applyRemoteUpdate: (current: T, message: M) => T,
    selfSend = true,
) {
    // Retrieve current channels from the store
    const channels = get(channelsStore)

    if (channels[channelName]) {
        channels[channelName].close()
        console.log(`Closed existing channel ${channelName}`)
        channelsStore.update((chs) => {
            delete chs[channelName]

            return chs
        })
    }

    const store: SvelteWritable<T> = writable(initialValue)
    const channel = new BroadcastChannel(channelName)
    channelsStore.update((chs) => ({
        ...chs,
        [channelName]: channel,
    }))
    // console.log(`Opened channel ${channelName}`)

    // Listen for messages from other tabs
    channel.onmessage = (ev) => {
        store.update((current) => applyRemoteUpdate(current, ev.data as M))
    }

    // Extend the store with a method to broadcast updates
    return {
        subscribe: store.subscribe,
        update: store.update,
        set: store.set,
        send: (message: M) => {
            // Send update to other tabs
            channel.postMessage(message)

            if (selfSend) {
                // Also apply update locally
                store.update((current) => applyRemoteUpdate(current, message))
            }
        },
        close: () => {
            channel.close()
            channelsStore.update((chs) => {
                delete chs[channelName]

                return chs
            })
            // console.log(`Closed channel ${channelName}`)
        },
    }
}
