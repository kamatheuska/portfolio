<template>
    <div class="url-shortener container">
        <header>
            <h1 class="title is-3">Give me a shorter one</h1>
        </header>
        <section class="is-flex is-justify-content-center">
            <div class="box" v-if="!resultUrl">
                <p class="block">
                    {{ explanation }}
                </p>
                <form @submit.prevent="onSubmit">
                    <div class="field">
                        <label class="label">URL</label>
                        <div class="control">
                            <input class="input" type="url" v-model="form.url" required />
                        </div>
                    </div>

                    <button class="button is-primary" type="submit">Do it</button>
                </form>
            </div>
            <div v-else class="has-text-centered">
                <p class="block">
                    {{ youCanAccess }}
                </p>
                <p class="block">
                    <strong>{{ shortendOriginalUrl }}</strong>
                </p>
                <p class="block">going to</p>
                <p class="block">
                    <a :href="response.href" target="_blank">
                        <strong> {{ resultUrl }} </strong>
                    </a>
                </p>
                <div style="width: 14rem; margin: 0 auto">
                    <figure class="image is-square">
                        <img :src="resultGifSrcImage" />
                    </figure>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import apiServices from '@/services/api';

export default {
    name: 'UrlShortener',
    data: () => ({
        form: {
            url: '',
        },
        explanation: `
            Tired of typing long urls that you do not want to remenmber? Just use
            this mini service to make that long and infinite procession of characters
            into a small and well behaved one.
        `,
        resultUrl: '',
        response: {},
    }),

    computed: {
        youCanAccess() {
            return `Now you can access`;
        },
        shortendOriginalUrl() {
            const MAX_LENGTH_URL = 70;
            const url = this.response.originalUrl;
            if (url) {
                return url.length > MAX_LENGTH_URL ? url.slice(0, MAX_LENGTH_URL) : url;
            }
            return '';
        },
        resultGifSrcImage() {
            return `${this.$env.PORTFOLIO_BUCKET}/images/cartman.gif`;
        },
    },

    methods: {
        async onSubmit() {
            try {
                const data = await apiServices.createShortUrl(this.form.url);
                const { origin } = window.location;
                this.response = data;
                this.resultUrl = `${origin}${data.href}`;
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.url-shortener {
    header {
        padding-left: 1rem;
        @include tablet {
            padding-left: 0;
        }
    }
    section {
        padding-top: 10rem;
        padding-bottom: 10rem;

        .box {
            flex-basis: 40rem;
            padding: 4rem 6rem;
        }
    }
}
</style>
