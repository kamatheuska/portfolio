<template>
    <div class="project-detail">
        <HeroPage :title="title">
            <template #sections>
                <p>under construction</p>
            </template>
        </HeroPage>
    </div>
</template>

<script>
import HeroPage from '@/components/layout/HeroPage.vue';

export default {
    name: 'ProjectDetailView',
    components: {
        HeroPage,
    },

    mounted() {},

    data() {
        return {
            title: 'Details',
        };
    },
};
</script>

<style lang="scss">
.services {
    .level-item {
        margin-bottom: 3rem;
    }

    .level-item:last-child {
        margin-bottom: 0;
    }
}
</style>
