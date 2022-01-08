<template>
    <div class="home-animation">
        <div class="home-animation__note gray-scale-transition" :class="{ 'home-animation__note--gray': isNoteGray }">
            <EightNote />
        </div>
        <ScriptAnimation ref="animation" :text="scriptText" />
    </div>
</template>

<script>
import { sleep } from '@/utils';
import ScriptAnimation from '@/components/animations/ScriptAnimation.vue';
import EightNote from '@/components/svg/EightNote.vue';

export default {
    name: 'HomeAnimation',
    components: {
        ScriptAnimation,
        EightNote,
    },

    props: {
        'animate:text': {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            scriptText: '',
            isNoteGray: false,
        };
    },

    computed: {
        initialSleep() {
            return this.animateText ? 1000 : 300;
        },
        animateText() {
            return !!this['animate:text'];
        },
    },
    async mounted() {
        this.scriptText = 'nicolas ramirez';
        await sleep(this.initialSleep);
        this.$refs.animation.showText();
        await sleep(this.initialSleep + 200);
        this.isNoteGray = true;
        this.$refs.animation.animateText();
        await sleep(400);

        if (this['animate:text']) {
            await this.changeAnimationText('software engineer', { sleepInterval: 400 });
            await this.changeAnimationText('frontend developer', { sleepInterval: 400 });
            await this.changeAnimationText('composer', { sleepInterval: 400 });
            await this.changeAnimationText('nicolas ramirez', { sleepInterval: 700 });
        }

        this.$emit('done:final', true);
    },

    methods: {
        async changeAnimationText(text, { sleepInterval = 1200, delay = 500 } = {}) {
            // console.log('[app.log] :::: 1. sleepInterval:', sleepInterval);
            await sleep(sleepInterval);
            // console.log('[app.log] :::: hideText:');
            this.$refs.animation.hideText();
            // console.log('[app.log] :::: 2. sleepInterval:', sleepInterval);
            await sleep(sleepInterval);

            // console.log('[app.log] :::: text:');
            this.scriptText = text;

            // console.log('[app.log] :::: 3. sleep:', 100);
            await sleep(100);
            this.$refs.animation.showText();

            // console.log('[app.log] :::: 4. delay:', delay);
            await sleep(delay);
        },
    },
};
</script>
<style lang="scss" scoped>
.home-animation {
    font-family: 'Open Sans Condensed', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__note {
        height: 6em;
        position: relative;
        left: 1em;
        fill: $text;
        stroke: $text;
        z-index: 3;
        &--gray {
            fill: $p-gray;
            stroke: $p-gray;
            transform: scale(0.8, 0.7) translateY(25px) translateX(-10px);
        }
    }
}
</style>
