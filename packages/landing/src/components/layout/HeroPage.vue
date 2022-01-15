<template>
    <div class="container">
        <section class="hero is-medium">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <p class="title is-1">{{ title }}</p>
                </div>
            </div>
        </section>
        <slot name="content" v-if="sections">
            <section class="section" v-for="(section, i) in sections" :key="`hero-page-section-${i}`">
                <div class="columns">
                    <div class="column is-offset-3 is-6">
                        <p
                            class="block is-size-5 has-text-justified"
                            v-for="(paragraph, j) in section"
                            :key="`hero-page-paragraph-${i}-${j}`"
                        >
                            {{ paragraph }}
                        </p>
                    </div>
                </div>
            </section>
        </slot>
        <slot name="after-sections"></slot>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        /**
         * @description
         * should be an array of arrays
         * First array level is sections
         * Second array level is paragraphs
         */
        sections: {
            type: Array,
            default: () => [],
        },
    },
};
</script>
