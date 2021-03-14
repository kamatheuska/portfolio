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
