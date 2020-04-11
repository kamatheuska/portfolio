<template>
    <div class="home">
        <Nav direction="horizontal"/>
        <div class="home__greeting">
            <h1>Welcome to my website</h1>
            <p>I am a software developer and a musician</p>
            <p>Click on the top bar to see my projects</p>

        </div>
        <div class="home__footer">
            <Footer></Footer>

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
    font-size: 1.5rem;
    width: 100%;
    height: max-content;
    position: relative;
    height: 100%;
    color: @portfolio-white;
    position: relative;
    &__greeting {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 60vh;
    }
    &__footer {
        width: 100vw;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}
</style>