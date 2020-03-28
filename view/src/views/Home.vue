<template>
    <div class="home">
        <Nav direction="horizontal"/>
        <div class="home__greeting">
            <p>Welcome to my website</p>

        </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
    name: 'Home',
    components: {
        Nav
    }
}
</script>

<style lang="less" scoped>
.home {
    width: 100%;
    height: max-content;

    &__greeting {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 90vh;
    }
}
</style>