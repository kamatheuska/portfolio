<template>
    <div :class="$style.root">
        <div :class="$style.container">
            <star-item v-for="(item, i) in menuItems" :key="`star-${i}`" v-bind="item" @selected="onItemSelected" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { delay } from '../../utils';
import StarItem, { StarItemProps } from '../icons/StarItem.vue';

const router = useRouter();

const menuItems = ref<StarItemProps[]>([
    {
        id: '1',
        isActive: false,
        isHidden: true,
        top: 530,
        left: 220,
        radius: 10,
        label: 'About',
    },
    {
        id: '3',
        isActive: false,
        isHidden: true,
        top: 150,
        left: 150,
        radius: 25,
        label: 'Portfolio',
    },
    {
        id: '2',
        isActive: false,
        isHidden: true,
        top: 750,
        left: 290,
        radius: 18,
        label: 'Stories',
    },
    {
        id: '4',
        isActive: false,
        isHidden: true,
        top: 250,
        left: 50,
        radius: 8,
        label: 'Contact',
    },
]);

async function onItemSelected(id: string) {
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
    await delay(1000);

    const currentItem = menuItems.value.find((item) => item.id === id);

    router.push({ name: currentItem?.label || '' });
}

async function showItemsIncrementally() {
    for (let index = 0; index < menuItems.value.length; index++) {
        if (index > 0) {
            await delay(1500);
        }

        menuItems.value = menuItems.value.map((item, i) => {
            if (index === i) {
                return {
                    ...item,
                    isHidden: false,
                };
            }

            return item;
        });
    }
}
onMounted(async () => {
    await delay(1000);
    showItemsIncrementally();
});
</script>

<style module>
.root {
    height: 100%;
    position: fixed;
    width: 100vw;
}
.container {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>
