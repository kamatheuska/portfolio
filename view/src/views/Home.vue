<template>
    <div class="home">
        <Nav direction="vertical"/>
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: @portfolio-dark-blue;
}
</style>