<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import '@/assets/styles.css'
export default {
    name: 'App',
    data() {
        return {
            introOver: false
        }
    }
};
</script>

