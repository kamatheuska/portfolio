<template>
    <button :class="$style.root">
        <span>
            <font-awesome-icon :icon="['fa', 'arrow-left']" />
        </span>
        BACK
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
    font-size: 1rem;
    left: 20px;
    font-family: var(--font-family-mono);
    font-weight: 900;
    letter-spacing: 3px;
    cursor: pointer;
}

.root span {
    font-size: 1rem;
    margin-right: 1rem;
}

@media (min-width: 768px) {
    .root {
        font-size: 1rem;
    }
    .root span {
        font-size: 1rem;
        margin-right: 1rem;
    }
}
</style>
