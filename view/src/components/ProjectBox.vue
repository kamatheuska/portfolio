<template>
    <router-link :to="projectUrl"
        class="ProjectBox__link">
        <article class="ProjectBox">
            <div class="ProjectBox__image--wrapper">
                <img class="ProjectBox__image"
                    :src="`images/${thumbnail.fileName}`"
                    :alt="thumbnail.alt">
            </div>
            <div class="ProjectBox__body">
                <h1 class="ProjectBox__title">{{ title }}</h1>
            </div>
        </article>
    </router-link>
</template>

<script>
export default {
    name: 'ProjectBox',
    props: [
        'title',
        'thumbnail',
        'projectUrl'
    ]
}
</script>

<style lang="less">
.ProjectBox {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 250px;
    align-items: center;
    border: 1px solid #ccc;
    box-shadow: 3px 5px 6px 0px rgba(183, 183, 183, 0.69);
    padding: 0 20px;
    &__image {
        height: 100%;
        width: inherit;
        &--wrapper {
            position: relative;
            grid-column: 1 / span 1;
            height: max-content;
            width: inherit;
        }
    }

    &__body {
        grid-column: 2;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
}

</style>