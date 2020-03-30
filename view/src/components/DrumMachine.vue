<template>
    <div id="drum-machine" class="DrumMachine">
        <div id="display" class="DrumMachine__display">
            <button
                v-for="(drumPad) in drumPads" 
                :key="`drumPad#${drumPad.keyCode}`"
                class="drum-pad DrumMachine__drumPad shadow"
                :id="drumPad.id"
                :ref="`pad${drumPad.keyTrigger}`"
                @click="playAndFocus(drumPad.keyTrigger)"
            >
                {{ drumPad.keyTrigger }}
                <audio
                    :ref="`audio__${drumPad.keyTrigger}`"
                    :id="drumPad.keyTrigger"
                    :src="drumPad.url"
                    class="clip"
                >
                </audio>
                
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            drumPads: [
                {               
                    keyCode: 81,
                    keyTrigger: 'Q',
                    id: 'Heater-1',
                    url: '/sounds/drumpad1.mp3'
                },
                {
                    keyCode: 87,
                    keyTrigger: 'W',
                    id: 'Heater-2',
                    url: '/sounds/drumpad2.mp3'
                },
                {
                    keyCode: 69,
                    keyTrigger: 'E',
                    id: 'Heater-3',
                    url: '/sounds/drumpad3.mp3'
                },
                {
                    keyCode: 65,
                    keyTrigger: 'A',
                    id: 'Heater-4',
                    url: '/sounds/drumpad4.mp3'
                },
                {
                    keyCode: 83,
                    keyTrigger: 'S',
                    id: 'Clap',
                    url: '/sounds/drumpad5.mp3'
                },
                {
                    keyCode: 68,
                    keyTrigger: 'D',
                    id: 'Open-HH',
                    url: '/sounds/drumpad6.mp3'
                },
                {
                    keyCode: 90,
                    keyTrigger: 'Z',
                    id: 'Kick-n\'-Hat',
                    url: '/sounds/drumpad7.mp3'
                },
                {
                    keyCode: 88,
                    keyTrigger: 'X',
                    id: 'Kick',
                    url: '/sounds/drumpad8.mp3'
                },
                {
                    keyCode: 67,
                    keyTrigger: 'C',
                    id: 'Closed-HH',
                    url: '/sounds/drumpad9.mp3'
                },
            ]
        }
    },
    methods: {
        playAndFocus (keyTrigger) {
            this.$refs[`audio__${keyTrigger}`][0].play()
            this.$refs[`pad${keyTrigger}`][0].focus()

            setTimeout(() => {
                document.activeElement.blur()
            }, 1000);

        }
    },
    mounted () {
        const self = this;
        this.drumPads.forEach((pad) => {
            document.addEventListener('keydown', (e) => {
                if (e.keyCode === pad.keyCode) {
                    this.playAndFocus(pad.keyTrigger)
                }
            })
        })
    }
}
</script>
<style lang="less" scoped>
.DrumMachine {
    &__display {
        display: grid;
        grid-template-columns: repeat(3, 5rem);
        grid-template-rows: repeat(3, 5rem);
        width: 15rem;
        grid-gap: 1rem;
        color: @portfolio-white;
    }

    &__drumPad {
        background-color: @portfolio-blue;
        border-radius: 10px;
        color: @portfolio-white;
        &:focus {
            background: red;
            border: none;
            outline: none;
        }
    }
}
</style>