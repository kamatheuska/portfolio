<template>
    <div :class="$style.root">
        <div :class="$style.modal">
            <div :class="$style.menu">
                <div :class="$style.container">
                    <star-item v-for="(item, i) in menuItems" :key="`star-${i}`" v-bind="item" :id="i" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { delay, getRandomNumber } from '../utils';
import StarItem from './icons/StarItem.vue';

const router = useRouter();

const colors = {
    lightBlue: '#95BCCC',
    pink: '#FCDCDC',
    darkBlue: '#2B4C59',
    brown: '#988080',
    gray: '#BECEDA',
    lightBrown: '#DDD4D4',
};

const getPlaceholderStarItem = (color: string) => ({
    color,
    label: '',
    left: `calc(95% - ${getRandomNumber(5, 95)}%)`,
    radius: getRandomNumber(2, 6),
    top: `calc(95% - ${getRandomNumber(5, 95)}%)`,
});

const menuItems = ref([
    {
        id: '1',
        color: colors.lightBlue,
        label: 'Home',
        left: `calc(95% - ${getRandomNumber(70, 95)}%)`,
        radius: getRandomNumber(8, 20),
        top: `calc(95% - ${getRandomNumber(50, 95)}%)`,
    },

    getPlaceholderStarItem(colors.pink),
    getPlaceholderStarItem(colors.lightBlue),
    getPlaceholderStarItem(colors.lightBlue),
    {
        id: '5',
        color: colors.lightBlue,
        label: 'About',
        left: `calc(95% - ${getRandomNumber(30, 70)}%)`,
        radius: getRandomNumber(8, 20),
        top: `calc(95% - ${getRandomNumber(50, 95)}%)`,
    },
    {
        id: '6',
        color: colors.lightBlue,
        label: 'Experience',
        left: `calc(95% - ${getRandomNumber(5, 30)}%)`,
        radius: getRandomNumber(8, 20),
        top: `calc(95% - ${getRandomNumber(50, 95)}%)`,
    },
    getPlaceholderStarItem(colors.brown),
    getPlaceholderStarItem(colors.pink),
    {
        id: '9',
        color: colors.lightBlue,
        label: 'Challenges',
        left: `calc(95% - ${getRandomNumber(5, 50)}%)`,
        radius: getRandomNumber(8, 20),
        top: `calc(95% - ${getRandomNumber(5, 50)}%)`,
    },

    getPlaceholderStarItem(colors.brown),
    getPlaceholderStarItem(colors.lightBlue),
    getPlaceholderStarItem(colors.lightBrown),
    getPlaceholderStarItem(colors.lightBrown),
]);

async function showItemsIncrementally() {
    const currentRoute = router.currentRoute.value;

    for (let index = 0; index < menuItems.value.length; index++) {
        if (currentRoute.name === menuItems.value[index].label) {
            continue;
        }

        if (index > 0) {
            await delay(200);
        }

        menuItems.value = getItemsVisibleByIndex(index);
    }
}

function getItemsVisibleByIndex(currentIndex: number) {
    return menuItems.value.map((item, i) => {
        if (currentIndex === i) {
            return {
                ...item,
                isHidden: false,
            };
        }

        return item;
    });
}

onMounted(async () => {
    await delay(300);
    showItemsIncrementally();
});
</script>

<style module>
.root {
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
    height: 100%;
    position: fixed;
    width: 100vw;
    padding: 20px;
    padding-top: 6rem;
    z-index: 10;
}
.container {
    position: relative;
    height: 100%;
    width: 100%;
}
@media (min-width: 768px) {
    .root {
        display: flex;
        justify-content: center;
    }
}
</style>
