<template>
    <div class="about p-4">
        <section class="hero is-medium">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <p class="title is-1">About Me</p>
                </div>
            </div>
        </section>
        <div class="columns mb-5">
            <div class="column is-offset-1 is-4">
                <h2 class="title is-3">{{ about.carrer.title }}</h2>
                <p class="block is-size-5 about__paragraph has-text-justified">
                    {{ about.carrer.texts[0] }}
                </p>
                <p class="block is-size-5 about__paragraph has-text-justified">
                    {{ about.carrer.texts[1] }}
                </p>
            </div>
        </div>
        <section class="section is-medium">
            <h2 class="title is-3 has-text-centered mb-6">{{ about.tech.title }}</h2>
            <HorizontalLevel>
                <LevelItem
                    v-for="(tech, i) in about.tech.stack"
                    :key="`tech-stack-${i}`"
                    v-bind="tech"
                />
            </HorizontalLevel>
        </section>
        <div class="columns">
            <div class="column is-offset-6 is-4">
                <h2 class="title is-3">{{ about.passions.title }}</h2>
                <p class="block is-size-5 about__paragraph has-text-justified">
                    {{ about.passions.texts[0] }}
                </p>
            </div>
        </div>
        <div class="about__background"></div>
    </div>
</template>

<script>
import HorizontalLevel from '@/components/layout/HorizontalLevel.vue';
import LevelItem from '@/components/LevelItem.vue';
import aboutContentFactory from '@/content/aboutFactory';

export default {
    name: 'About',

    components: {
        HorizontalLevel,
        LevelItem,
    },

    created() {
        this.about = aboutContentFactory({
            portfolioBucketUrl: this.$env.PORTFOLIO_BUCKET,
        });
    },

    data: () => ({
        about: {},
    }),
};
</script>

<style lang="scss" scoped>
.about {
    .column {
        padding: 1rem;
        background: rgb(255, 255, 255);
        border-radius: 50%;
        background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.5) 20%,
            rgba(255, 255, 255, 0) 80%
        );
        @include tablet {
            font-size: $size-1;
        }
    }

    &__paragraph {
        @include tablet {
            font-size: $size-1;
        }
    }
    &__background {
        top: 65%;
        left: -10%;
        background-image: url('~@/assets/svg/gray-waves.svg');
        background-size: 70vh auto;
        background-repeat: no-repeat;
        height: 100vh;
        width: 100vh;
        position: absolute;
        z-index: -10;

        @include tablet {
            left: -60%;
            top: 20%;
            background-size: 130vw auto;
            width: 130vw;
        }
    }
}
</style>
