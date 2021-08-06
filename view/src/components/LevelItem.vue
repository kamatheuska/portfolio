<template>
    <div class="level-item has-text-centered">
        <div>
            <p class="heading">
                {{ heading }}
            </p>
            <img class="level-item__image" :src="imageSrc" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'LevelItem',

    props: {
        imageSrc: String,
        heading: String,
    },
};
</script>

<style lang="scss" scoped>
.level-item {
    &__image {
        height: 100px;
    }
}
</style>
