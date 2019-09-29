<template>
    <div class="Projects">
        <div class="Projects__grid"
            v-if="$route.path == '/projects'">
            <Nav direction="horizontal" />
            <h1>Projects Here</h1>
            <router-link to="/projects/weather">Weather App</router-link>
        </div>
        <div class="Projects__detail">
            <router-view />
        </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
    name: 'Projects',
    components: {
        Nav
    }
}
</script>

<style lang="less">

</style>
