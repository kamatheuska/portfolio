<template>
    <HeroPage :title="title"> </HeroPage>
</template>

<script>
import HeroPage from '@/components/layout/HeroPage.vue';

export default {
    components: {
        HeroPage,
    },

    data() {
        return {
            title: 'Microservices',
        };
    },
};
</script>
