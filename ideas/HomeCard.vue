<template>
    <div
        class="home-card"
        :style="`height: calc((${$vuetify.breakpoint.height}px / 3) - 3rem) `"
        @click="showCard"
    >
        <v-fade-transition>
            <v-card
                v-if="isActive && !disabled"
                class="pa-2 home-card__card"
                :class="{
                    'home-card__card--thin-border': border === 'thin',
                    'home-card__card--no-hover': customMessage,
                }"
                outlined
                tile
            >
                    <div
                        class="home-card__box"
                        :class="{
                            'home-card__box--is-active': isActive
                        }"
                    >   

                        <v-slide-y-transition
                            v-if="!customMessage"
                        >
                            <h2
                                class="text-h1 overline font-weight-light home-card__body"
                                :class="{
                                    'white--text': isDark
                                }"
                            >
                                <router-link :to="path">
                                    <slot></slot>
                                </router-link>
                            </h2>

                        </v-slide-y-transition>
                        <slot v-else>

                        </slot>
                    </div>

            </v-card>
            <v-card
                v-else-if="isActive && disabled"
                class="pa-2 home-card__card"
                :color="color"
                outlined
                tile
            >

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
        cardClickDisabled: {
            type: Boolean,
            default: false
        },
        showCloseButton: {
            type: Boolean,
            default: true
        },
        customMessage: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'blue'
        },
        border: {
            type: String,
            default: null
        },
        path: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },

    data() {
        return {
            isDark: false
        }
    },
    methods: {
        showCard() {
            if (!this.cardClickDisabled) {
                this.$emit('toggleCardClick', true)
                this.$emit('toggle')
            }
        },
        hideCard() {
            this.$emit('toggle')
            setTimeout(() => {
                this.$emit('toggleCardClick', false)
            }, 200);
        }
    }
}
</script>

<style lang="scss" scoped>

.home-card {
    position: relative;

    &__card {
        height: 100%;
        transition: background-color ease-in 200ms;

        &:hover {
            background-color: black;

            .home-card__body {
                a {
                    color:white;
                    text-decoration: none !important;
                    

                }
            }
        }

        &--thin-border {
            border: 5px black solid !important;
            border-color: red ;
        }

        &--no-hover {

            &:hover {
                background-color: inherit;

                .home-card__body {
                    a {
                        color: inherit;
                    text-decoration: none !important;
                    }
                }
            }
        }
    }

    &__body {

        position: absolute;
        right: 2rem;
        bottom: 2rem;

        a {
            color: inherit;
            text-decoration: none !important;
        }

    }
}

</style>