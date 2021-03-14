<template>
    <div
        class="home-card"
        :style="`height: calc((${$vuetify.breakpoint.height}px / 3) - 3rem) `"
        @click="showCard"
    >
        <v-fade-transition>
            <v-card
                v-if="isActive"
                :color="color"
                class="darken-4 pa-2 home-card__card"
                :dark="true"
                :style="`height: calc((${$vuetify.breakpoint.height}px / 3) - 3rem) `"
                outlined
                tile
            >
                <v-card-title v-if="showCloseButton">
                    <v-icon
                        @click="hideCard"
                        class="home-card"
                        large
                    >
                        mdi-close
                    </v-icon>

                </v-card-title>
                <v-card-text>
                    <div
                        class="home-card__box"
                        :class="{
                            'home-card__box--is-active': isActive
                        }"
                    >
                        <slot></slot>
                    </div>

                </v-card-text>
            </v-card>
        </v-fade-transition>


    </div>
</template>

<script>
export default {
    name: 'HomeCard',

    props: {
        isActive: {
            type: Boolean,
            default: false
        },
        showCloseButton: {
            type: Boolean,
            default: true
        },
        color: {
            type: String,
            default: 'blue'
        }
    },

    data() {
        return {
            cardClickDisabled: false
        }
    },
    methods: {
        showCard() {
            if (!this.cardClickDisabled) {
                this.cardClickDisabled = true
                this.$emit('toggle')
            }
        },
        hideCard() {
            this.$emit('toggle')
            setTimeout(() => {
                this.cardClickDisabled = false;
            }, 200);
        }
    }
}
</script>

<style lang="scss" scoped>

.home-card {
    position: relative;
}

</style>