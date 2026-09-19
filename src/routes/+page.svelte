<script lang="ts">

</script>

<svelte:head>
    <title>Index</title>
</svelte:head>

{#each Array(9) as _}
    <div class="a4">

    </div>
{/each}

<style lang="scss">
    .a4 {
        width: 297mm;
        height: 210mm;
        outline: 2px dashed #000;
        outline-offset: -2px;
        break-after: page;
        margin: 20px;
    }

    @page {
        size: A4;
        margin: 0;
    }

    @media print {
        :global(html, body) {
            width: 297mm;
            height: 210mm;
        }

        .a4 {
            outline: none;
            margin: 0;
        }
    }
</style>
