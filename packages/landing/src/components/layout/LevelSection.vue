<template>
    <section class="section is-medium">
        <h2 v-if="title" class="title is-3 has-text-centered mb-6">{{ title }}</h2>
        <HorizontalLevel>
            <slot name="items">
                <LevelItem v-for="(item, i) in items" :key="`level-item-${i}`" v-bind="item" />
            </slot>
        </HorizontalLevel>
    </section>
</template>

<script>
import HorizontalLevel from '@/components/layout/HorizontalLevel.vue';
import LevelItem from '@/components/LevelItem.vue';

export default {
    components: {
        HorizontalLevel,
        LevelItem,
    },

    props: {
        items: {
            type: Array,
            default: () => [],
        },
        title: String,
    },
};
</script>
