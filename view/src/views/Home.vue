<template>
    <v-container class="home" fluid>
        <v-row :style="`height: calc((${$vuetify.breakpoint.height}px / 3) - 3rem) `">
            <v-col md="8">
                <HomeCard
                    @toggle="toggleActiveBox('projects')"
                    :isActive="boxes.projects.isActive"
                >
                    <h2
                        class="text-h1 white--text overline font-weight-light home__projects"
                    >
                        Projects
                    </h2>
                </HomeCard>

            </v-col>
            <v-col md="4">
                <HomeCard
                >
                    <h2
                        class="text-h1 white--text overline font-weight-light home__projects"
                    >
                        Projects
                    </h2>
                </HomeCard>
            </v-col>
        </v-row>
        <v-row :style="`height: calc((${$vuetify.breakpoint.height}px / 3) - 3rem) `">
            <v-col>
                <HomeCard
                    @toggle="toggleActiveBox('about')"
                    color="red"
                    :isActive="boxes.about.isActive"
                >
                    <h2
                        class="text-h1 white--text overline font-weight-light home__about"
                    >
                        About
                    </h2>
                </HomeCard>
            </v-col>
            <v-col align="center">
                <div 
                    class="home__greetings p-3"
                    @click="isDark.greetings = !isDark.greetings"
                >

                </div>
                <HomeCard
                    @toggle="isDark.greetings = !isDark.greetings"
                    :showCloseButton="false"
                    color="#123123"
                    :isActive="true"
                >
                    <Greetings
                        :is-dark="isDark.greetings"
                    >
                        <h3 class="mb-3">Click anywhere to see a project</h3>
                        <div class="home__hidden-paragraph">
                            <v-slide-y-transition>
                                <h3 v-if="isDark.greetings">
                                    <strong>
                                        Anywhere outside this box :)
                                    </strong>
                                </h3>
                            </v-slide-y-transition>
                        </div>
                    </Greetings>
                </HomeCard>

            </v-col>
            <v-col>
                <HomeCard
                    color="red"
                    :isActive="false"
                >
                </HomeCard>
            </v-col>
        </v-row>
        <v-row :style="`height: calc((${$vuetify.breakpoint.height}px / 3) - 3rem) `">
            <v-col>
                <HomeCard
                    color="red"
                    :isActive="false"
                >
                </HomeCard>
            </v-col>
            <v-col>
                <HomeCard
                    color="red"
                    :isActive="false"
                >
                </HomeCard>
            </v-col>
            <v-col>
                <HomeCard
                    color="red"
                    :isActive="false"
                >
                </HomeCard>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import Greetings from '@/components/Greetings.vue';
import HomeCard from '@/components/HomeCard.vue';
export default {
    name: 'Home',

    components: {
        Greetings,
        HomeCard
    },

    data() {
        return {
            isDark: {
                greetings: false
            },
            boxes: {
                projects: {
                    isActive: false
                },
                about: {
                    isActive: false
                },
                greetings: {
                    isActive: false
                }
            }
        }
    },

    methods: {
        toggleActiveBox(boxName) {
            if (Object.prototype.hasOwnProperty.call(this.boxes, boxName)) {
                this.boxes[boxName].isActive = !this.boxes[boxName].isActive
            } else {
                console.error(`[Home]: No box with that name - ${boxName}`)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.home {
    &__greetings {
        width: max-content;
    }

    &__hidden-paragraph {
        height: 1.5rem;
    }

    &__projects {
        position: absolute;
        right: 2rem;
        bottom: 2rem;

    }

    &__about {
        position: absolute;
        right: 2rem;
        top: 2rem;

    }
}
</style>
