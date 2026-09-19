<script lang="ts">

</script>

<svelte:head>
    <title>Index</title>
</svelte:head>

<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
{#each Array(9) as _}
    <div class="a4 ff f-col">
        <div class="title-line ffb">
            <div class="display month">АВГУСТ</div>
            <div class="display year">2026</div>
        </div>
        <div class="calendar">

        </div>
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

        .title-line {
            font-size: 60px;
            font-weight: 700;
            font-size: 60px;
            padding-inline: 235px;
            padding-block: 33px 21px;
            flex-shrink: 0;

            .display {
                transform: scaleX(85%);

                &.month {
                    transform-origin: left center;
                }

                &.year {
                    transform-origin: right center;
                }
            }
        }

        .calendar {
            height: 100%;
            width: 100%;
            padding: 33px;
            padding-top: 0;
        }
    }

    @page {
        size: A4 landscape;
        margin: 0;
    }

    @media print {
        :global(html, body) {
            width: 100vw;
            height: 100vh;
        }

        .a4 {
            outline: none;
            margin: 0;
        }
    }
</style>
