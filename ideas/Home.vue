<template>
    <v-container class="home" fluid>
        <v-row :style="`height: calc((${$vuetify.breakpoint.height}px / 3) - 3rem) `">
            <v-col md="9" class="pa-3">
                <HomeCard
                    @toggle="toggleActiveBox('projects')"
                    @toggleCardClick="toggleActiveBoxClick($event, 'projects')"
                    @onHover="boxes.projects.isDark = !boxes.projects.isDark"
                    :cardClickDisabled="boxes.projects.clickDisabled"
                    :isActive="boxes.projects.isActive"
                    border="thin"
                    path="projects"
                    color="red"
                >
                    Projects
                </HomeCard>

            </v-col>
            <v-col md="3">
                <HomeCard
                    :isActive="true"
                    border="thin"
                >
                </HomeCard>
            </v-col>
        </v-row>
        <v-row class="mt-5" :style="`height: calc((${$vuetify.breakpoint.height}px / 3) - 3rem) `">
            <v-col>
                <HomeCard
                    @toggle="toggleActiveBox('about')"
                    @toggleCardClick="toggleActiveBoxClick($event, 'about')"
                    :cardClickDisabled="boxes.about.clickDisabled"
                    :isActive="boxes.about.isActive"
                    color="red"
                    border="thin"
                >
                    about
                </HomeCard>
            </v-col>
            <v-col align="center">
                <HomeCard
                    :isActive="true"
                    border="thin"
                >
                </HomeCard>

            </v-col>
            <v-col>
                <HomeCard
                    color="black"
                    :isActive="true"
                    border="thin"
                >
                </HomeCard>
            </v-col>
        </v-row>
        <v-row class="mt-5" :style="`height: calc((${$vuetify.breakpoint.height}px / 3) - 3rem) `">
            <v-col md="2">
                <HomeCard
                    :isActive="boxes.placeholderThree.isActive"
                    @toggle="toggleActiveBox('placeholderThree')"
                    @toggleCardClick="toggleActiveBoxClick($event, 'placeholderThree')"
                    border="thin"
                    :cardClickDisabled="boxes.placeholderThree.clickDisabled"
                >
                </HomeCard>
            </v-col>
            <v-col md="10">
                <HomeCard
                    :isActive="boxes.placeholderOne.isActive"
                    @toggle="toggleActiveBox('placeholderOne')"
                    @toggleCardClick="toggleActiveBoxClick($event, 'placeholderOne')"
                    :cardClickDisabled="boxes.placeholderOne.clickDisabled"
                    border="thin"
                >
                </HomeCard>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import HomeCard from '@/components/HomeCard.vue';
export default {
    name: 'Home',

    components: {
        HomeCard
    },

    data() {
        return {
            isDark: {
                greetings: false
            },
            boxes: {
                projects: {
                    isActive: true,
                    isDark: false,
                    clickDisabled: false
                },
                about: {
                    isActive: true,
                    isDark: false,
                    clickDisabled: false
                },
                greetings: {
                    isActive: true,
                    isDark: false,
                    clickDisabled: false
                },
                placeholderOne: {
                    isActive: true,
                    isDark: false,
                    clickDisabled: false
                },
                placeholderTwo: {
                    isActive: true,
                    isDark: false,
                    clickDisabled: false
                },
                placeholderThree: {
                    isActive: true,
                    isDark: false,
                    clickDisabled: false
                }
            }
        }
    },

    computed: {
        activeBoxes() {
            let active = 0
            for (const box in this.boxes) {
                if (this.boxes.hasOwnProperty(box)) {
                    if (this.boxes[box].isActive) {
                        active++
                    }
                }
            }

            return active
        }
    },

    methods: {
        toggleActiveBox(boxName) {
            if (Object.prototype.hasOwnProperty.call(this.boxes, boxName)) {
                this.boxes[boxName].isActive = !this.boxes[boxName].isActive;

                if (this.activeBoxes >= 3) {
                    for (const box in this.boxes) {
                        if (this.boxes.hasOwnProperty(box)) {
                            if (this.boxes[box].isActive) {
                                this.boxes[box].isActive = false
                                break
                            }
                        }
                    }
                }
            } else {
                console.error(`[Home]: No box with that name - ${boxName}`)
            }
        },
        toggleActiveBoxClick(toggle, boxName) {
            if (Object.prototype.hasOwnProperty.call(this.boxes, boxName)) {
                this.boxes[boxName].clickDisabled = !this.boxes[boxName].clickDisabled;
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
}
</style>
