<script lang="ts">
    import { formatNumber } from "$lib/formatNumber"
    import {
        onDestroy,
        onMount,
    } from "svelte"

    export let n = 100
    export let startFrom = 0
    export let incrementTime = 200
    export let incrementTimeInterval = 50
    export let formatWith = ""

    export let prefix = ""
    export let suffix = ""

    export let classList = ""

    export let color = ""
    export let fontWeight = ""
    export let fontFamily = ""
    export let fontSize = ""

    let currentNumber = n
    const incrementBy = Math.ceil((n - startFrom) / (incrementTime / incrementTimeInterval))
    let interval: ReturnType<typeof setInterval>

    let opacity = 1
    let counterEl: HTMLSpanElement
    let width: string | number | null | undefined = undefined
    let sizeCheckTime = 1

    $: currentNumberFormatted = `${prefix}${formatNumber(currentNumber, formatWith)}${suffix}`

    onMount(() => {
        if (counterEl) {
            currentNumber = n
            setTimeout(() => {
                const endingWidth = counterEl.getBoundingClientRect().width
                width = `${endingWidth}px`
                opacity = 1
            }, sizeCheckTime)
        }

        setTimeout(() => {
            currentNumber = startFrom

            interval = setInterval(() => {
                currentNumber += incrementBy

                if (currentNumber > n) {
                    currentNumber = n
                    clearInterval(interval)
                }

            }, incrementTimeInterval)
        }, sizeCheckTime + 1)
    })

    onDestroy(() => {
        clearInterval(interval)
    })
</script>

<span
    bind:this={counterEl}
    class={`incrementing-number ${classList}`}
    style:color
    style:width
    style:opacity
    style:font-weight={fontWeight}
    style:font-family={fontFamily}
    style:font-size={fontSize}
>{currentNumberFormatted}</span>

<style lang="scss">
    .incrementing-number {
        display: inline-block;
        white-space: nowrap;
    }
</style>
