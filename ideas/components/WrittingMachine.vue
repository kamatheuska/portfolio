<template>
    <div class="WrittingMachine__wrapper">
        <div class="WrittingMachine">
            <div class="WrittingMachine__text WrittingMachine__text--0">{{ wmachineText0 }}</div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'WrittingMachine',
    data() {
        return {
            texts: [],
            writtingMachine: {
                pauses: [],
                typedTexts: {
                    0: '',
                    1: '',
                    2: ''
                },
                done: false
            }
        }
    },
    props: {
        textToType: Array
    },
    computed: {
        wmachineText0() {
            return this.writtingMachine.typedTexts['0']
        },
        wmachineText1() {
            return this.writtingMachine.typedTexts['1']
        },
        wmachineText2() {
            return this.writtingMachine.typedTexts['2']
        }
    },
    methods: {
        /**
         * Returns a promise string after a random timeout for each letter for the text provided
         * @param {Array} textArray
         */

        writeMachineText (textArray, index = 0) {
            const { text, delay, maxTime, minTime, reset, callback } = textArray.shift();
            const characters = text.split('');
            const pauses = this.generatePauses(text.length, maxTime, minTime)

            return this.writeAnimation(pauses, characters, index)
                .then(() => {
                    if (callback) {
                        callback()
                    }
                    return Promise.resolve()
                })
                .then(() => !!delay ? this.delay(delay) : Promise.resolve())
                .then(() => reset ? this.resetText(index) : Promise.resolve())
                .then(() => {
                    if (textArray.length !== 0) {
                        return this.writeMachineText(textArray, index + 1)
                    }
                })
        },

        /** 
         * Generates an array of numbers that represent milisecond values
         * 
         * @param {number} phraseLength - the length of the phrase
         * @param {number} maxTime - top duration of a pause
         * @param {number} minTime - smallest duration of a pause
         */
        generatePauses(phraseLength, maxTime = 1000, minTime = 100) {
            if (minTime < 80) {
                throw new Error('Generate Pauses: minTime should be at least 100');
                return;
            }
            let pauses = [];
            for (let i = 0; i < phraseLength; i++) {
                const rand = Math.random() * maxTime
                let pause = Math.floor(rand) - (Math.floor(rand) % 10)
                if (pause < minTime) {
                    pause += minTime
                }

                pauses.push(pause)
            }
            return pauses;
        },

        /**
         * Sets a pause for each letter in an array and returns a resolved promise when is done
         * 
         * @param {string[]} pauses 
         * @param {string[]} characters
         */

        writeAnimation(pauses, characters, index) {
            if (characters.length === 0) {
                return Promise.resolve()
            }

            return this.delay(pauses[0])
                .then(() => {
                    this.writtingMachine.typedTexts['' + index] += characters[0]
                    pauses.shift()
                    characters.shift()
                    return this.writeAnimation(pauses, characters, index)
                })

                
        },

        resetText(index) {
            return new Promise(resolve => {
                this.writtingMachine.typedTexts['' + index] = '';
                resolve();
            })
        },

        delay (t) {
            return new Promise(resolve => setTimeout(resolve, t));
        }

    },
    created() {
        this.texts = [...this.textToType]

        this.writeMachineText(this.texts)
            .catch((error) => {
                console.error('Error in Machine', error)
            })
            .finally(() => {
                console.info('Animation finished')
            })
    }
};
</script>



<style lang="scss" scoped>
@import '~@/assets/styles/abstracts/color';

.WrittingMachine {
    padding-top: 1rem;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__text {
        padding: 1rem;
        white-space: pre;
        min-width: 200px;
        &--1 {
            text-align: left;
            color: $portfolio-blue;
        }
    }
}
</style>