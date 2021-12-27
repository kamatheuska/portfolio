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
import ScriptAnimation from '@/components/ScriptAnimation.vue';
import EightNote from '@/components/svg/EightNote.vue';

export default {
    name: 'HomeAnimation',
    components: {
        ScriptAnimation,
        EightNote,
    },

    data() {
        return {
            scriptText: '',
            isNoteGray: false,
        };
    },

    async mounted() {
        this.scriptText = 'nicolasramirez';
        await sleep(1000);
        this.$refs.animation.showText();
        await sleep(1500);
        this.isNoteGray = true;
        this.$refs.animation.animateText();
        await sleep(400);
        this.$emit('done');
        // await sleep(1200);
        // this.$refs.animation.hideText();
        // await sleep(1200);
        // this.scriptText = 'frontend developer';
        // await sleep(100);
        // this.$refs.animation.showText();
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
        fill: #000;
        stroke: #000;
        &--gray {
            fill: #ddd;
            stroke: #ddd;
            transform: scale(0.8, 0.7) translateY(30px) translateX(10px);
        }
    }
}
</style>
