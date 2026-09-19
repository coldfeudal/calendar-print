<script lang="ts">
    const dow = [
        "ПН",
        "ВТ",
        "СР",
        "ЧТ",
        "ПТ",
        "СБ",
        "ВС",
    ]

    const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ]

    let year: number | null = (new Date).getFullYear()

    const CELLS = 42

    // 42 ячеек на месяц: номер дня или null для пустых
    function monthCells(year: number, month: number): (number | null)[] {
        const offset = (new Date(year, month, 1).getDay() + 6) % 7 // ПН = 0
        const daysCount = new Date(year, month + 1, 0).getDate()

        return Array.from({ length: CELLS, }, (_, i) => {
            const day = i - offset + 1

            return day >= 1 && day <= daysCount ? day : null
        })
    }

    $: validYear = year !== null && Number.isInteger(year) && year >= 1000 && year <= 9999
    $: calendar = validYear ? months.map((_, m) => monthCells(year!, m)) : []
</script>

<svelte:head>
    <title>Календарь</title>
</svelte:head>

<label class="year-input">
    Год
    <input
        max="9999"
        min="1000"
        type="number"
        bind:value={year}
    />
</label>

{#each calendar as cells, m}
    {@const month = months[m]}
    <div class="a4 ff f-col">
        <div class="title-line ffb">
            <div class="display month">{month}</div>
            <div class="display year">{year}</div>
        </div>
        <div class="calendar">
            <div class="calendar-body ff f-col">
                <div class="day-names ff">
                    {#each dow as day}
                        <div class="day-name">
                            <div class="name-text">{day}</div>
                        </div>
                    {/each}
                </div>
                <div class="days">
                    {#each cells as day}
                        <div class="day">
                            {#if day !== null}
                                <div class="day-number">{day}</div>
                            {/if}
                            <div class="day-lines ffb f-col">
                                <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
                                {#each Array(6) as _}
                                    <div class="day-line" />
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
{/each}

<style lang="scss">

    $border: thin solid black;
    @mixin border {
        border-bottom: $border;
        border-right: $border;
    }

    @mixin thin-title {
        transform: scaleX(85%);
        font-weight: 700;
    }

    .year-input {
        display: block;
        margin: 20px 20px 0;

        input {
            width: 6em;
        }
    }

    .a4 {
        width: 297mm;
        height: 210mm;
        outline: 2px dashed #000;
        outline-offset: -2px;
        break-after: page;
        margin: 20px;

        .title-line {
            font-size: 60px;
            font-size: 60px;
            padding-inline: 235px;
            padding-block: 33px 21px;
            flex-shrink: 0;

            .display {
                @include thin-title;

                &.month {
                    transform-origin: left center;
                    text-transform: uppercase;
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

            &-body {
                height: 100%;
                width: 100%;
                border-top: $border;
                border-left: $border;
            }

            .day-names {
                font-size: 17px;

                .day-name {
                    flex: 1;
                    text-align: center;
                    background-color: #dbdbdb;
                    padding-block: 2px 1px;
                    @include border;

                    .name-text {
                        @include thin-title;
                    }
                }
            }

            .days {
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: repeat(7, 1fr);

                .day {
                    @include border;
                    position: relative;

                    .day-number {
                        @include thin-title;
                        transform-origin: left center;
                        font-size: 16px;
                        position: absolute;
                        left: 4px;
                        top: 1px;
                    }

                    .day-lines {
                        width: 100%;
                        height: 100%;
                        gap: 10px;
                        padding-inline: 3px;
                        padding-block: 21px 13px;

                        .day-line {
                            height: 1px;
                            width: 100%;
                            background-color: #998f86;
                        }
                    }
                }
            }
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
            print-color-adjust: exact;
        }

        .a4 {
            outline: none;
            margin: 0;
        }

        .year-input {
            display: none;
        }
    }
</style>
