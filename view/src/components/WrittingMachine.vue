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
            banners: {
                name: 'My\nname\nis\nNicolas\nRamirez',
                slogan: 'and\nI am a\ncoder',
                welcome: 'Welcome\nto my\nsite!'
            },
            writtingMachine: {
                pauses: [],
                currentText: '',
                done: false
            }
        }
    },
    computed: {
        wmachineText() {
            return this.writtingMachine.currentText
        }
    },
    methods: {
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
         * Returns a promise string after a random timeout for each letter in the text provided
         * @param {string} text
         * @param {number} maxTime - top duration of a pause
         * @param {number} minTime - smallest duration of a pause
         */

        writeMachineText (text, maxTime, minTime) {
            const characters = text.split('');
            this.writtingMachine.pauses = this.generatePauses(text.length, maxTime, minTime)
            const pauses = [...this.writtingMachine.pauses]

            return this.recursiveTimer(pauses, characters, 'writtingMachine', 'currentText');
        },

        /**
         * Sets a pause for each letter in an array and returns a resolved promise when is done
         * 
         * @param {string[]} pauses 
         * @param {string[]} characters 
         * @param {string} targetRoot
         * @param {string} targetChild 
         */

        recursiveTimer(pauses, characters, targetRoot, targetChild) {
            if (characters.length === 0) {
                return Promise.resolve();
            }

            return this.delay(pauses[0])
                .then(() => {
                    this[targetRoot][targetChild] += characters[0];
                    pauses.shift();
                    characters.shift()
                    return this.recursiveTimer(pauses, characters, targetRoot, targetChild)
                })

                
        },

        /**
         * Sets the current text to 0
         */
        resetText(dely) {
            return new Promise(resolve => {
                this.writtingMachine.currentText = '';
                resolve();
            })
        },

        delay (t) {
            return new Promise(resolve => setTimeout(resolve, t));
        }

    },
    mounted() {
        this.writeMachineText(this.banners.name, 350, 80)
            .then(() => this.delay(2000))
            .then(() => this.resetText())
            .then(() => this.writeMachineText(this.banners.slogan, 100, 80))
            .then(() => this.delay(1000))
            .then(() => this.resetText())
            .then(() => this.writeMachineText(this.banners.welcome, 100, 80))
            .then(() => this.delay(2000))
            .then(() => this.resetText())
            .then(() => this.writeMachineText('And I\nlove\nMarzialina!', 100, 80))
            .catch((error) => {
                console.error('Error in Machine', error)
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