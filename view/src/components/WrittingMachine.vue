<template>
    <div class="WrittingMachine">
        <span>{{ wmachineText }}</span>
    </div>
</template>

<script>

export default {
    name: 'WrittingMachine',
    data() {
        return {
            writtingMachine: {
                pauses: [],
                currentText: '',
                done: false
            }
        }
    },
    props: {
        textToType: Array
    },
    computed: {
        wmachineText() {
            return this.writtingMachine.currentText
        }
    },
    methods: {
        /**
         * Returns a promise string after a random timeout for each letter for the text provided
         * @param {Array} textArray
         *      @param {string} text - text to be written
         *      @param {number} delay - delay after the animation
         * @param {number} maxTime - top duration of a pause
         * @param {number} minTime - smallest duration of a pause
         */

        writeMachineText (textArray, maxTime, minTime) {
            const { text, delay } = textArray.shift();
            const characters = text.split('');
            const pauses = this.generatePauses(text.length, maxTime, minTime)

            return this.writeAnimation(pauses, characters, 'writtingMachine', 'currentText')
                .then(() => this.delay(delay))
                .then(() => this.resetText())
                .then(() => {
                    if (textArray.length !== 0) {
                        return this.writeMachineText(textArray, maxTime, minTime)
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
         * @param {string} targetRoot
         * @param {string} targetChild 
         */

        writeAnimation(pauses, characters, targetRoot, targetChild) {
            if (characters.length === 0) {
                return Promise.resolve()
            }

            return this.delay(pauses[0])
                .then(() => {
                    this[targetRoot][targetChild] += characters[0]
                    pauses.shift()
                    characters.shift()
                    return this.writeAnimation(pauses, characters, targetRoot, targetChild)
                })

                
        },

        resetText() {
            return new Promise(resolve => {
                this.writtingMachine.currentText = '';
                resolve();
            })
        },

        delay (t) {
            return new Promise(resolve => setTimeout(resolve, t));
        }

    },
    created() {
        const textArrays = [...this.textToType]

        this.$store.dispatch('changeAnimationStatus', true)

        this.writeMachineText(textArrays, 150, 80)
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
    font-size: 3.6rem;
    text-align: right;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        white-space: pre;
        min-width: 200px;
    }

}

</style>