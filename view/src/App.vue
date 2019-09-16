<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            introOver: false
        }
    }
};
</script>

<style lang="less">
body, html {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
}
html > * {
    box-sizing: border-box;
}
#app {
    height: 100%;
    font-family: "Merriweather", serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
