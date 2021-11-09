<template>
    <div
        class="level-item has-text-centered"
        :class="{
            'level-item--is-animated-on-hover': animateOnHover,
        }"
    >
        <template v-if="link">
            <a
                :href="link"
                class="link"
                :target="isInternalLink ? '' : '_blank'"
                :download="downloadName || null"
            >
                <p class="heading">
                    {{ heading }}
                </p>
                <img
                    class="level-item__image"
                    :class="{ 'level-item__image--is-small': hasSmallImage }"
                    :src="imageSrc"
                />
            </a>
        </template>
        <div v-else>
            <template>
                <p class="heading">
                    {{ heading }}
                </p>

                <img
                    class="level-item__image"
                    :class="{ 'level-item__image--is-small': hasSmallImage }"
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
        heading: String,
        link: String,
        isInternalLink: {
            type: Boolean,
            default: false,
        },
        downloadName: String,
        hasSmallImage: {
            type: Boolean,
            default: false,
        },
        animateOnHover: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
.level-item {
    &--is-animated-on-hover {
        transition: transform ease-out 100ms;
        &:hover {
            transform: scale(1.5);
        }
    }
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
