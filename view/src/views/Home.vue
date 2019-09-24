<template>
    <div class="Home">
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

<style>
.Home {
    height: 100%
}
</style>