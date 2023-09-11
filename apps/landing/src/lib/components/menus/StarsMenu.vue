<template>
    <div :class="$style.root">
        <div :class="$style.container">
            <star-item v-for="(item, i) in menuItems" :key="`star-${i}`" v-bind="item" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { delay, getRandomNumber } from '../../utils';
import StarItem, { StarItemProps } from '../icons/StarItem.vue';

const router = useRouter();

const emits = defineEmits(['selected']);

const colors = {
    lightBlue: '#95BCCC',
    pink: '#FCDCDC',
    darkBlue: '#2B4C59',
    brown: '#988080',
    gray: '#BECEDA',
    lightBrown: '#DDD4D4',
};

const menuItems = ref<StarItemProps[]>([
    {
        id: '1',
        backgroundColor: colors.lightBlue,
        label: 'Home',
        left: `calc(95% - ${getRandomNumber(70, 95)}%)`,
        radius: getRandomNumber(8, 20),
        top: `calc(95% - ${getRandomNumber(50, 95)}%)`,
    },

    {
        id: '2',
        backgroundColor: colors.pink,
        left: `calc(95% - ${getRandomNumber(5, 95)}%)`,
        radius: getRandomNumber(2, 6),
        top: `calc(95% - ${getRandomNumber(5, 95)}%)`,
    },
    {
        id: '3',
        backgroundColor: colors.lightBlue,
        left: `calc(95% - ${getRandomNumber(5, 95)}%)`,
        radius: getRandomNumber(2, 6),
        top: `calc(95% - ${getRandomNumber(5, 95)}%)`,
    },
    {
        id: '4',
        backgroundColor: colors.lightBlue,
        left: `calc(95% - ${getRandomNumber(5, 95)}%)`,
        radius: getRandomNumber(2, 6),
        top: `calc(95% - ${getRandomNumber(5, 95)}%)`,
    },
    {
        id: '5',
        backgroundColor: colors.lightBlue,
        label: 'About',
        left: `calc(95% - ${getRandomNumber(30, 70)}%)`,
        radius: getRandomNumber(8, 20),
        top: `calc(95% - ${getRandomNumber(50, 95)}%)`,
    },
    {
        id: '6',
        backgroundColor: colors.lightBlue,
        label: 'Experience',
        left: `calc(95% - ${getRandomNumber(5, 30)}%)`,
        radius: getRandomNumber(8, 20),
        top: `calc(95% - ${getRandomNumber(50, 95)}%)`,
    },

    {
        id: '7',
        backgroundColor: colors.brown,
        left: `calc(95% - ${getRandomNumber(5, 95)}%)`,
        radius: getRandomNumber(2, 6),
        top: `calc(95% - ${getRandomNumber(5, 95)}%)`,
    },
    {
        id: '8',
        backgroundColor: colors.pink,
        left: `calc(95% - ${getRandomNumber(5, 95)}%)`,
        radius: getRandomNumber(2, 6),
        top: `calc(95% - ${getRandomNumber(5, 95)}%)`,
    },
    {
        id: '9',
        backgroundColor: colors.lightBlue,
        label: 'Stories',
        left: `calc(95% - ${getRandomNumber(5, 50)}%)`,
        radius: getRandomNumber(8, 20),
        top: `calc(95% - ${getRandomNumber(5, 50)}%)`,
    },

    {
        id: '10',
        backgroundColor: colors.brown,
        left: `calc(95% - ${getRandomNumber(5, 95)}%)`,
        radius: getRandomNumber(2, 6),
        top: `calc(95% - ${getRandomNumber(5, 95)}%)`,
    },
    {
        id: '11',
        backgroundColor: colors.lightBlue,
        left: `calc(95% - ${getRandomNumber(5, 95)}%)`,
        radius: getRandomNumber(2, 6),
        top: `calc(95% - ${getRandomNumber(5, 95)}%)`,
    },
    {
        id: '11',
        backgroundColor: colors.lightBrown,
        left: `calc(95% - ${getRandomNumber(5, 95)}%)`,
        radius: getRandomNumber(2, 6),
        top: `calc(95% - ${getRandomNumber(5, 95)}%)`,
    },
    {
        id: '11',
        backgroundColor: colors.lightBrown,
        left: `calc(95% - ${getRandomNumber(5, 95)}%)`,
        radius: getRandomNumber(2, 6),
        top: `calc(95% - ${getRandomNumber(5, 95)}%)`,
    },
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
    height: 100%;
    position: fixed;
    width: 100vw;
    padding: 20px;
    padding-top: 6rem;
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
