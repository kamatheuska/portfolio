<template>
    <div class="home container">
        <Navbar />
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
                                <img
                                    class="home__image is-rounded"
                                    src="@/assets/images/heroImageSquare.jpg"
                                />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
    name: 'Home',
    components: {
        Navbar,
    },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/abstracts/mixins';
.image.is-square img {
    top: -2rem;
    @include tablet {
        top: 0;
    }
}
</style>
