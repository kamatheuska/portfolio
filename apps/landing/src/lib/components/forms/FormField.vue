<template>
    <div :class="$style.root">
        <slot />
    </div>
</template>

<style module>
.root {
    padding: 1rem 0;
}

.root label {
    margin-bottom: 1rem;
    display: block;
}

.root input {
    padding: 0.5rem 0.5rem;
    width: 100%;
    border-radius: 10px;
}
</style>
