<template>
    <div :class="$style.root">
        <div :class="$style.text" :style="textLocationStyles">
            <span> {{ text }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

defineProps({
    text: String,
});

const textLocationStyles = ref({
    top: 0,
    left: 0,
});

onMounted(() => {
    console.log('onMounted Tooltip');
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
