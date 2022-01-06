<template>
    <div class="project-card">
        <div
            class="card"
            :class="{
                'card--is-transparent': isTransparent,
            }"
        >
            <div class="card-image py-4 px-2">
                <figure class="image is-square">
                    <img :src="imageSrc" :alt="imageAlt" :loading="loading" />
                </figure>
            </div>

            <div
                class="card-content is-size-7-mobile"
                :class="{
                    'card-content--is-opened': showAll,
                }"
            >
                <h2 class="title is-3 is-size-5-mobile">
                    {{ title }}
                </h2>
                <h3 v-if="company" class="subtitle is-5 is-size-7-mobile">
                    {{ company }}
                </h3>
                <transition name="fade-in-fast">
                    <div class="content block" v-if="showAll && highlights">
                        <h3 class="title is-4 is-size-6-mobile">Highlights</h3>
                        <ul class="list is-flex is-flex-wrap-wrap">
                            <li v-for="(highlight, i) in highlights" :key="`highlight-${i}`" class="list-item">
                                <p>
                                    {{ highlight }}
                                </p>
                            </li>
                        </ul>
                    </div>
                </transition>
                <transition name="fade-in-fast">
                    <div class="content block" v-if="description">
                        <h3 class="title is-4 is-size-6-mobile">Description</h3>
                        <div class="content">
                            <p>
                                {{ description }}
                            </p>
                        </div>
                    </div>
                </transition>
                <transition name="fade-in-fast">
                    <div class="block project-card__links" v-if="showAll && links">
                        <h3 class="title is-4 is-size-6-mobile">Links</h3>
                        <ul>
                            <li v-for="(link, i) in links" :key="`link-${i}`" class="mr-3 mb-2">
                                <a :href="link.url" target="_blank" rel="noopener noreferrer">
                                    {{ link.text }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </transition>
                <div class="content block" v-if="showAll && tags">
                    <h3 class="title is-4 is-size-6-mobile">Tech Stack</h3>
                    <ul class="is-flex is-flex-wrap-wrap">
                        <template v-if="showAll">
                            <li v-for="(tag, i) in tags" :key="`tag-${i}`" class="mr-3 mb-2">
                                <span class="tag is-size-7">
                                    {{ tag }}
                                </span>
                            </li>
                        </template>
                        <template v-else>
                            <li v-for="(tag, i) in firstTags" :key="`tag-${i}`" class="mr-3 mb-2">
                                <span class="tag is-size-7">
                                    {{ tag }}
                                </span>
                            </li>
                            <li>
                                <span class="tag is-size-7"> ... </span>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
            <footer class="card-footer">
                <router-link v-if="isMobileXs" class="card-footer-item" :to="detailsPage"> Details </router-link>
                <button v-else class="button is-ghost card-footer-item" @click="showAll = !showAll">
                    <span class="has-text-link" v-if="showAll">Less</span>
                    <span class="has-text-link" v-else>More</span>
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
import { isMobileXs } from '@/utils';

export default {
    props: {
        id: String,
        imageSrc: String,
        imageAlt: String,
        description: String,
        company: String,
        highlights: Array,
        title: String,
        loading: String,
        tags: Array,
        links: Array,
        isTransparent: Boolean,
        type: String,
        meta: Object,
    },
    data: () => ({
        showAll: false,
    }),
    computed: {
        isMobileXs,
        firstTags() {
            return this.tags.slice(0, 3);
        },
        detailsPage() {
            return `/projects/${this.meta.title}/${this.id}`;
        },
    },
};
</script>

<style lang="scss" scoped>
$image-height: 520px;
$card-content-padding: 3rem;
.project-card {
    height: max-content;

    .card {
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        &--is-transparent {
            background-color: rgba(255, 255, 255, 0.5);
        }

        @include tablet {
            display: block;
        }
    }
    .card-image {
        flex-basis: 35%;
    }
    .card-content {
        flex-basis: 65%;
        padding-left: 0.6rem;
        padding-right: 0.6rem;

        @include tablet {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            min-height: 17rem;
        }
        &--is-opened {
            min-height: calc($project-card-height-fully-opened - $image-height - $card-content-padding);
        }
    }
    .card-footer {
        flex-basis: 100%;
    }
}
</style>
