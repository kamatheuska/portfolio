<template>
    <button :class="$style.root">
        <span>
            <font-awesome-icon :icon="['fa', 'arrow-left']" />
        </span>
        back
    </button>
</template>

<script lang="ts" setup></script>

<style module>
.root {
    background: none;
    border: none;
    color: var(--pink);
    display: flex;
    align-items: center;
    padding: 1rem;
    width: max-content;
    position: fixed;
    justify-content: center;
    top: 0;
    font-size: 2rem;
    left: 20px;
    font-family: var(--font-family-mono);
}

.root span {
    font-size: 2rem;
    margin-right: 2rem;
}
</style>
