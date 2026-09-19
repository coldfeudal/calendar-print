<script lang="ts">
    import copyToClipboard from "$lib/copyToClipboard"

    let value = ""
    const copy = () => {
        copyToClipboard(value.trim().replace(/\s+/gm, " "))
        value = ""
    }
</script>

<input
    type="text"
    bind:value
    on:change={copy}
    on:input={copy}
>

<style lang="scss">
    input {
        position: absolute;
        left: 0;
        top: 0;
    }
</style>
