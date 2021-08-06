<template>
    <div class="home container">
        <section class="hero is-medium is-white">
            <div class="hero-body">
                <div class="columns">
                    <div
                        class="column is-6 h-100 is-flex is-flex-direction-column is-justify-content-center"
                    >
                        <div>
                            <h1 class="title is-1">Nicolas Ramirez</h1>
                            <p class="subtitle">
                                Let's tell together a great story. The story of your project and how
                                we made it a reality.
                            </p>
                            <button class="button is-dark">Tell me more</button>
                        </div>
                    </div>
                    <div class="column is-6">
                        <div class="p-5">
                            <figure class="image is-square">
                                <img class="home__image is-rounded" :src="profileImage" />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { PORTFOLIO_BUCKET } from '@/constants';

export default {
    name: 'Home',

    computed: {
        profileImage() {
            return `${PORTFOLIO_BUCKET}/images/profilePic.jpg`;
        },
    },
};
</script>

<style lang="scss" scoped>
.image.is-square img {
    top: -2rem;
    @include tablet {
        top: 0;
    }
}
</style>
