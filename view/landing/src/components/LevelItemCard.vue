<template>
    <div class="level-item-card has-text-centered">
        <template v-if="link">
            <router-link :to="route" class="link" :target="isInternalLink ? '' : '_blank'" :download="downloadName">
                <p class="heading">
                    {{ heading }}
                </p>
                <img
                    v-if="imageSrc"
                    class="level-item-card__image"
                    :class="{ 'level-item-card__image--is-small': hasSmallImage }"
                    :src="imageSrc"
                />
            </router-link>
        </template>
        <div v-else>
            <template>
                <p class="heading">
                    {{ heading }}
                </p>

                <img
                    v-if="imageSrc"
                    class="level-item-card__image"
                    :class="{ 'level-item-card__image--is-small': hasSmallImage }"
                    :src="imageSrc"
                />
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LevelItem',

    props: {
        imageSrc: String,
        heading: {
            type: String,
            required: true,
        },
        link: String,
        isInternalLink: {
            type: Boolean,
            default: false,
        },
        downloadName: {
            type: String,
            default: null,
        },
        hasSmallImage: {
            type: Boolean,
            default: false,
        },
        animateOnHover: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        route() {
            const route = { path: this.link };

            if (!this.isInternalLink) {
                route.beforeEnter = this.navigateBeforeEnter;
            }

            return route;
        },
    },

    methods: {
        navigateBeforeEnter() {
            window.location.href = this.link;
        },
    },
};
</script>

<style lang="scss" scoped>
.level-item-card {
    &__image {
        height: 100px;
        &--is-small {
            height: 60px;
        }
    }

    a {
        color: black;
    }
}
</style>
