<template>
    <v-container class="fallback fill-height" fluid>
        <v-row>
            <v-col align="center">
                <Greetings>
                    <p>
                        <strong>...in maintenance for now...</strong>
                    </p>
                </Greetings>

            </v-col>
        </v-row>
        <Bubbles />
    </v-container>
</template>

<script>
import Greetings from '@/components/Greetings.vue';
import Bubbles from '@/components/Bubbles.vue';


export default {
    name: 'Fallback',

    components: {
        Greetings,
        Bubbles
    },
    
    created () {
        this.$store.dispatch('setCurrentProject', '')
    }
}
</script>

<style lang="scss" scoped>

.fallback {
    font-size: 1.4rem;
    position: relative;
    &__greeting {
        color: $portfolio-dark-blue;
        padding: 3rem 6rem;
    }
}


</style>
