<template>
    <div class="level-item has-text-centered">
        <template v-if="link">
            <a :href="link" class="link" target="_blank" :download="downloadName || null">
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
        downloadName: String,
        hasSmallImage: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
.level-item {
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
