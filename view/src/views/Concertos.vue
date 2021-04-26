<template>
    <div class="concertos container">
        <div class="concertos__concertos">
            <header class="concertos__header">
                <h1 class="title my-3 is-2">GEOMETRIC CONCERTOS</h1>
                <h2 class="subtitle">(scroll down)</h2>
                <button class="button is-black" @click="reloadPage()">Da Capo</button>
            </header>
            <template v-if="!fine">
                <div
                    v-for="(concerto, concertoName, concertoIndex) in this.squareConcertos"
                    :key="`concerto-${concertoIndex}`"
                >
                    <SquareNavGroup>
                        <SquareNav
                            v-for="(square, squareIndex) in concerto.squares"
                            :key="`square-${squareIndex}`"
                            :index="0"
                            :isFirst="squareIndex === 0"
                            :height="square.height"
                            :top="square.top"
                            :left="square.left"
                            :color="square.color"
                            link="/projects"
                        />
                    </SquareNavGroup>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import SquareNavGroup from '@/components/SquareNavGroup.vue';
import SquareNav from '@/components/SquareNav.vue';
import { sleep } from '@/utils';

function Square({ height, top, left, color }) {
    this.height = height;
    this.top = top;
    this.left = left;
    this.color = color;
}
const NUMBER_OF_SQUARES = 10;

const EVEN_SQUARE_RANGES = {
    height: {
        min: 5,
        max: 50,
    },
    top: {
        min: 5,
        max: 20,
    },
    left: {
        min: 30,
        max: 100,
    },
};
const ODD_SQUARE_RANGES = {
    height: {
        min: 5,
        max: 50,
    },
    top: {
        min: 5,
        max: 20,
    },
    left: {
        min: -30,
        max: -100,
    },
};
const BULMA_TABLET_PIXELS_BREAKPOINT = 769;
export default {
    name: 'Home',
    components: {
        SquareNav,
        SquareNavGroup,
    },

    data: () => ({
        squares: [],
        squareConcertos: {},
        fine: false,
        deviceFactor: 1,
    }),

    async created() {
        if (!this.isMobile) {
            this.deviceFactor = 2;
        }

        await sleep(2000);
        this.initSquareConcerto('primo');
        this.executeConcertoPrimo();

        // Secondo
        await sleep(3000);
        this.initSquareConcerto('secondo');
        this.executeConcertoSecondo();

        // Tercero
        await sleep(3000);
        this.initSquareConcerto('tercero');
        this.executeConcertoTercero();

        // Cuarto
        await sleep(3000);
        this.initSquareConcerto('cuarto');
        await this.executeConcertoCuarto();
        await sleep(1000);

        // this.fine = true;
        // const topPixels = this.index * 20 + this.randomInRange(45, 25);
        // const leftPixels = this.isRight ? this.randomInRange(-35, -5) : this.randomInRange(35, 5);
    },

    computed: {
        isMobile() {
            const mql = window.matchMedia(`(max-width: ${BULMA_TABLET_PIXELS_BREAKPOINT}px)`);
            return mql.matches;
        },
    },

    methods: {
        reloadPage() {
            window.location.reload();
        },

        async executeConcertoPrimo() {
            this.changeTopPositions('primo');
            await sleep(400);
            this.changeLeftPositions('primo');
            await sleep(400);
            this.changeLeftPositions('primo');
            await sleep(600);
            this.changeLeftPositions('primo');
            await sleep(800);
            this.changeLeftPositions('primo');
            await sleep(1000);
            this.changeAllPositions('primo');
            await sleep(2000);
            this.changeLeftPositions('primo');
            await sleep(400);
            this.changeAllPositions('primo');
            await sleep(400);
            this.changeLeftPositions('primo');
            await sleep(600);
            this.changeAllPositions('primo');
            await sleep(400);
            this.changeLeftPositions('primo');
            await sleep(400);
            this.changeAllPositions('primo');
            await sleep(600);
            this.changeLeftPositions('primo');
            await sleep(400);
            this.changeAllPositions('primo');
            await sleep(400);
            this.changeLeftPositions('primo');
            await sleep(400);
            this.changeAllPositions('primo');
            await sleep(400);
            this.changeLeftPositions('primo');
            await sleep(400);
            this.changeAllPositions('primo');
        },
        async executeConcertoSecondo() {
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeAllPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeAllPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeTopPositions('secondo');
            await sleep(500);
            this.changeAllPositions('secondo');
        },
        async executeConcertoTercero() {
            this.changeAllPositions('tercero');
            await sleep(400);
            this.changeAllPositions('tercero');
            await sleep(400);
            this.changeAllPositions('tercero');
            await sleep(600);
            this.changeAllPositions('tercero');
            await sleep(800);
            this.changeAllPositions('tercero');
            await sleep(1000);
            this.changeAllPositions('tercero');
            await sleep(2000);
            this.changeAllPositions('tercero');
            await sleep(400);
            this.changeAllPositions('tercero');
            await sleep(400);
            this.changeAllPositions('tercero');
            await sleep(600);
            this.changeAllPositions('tercero');
            await sleep(400);
            this.changeAllPositions('tercero');
            await sleep(400);
            this.changeAllPositions('tercero');
            await sleep(600);
            this.changeAllPositions('tercero');
            await sleep(400);
            this.changeAllPositions('tercero');
            await sleep(400);
            this.changeAllPositions('tercero');
            await sleep(400);
            this.changeAllPositions('tercero');
            await sleep(400);
            this.changeAllPositions('tercero');
            await sleep(400);
            this.changeAllPositions('tercero');
        },
        async executeConcertoCuarto() {
            this.changeAllPositions('cuarto');
            await sleep(400);
            this.changeAllPositions('cuarto');
            await sleep(400);
            this.changeAllPositions('cuarto');
            await sleep(600);
            this.changeAllPositions('cuarto');
            await sleep(800);
            this.changeAllPositions('cuarto');
            await sleep(1000);
            this.changeAllPositions('cuarto');
            await sleep(2000);
            this.changeAllPositions('cuarto');
            await sleep(400);
            this.changeAllPositions('cuarto');
            await sleep(400);
            this.changeAllPositions('cuarto');
            await sleep(600);
            this.changeAllPositions('cuarto');
            await sleep(400);
            this.changeAllPositions('cuarto');
            await sleep(400);
            this.changeAllPositions('cuarto');
            await sleep(600);
            this.changeAllPositions('cuarto');
            await sleep(400);
            this.changeAllPositions('cuarto');
            await sleep(400);
            this.changeAllPositions('cuarto');
            await sleep(400);
            this.changeAllPositions('cuarto');
            await sleep(400);
            this.changeAllPositions('cuarto');
            await sleep(400);
            this.changeAllPositions('cuarto');
        },

        randomInRange({ min, max }, useFactor = false) {
            let normalizer;
            if (useFactor) {
                normalizer =
                    max * this.deviceFactor - min * this.deviceFactor + min * this.deviceFactor;
            } else {
                normalizer = max - min + min;
            }

            return Math.floor(Math.random() * normalizer);
        },

        randomHexColor() {
            const hex = Math.floor(Math.random() * (999999 - 555555) + 555555);
            return `#${hex}`;
        },

        initSquareConcerto(name) {
            this.$set(this.squareConcertos, name, {
                squares: [],
            });
            for (let i = 0; i <= NUMBER_OF_SQUARES; i++) {
                const square = this.generateSquareForIndex(i);
                this.squareConcertos[name].squares.push(square);
            }
        },

        generateSquareForIndex(index) {
            const ranges = this.getSquareRanges(index);
            const { height, top, left, color } = this.generateSquareDetails(ranges);
            return new Square({
                height,
                top,
                left,
                color,
            });
        },

        getSquareRanges(index) {
            const isEven = index % 2 === 0;
            return isEven ? EVEN_SQUARE_RANGES : ODD_SQUARE_RANGES;
        },

        generateSquareDetails(ranges) {
            return {
                height: this.randomInRange(ranges.height, true),
                top: this.randomInRange(ranges.top),
                left: this.randomInRange(ranges.left),
                color: this.randomHexColor(),
            };
        },
        changeTopPositions(concertoName) {
            this.squareConcertos[concertoName].squares.forEach((square, index) => {
                this.changeSquareTopPosition(concertoName, index);
            });
        },
        changeLeftPositions(concertoName) {
            this.squareConcertos[concertoName].squares.forEach((square, index) => {
                this.changeSquareLeftPosition(concertoName, index);
            });
        },
        changeAllPositions(concertoName) {
            this.squareConcertos[concertoName].squares.forEach((square, index) => {
                this.changeSquareLeftPosition(concertoName, index);
                this.changeSquareTopPosition(concertoName, index);
            });
        },

        changeSquareTopPosition(concertoName, squareIndex) {
            const ranges = this.getSquareRanges(squareIndex);
            const { top } = ranges;
            this.squareConcertos[concertoName].squares[squareIndex].top = this.randomInRange(top);
        },
        changeSquareLeftPosition(concertoName, squareIndex) {
            const ranges = this.getSquareRanges(squareIndex);
            const { left } = ranges;
            this.squareConcertos[concertoName].squares[squareIndex].left = this.randomInRange(left);
        },
    },
};
</script>

<style lang="scss" scoped>
.concertos {
    &__concertos {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 1rem;

        > * {
            flex-grow: 1;
            flex-basis: 100%;
        }

        @include tablet {
            > * {
                flex-grow: 0;
                flex-basis: 50%;
            }
            > :first-child {
                flex-basis: 100%;
            }
            .subtitle {
                display: none;
            }
        }
    }
}
</style>
