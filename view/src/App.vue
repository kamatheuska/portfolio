<template>
    <div id="app">
        <nav class="a__nav" v-if="introOver">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
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
.a__nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
