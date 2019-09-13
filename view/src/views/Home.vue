<template>
    <div class="Home">
        <WrittingMachine />
    </div>
</template>

<script>
import WrittingMachine from '@/components/WrittingMachine'

export default {
    name: 'Home',
    data() {
        return {
        }
    },
    components: {
        WrittingMachine
    }
};
</script>

<style>
.Home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%
}
</style>