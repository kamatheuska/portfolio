<template>
    <div id="drum-machine" class="DrumMachine">
        <div id="display" class="DrumMachine__display">
            <div
                v-for="(drumPad) in drumPads" 
                :key="`drumPad#${drumPad.keyCode}`"
                class="drum-pad DrumMachine__drumPad shadow"
            >
                {{ drumPad.keyTrigger }}
                <audio
                    :ref="`pad${drumPad.keyTrigger}`"
                    :id="drumPad.keyTrigger"
                    :src="drumPad.url"
                    class="clip"
                ></audio>
                
            </div>
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
                    url: '../assets/sounds/drumpad1.mp3'
                },
                {
                    keyCode: 87,
                    keyTrigger: 'W',
                    id: 'Heater-2',
                    url: '../assets/sounds/drumpad2.mp3'
                },
                {
                    keyCode: 69,
                    keyTrigger: 'E',
                    id: 'Heater-3',
                    url: '../assets/sounds/drumpad3.mp3'
                },
                {
                    keyCode: 65,
                    keyTrigger: 'A',
                    id: 'Heater-4',
                    url: '../assets/sounds/drumpad4_1.mp3'
                },
                {
                    keyCode: 83,
                    keyTrigger: 'S',
                    id: 'Clap',
                    url: '../assets/sounds/drumpad5.mp3'
                },
                {
                    keyCode: 68,
                    keyTrigger: 'D',
                    id: 'Open-HH',
                    url: '../assets/sounds/drumpad6.mp3'
                },
                {
                    keyCode: 90,
                    keyTrigger: 'Z',
                    id: 'Kick-n\'-Hat',
                    url: '../assets/sounds/drumpad7.mp3'
                },
                {
                    keyCode: 88,
                    keyTrigger: 'X',
                    id: 'Kick',
                    url: '../assets/sounds/drumpad8.mp3'
                },
                {
                    keyCode: 67,
                    keyTrigger: 'C',
                    id: 'Closed-HH',
                    url: '../assets/sounds/drumpad9.mp3'
                },
            ]
        }
    },
    mounted () {
        const self = this;
        this.drumPads.forEach((pad) => {
            document.addEventListener('keydown', (e) => {
                if (e.keyCode === pad.keyCode) {
                    self.$refs[`pad${pad.keyTrigger}`][0].play()
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
        background-color: @portfolio-sand;
        border-radius: 10px;

    }
}
</style>