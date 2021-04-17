<template>
    <div
        class="greetings"
        :class="{
            'greetings--is-dark': isDark
        }"
    >
        <h1 class="pb-5">Welcome to my website</h1>
        <p>I am a software developer</p>
        <slot></slot>
    </div>
</template>

<script>

export default {
    props: {
        isDark: {
            type: Boolean,
            default: false
        }
    }
}

</script>

<style lang="scss">
.greetings {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
}

</style>
