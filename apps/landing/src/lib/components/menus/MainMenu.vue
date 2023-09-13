<template>
    <div>
        <div :class="$style.container">
            <div :class="$style.modal">
                <div :class="$style.menu">
                    <stars-menu />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import StarsMenu from './StarsMenu.vue';
</script>

<style module>
.container {
    position: relative;
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.5s linear;
}
.modal {
    height: 100%;
    width: 100vw;
    position: fixed;
}

.menu {
    z-index: 10;
}
</style>
