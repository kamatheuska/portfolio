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
                            <router-link class="button is-dark" to="/about">
                                Tell me more
                            </router-link>
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
        <section class="section home__links">
            <h2 class="title is-3 has-text-centered mb-6">Quick Links</h2>
            <HorizontalLevel>
                <LevelItem v-bind="levelItemLinks[0]" />
            </HorizontalLevel>
            <HorizontalLevel :numberOfItems="3">
                <LevelItem
                    v-for="(link, i) in levelItemLinks.slice(1, 4)"
                    :key="`level-item-link${i}`"
                    v-bind="link"
                />
            </HorizontalLevel>
            <HorizontalLevel :numberOfItems="3">
                <LevelItem
                    v-for="(link, i) in levelItemLinks.slice(4)"
                    :key="`level-item-link${i}`"
                    v-bind="link"
                />
            </HorizontalLevel>
        </section>
        <section class="section home__links">
            <h2 class="title is-3 has-text-centered mb-6">Blogs And Other Art Expressions</h2>
            <HorizontalLevel :numberOfItems="3">
                <LevelItem
                    v-for="(blog, i) in levelItemBlogs.slice(0, 3)"
                    :key="`level-item-blog${i}`"
                    v-bind="blog"
                />
            </HorizontalLevel>
        </section>
    </div>
</template>

<script>
import HorizontalLevel from '@/components/layout/HorizontalLevel.vue';
import LevelItem from '@/components/LevelItem.vue';

export default {
    name: 'Home',

    components: {
        HorizontalLevel,
        LevelItem,
    },

    computed: {
        profileImage() {
            return `${this.$env.PORTFOLIO_BUCKET}/images/profilePic.jpg`;
        },
        levelItemLinks() {
            return [
                {
                    heading: 'React Projects',
                    link: '/projects/react',
                    imageSrc: `${this.$env.PORTFOLIO_BUCKET}/images/react__b&w.png`,
                    isInternalLink: true,
                    hasSmallImage: true,
                    animateOnHover: true,
                },
                {
                    heading: 'Linkedin',
                    link: 'https://www.linkedin.com/in/nikameush/',
                    imageSrc: `${this.$env.PORTFOLIO_BUCKET}/images/linkedin__b&w.png`,
                    hasSmallImage: true,
                    animateOnHover: true,
                },
                {
                    heading: 'Github Profile',
                    link: 'https://www.github.com/kamatheuska',
                    imageSrc: `${this.$env.PORTFOLIO_BUCKET}/images/github__b&w.png`,
                    hasSmallImage: true,
                    animateOnHover: true,
                },
                {
                    heading: 'FreeCodeCamp Profile',
                    link: 'https://www.freecodecamp.org/nikameush',
                    imageSrc: `${this.$env.PORTFOLIO_BUCKET}/images/fcc-logo__b&w.png`,
                    hasSmallImage: true,
                    animateOnHover: true,
                },
                {
                    heading: 'Codepen Profile',
                    link: 'https://codepen.io/nikameush',
                    imageSrc: `${this.$env.PORTFOLIO_BUCKET}/images/codepen-logo.png`,
                    hasSmallImage: true,
                    animateOnHover: true,
                },
                {
                    heading: 'Mail',
                    link: 'mailto:nicolas@nicolasramirezka.com',
                    imageSrc: `${this.$env.PORTFOLIO_BUCKET}/images/mail-icon__b&w.png`,
                    hasSmallImage: true,
                    animateOnHover: true,
                },
                {
                    heading: 'Curriculum Vitae',
                    link: '/docs/CV2021-Nicolas-Ramirez.pdf',
                    imageSrc: `${this.$env.PORTFOLIO_BUCKET}/images/cv__b&w.png`,
                    hasSmallImage: true,
                    animateOnHover: true,
                    downloadName: 'CV2021-Nicolas-Ramirez.pdf',
                },
            ];
        },
        levelItemBlogs() {
            return [
                {
                    heading: 'Blog - Recopilacion',
                    link: 'https://nico9017xxx.wordpress.com',
                    imageSrc: `${this.$env.PORTFOLIO_BUCKET}/images/wordpress-logo__b&w.png`,
                    hasSmallImage: true,
                    animateOnHover: true,
                },
                {
                    heading: 'Blog - Primero',
                    link: 'https://mionicoma.blogspot.com/',
                    imageSrc: `${this.$env.PORTFOLIO_BUCKET}/images/blogger-logo__b&w.png`,
                    hasSmallImage: true,
                    animateOnHover: true,
                },
                {
                    heading: 'Some pieces and improvisations',
                    link: 'https://soundcloud.com/nikameush',
                    imageSrc: `${this.$env.PORTFOLIO_BUCKET}/images/soundcloud-logo__b&w.png`,
                    hasSmallImage: true,
                    animateOnHover: true,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
.home {
    &__links {
        @include desktop {
            padding-right: 15rem;
            padding-left: 15rem;
        }
    }

    /*
    * Bulma Overrides
    */
    .hero.is-medium .hero-body {
        padding-bottom: 6rem;
    }
    .image.is-square img {
        top: -2rem;
        @include tablet {
            top: 0;
        }
    }
}
</style>
