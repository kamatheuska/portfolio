<template>
    <div class="project-card">
        <div class="card">
            <div class="card-image">
                <figure class="image is-square">
                    <img :src="imageSrc" :alt="imageAlt" />
                </figure>
            </div>

            <div class="card-content is-size-7-mobile">
                <h2 class="title is-3">
                    {{ title }}
                </h2>
                <h3 class="title is-4">Description</h3>
                <div class="content block">
                    {{ description }}
                </div>
                <h3 class="title is-4" v-if="links">Links</h3>
                <div class="content is-flex is-flex-wrap-wrap block">
                    <table class="table">
                        <tbody>
                            <tr v-for="(link, i) in links" :key="`link-${i}`" class="mr-3 mb-2">
                                <th>
                                    {{ link.text }}
                                </th>
                                <td>
                                    <a :href="link.url" target="_blank" rel="noopener noreferrer">
                                        {{ link.url }}
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 class="title is-4">Tech Stack</h3>
                <ul class="content is-flex is-flex-wrap-wrap">
                    <li v-for="(tag, i) in tags" :key="`tag-${i}`" class="mr-3 mb-2">
                        <span class="tag is-size-7">
                            {{ tag }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        imageSrc: String,
        imageAlt: String,
        description: String,
        title: String,
        tags: Array,
        links: Array,
    },
};
</script>

<style lang="scss" scoped>
.project-card {
    .card {
        height: 100%;
    }
}
</style>
