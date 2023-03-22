<template>
    <div :class="$style.root">
        <div :class="$style.container">
            <star-item v-for="(item, i) in menuItems" :key="`star-${i}`" v-bind="item" @activated="onItemActivated" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import StarItem, { StarItemProps } from '../icons/StarItem.vue';

const menuItems = ref<StarItemProps[]>([
    {
        id: '1',
        isActive: false,
        top: 600,
        left: 230,
        radius: 10,
        label: 'About',
    },
    {
        id: '2',
        isActive: false,
        top: 650,
        left: 250,
        radius: 18,
        label: 'Stories',
    },
    {
        id: '3',
        isActive: false,
        top: 150,
        left: 150,
        radius: 25,
        label: 'Portfolio',
    },
    {
        id: '4',
        isActive: false,
        top: 250,
        left: 50,
        radius: 8,
        label: 'Contact',
    },
]);

function onItemActivated(id: string) {
    menuItems.value = menuItems.value.map((item) => {
        if (item.id === id) {
            return {
                ...item,
                isActive: !item.isActive,
            };
        }
        return {
            ...item,
            isActive: false,
        };
    });
}
</script>

<style module>
.root {
    height: 100vh;
    position: absolute;
    width: 100vw;
}
.container {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>
