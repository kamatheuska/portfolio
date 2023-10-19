<template>
    <div>
        <main-menu />
        <transition name="fade">
            <div :class="$style.backdrop" v-if="showBackdrop">
                <main :class="$style.main">
                    <slot></slot>
                </main>
            </div>
        </transition>
    </div>
</template>
<script lang="ts" setup>
import MainMenu from '../MainMenu.vue';
defineProps({
    showBackdrop: {
        type: Boolean,
        default: true,
    },
});
</script>

<style module>
.backdrop {
    backdrop-filter: blur(5px);
    width: 100%;
}
.main {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 1rem;
    flex-direction: column;
    position: relative;
}

@media (min-width: 768px) {
    .main {
        max-width: 50%;
    }
}
</style>
