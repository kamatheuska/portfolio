<template>
    <div class="home">
        <div class="home__nav">
            <Nav direction="horizontal"/>
        </div>
        <div class="home__greeting">
            <h1>Welcome to my website</h1>
            <p>I am a software developer</p>
            <p>Click on the top bar to see my projects</p>

        </div>
        <div class="home__footer">
            <Footer/>

        </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'


export default {
    name: 'Home',
    components: {
        Nav,
        Footer
    },
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
    color: @portfolio-white;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &__greeting {
        display: flex;
        background-color: #00000044;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 3rem;
        padding-bottom: 3rem;
        padding-left: 6rem;
        padding-right: 6rem;
        border-radius: 1rem;
    }
    &__nav {
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
    }
    &__footer {
        width: 100vw;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}
</style>