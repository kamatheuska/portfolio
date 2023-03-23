<template>
    <div @click="goToHome">
        <span> nicolasramirez.dev </span>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToHome() {
    router.push({ name: 'Home' });
}
</script>
