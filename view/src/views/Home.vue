<template>
    <div class="home">
        <div class="home__greeting">
            <h1>Welcome to my website</h1>
            <p>I am a software developer</p>
            <p>Click on the top bar to see my projects</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    created () {
        this.$store.dispatch('setCurrentProject', '')
    }
}
</script>

<style lang="less" scoped>
.home {
    font-size: 1.4rem;
    width: 100%;
    height: max-content;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &__greeting {
        color: @portfolio-dark-blue;
        border: 3px solid lighten(@portfolio-dark-blue, 50%);
        padding: 3rem 6rem;
    }
}
</style>
