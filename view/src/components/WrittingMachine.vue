<template>
    <div class="WrittingMachine">
        <div class="WrittingMachine__text0">{{ wmachineText0 }}</div>
        <div class="WrittingMachine__text1">{{ wmachineText1 }}</div>
        <div class="WrittingMachine__text2">{{ wmachineText2 }}</div>
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

        this.$store.dispatch('changeAnimationStatus', true)

        this.writeMachineText(this.texts)
            .catch((error) => {
                console.error('Error in Machine', error)
            })
            .finally(() => {
                this.$store.dispatch('changeAnimationStatus', false)
            })
    }
};
</script>



<style lang="less" scoped>

.WrittingMachine {
    height: 100vh;
    padding: 10px;
    width: 100%;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
        padding: 5px 30px;
        width: 80vw;
        margin: 30px;
        white-space: pre;
        min-width: 200px;
    }

}
.WrittingMachine__text1 {
    text-align: left
}

</style>