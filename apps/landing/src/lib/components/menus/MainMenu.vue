<template>
    <div :class="$style.root">
        <div :class="$style.modal">
            <div :class="$style.container">
                <div :class="$style.logo">
                    <personal-logo />
                </div>
            </div>
        </div>
        <stars-menu />
    </div>
</template>

<script lang="ts" setup>
import PersonalLogo from '../logos/PersonalLogo.vue';
import StarsMenu from './StarsMenu.vue';
</script>

<style module>
.root {
    position: relative;
}
.modal {
    height: 100vh;
    width: 100vw;
    position: absolute;
    background-color: white;
}

.container {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
}
.logo {
    font-size: 1.7rem;
}
</style>
