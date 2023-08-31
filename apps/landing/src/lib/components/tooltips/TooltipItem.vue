<template>
    <div :class="$style.root">
        <div :style="textLocationStyles">
            <span> {{ text }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
    text: String,
});

const textLocationStyles = ref({
    top: 0,
    left: 0,
});
</script>

<style module>
.root {
    position: relative;
}
.text {
    position: absolute;
    width: max-content;
}
</style>
