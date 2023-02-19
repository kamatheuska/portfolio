<template>
    <nav>
        <ul>
            <NavItem v-for="(route, i) in items" :path="route.href" :label="route.label" :key="`navbar-item${i}`" />
        </ul>
    </nav>
</template>

<script lang="ts" setup>
import NavItem from './nav-item/NavItem.vue';
import { NavigationRoute } from '../../config/menus/menu.types';

defineProps<{
    items: NavigationRoute[];
}>();
</script>
