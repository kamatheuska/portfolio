<template>
    <div>
        <main-menu />
        <transition name="fade">
            <div :class="$style.backdrop" v-if="showBackdrop">
                <main :class="$style.main">
                    <header v-if="showMenuIcon">
                        <div :class="$style.menu">
                            <font-awesome-icon @click="emits('toggleBackdrop')" :icon="['fa', 'bars']" />
                        </div>
                    </header>
                    <slot></slot>
                </main>
            </div>
            <back-button v-else @click="emits('toggleBackdrop')" />
        </transition>
    </div>
</template>
<script lang="ts" setup>
import BackButton from '../BackButton.vue';
import MainMenu from '../MainMenu.vue';
defineProps({
    showBackdrop: {
        type: Boolean,
        default: true,
    },
    showMenuIcon: {
        type: Boolean,
        default: false,
    },
});
const emits = defineEmits(['toggleBackdrop']);
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
.main header {
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
    font-weight: 900;
    color: var(--lightBrown);
    align-items: flex-end;
}

.menu {
    font-size: 2rem;
}

@media (min-width: 768px) {
    .main {
        max-width: 50%;
    }
}
</style>
