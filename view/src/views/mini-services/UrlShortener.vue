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
                <p class="block">Now you can access</p>
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
import { createShortUrl } from '@/services/urlShortener';
import { MAX_LENGTH_URL } from '@/constants';

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
        shortendOriginalUrl() {
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
                const { origin } = window.location;
                this.response = await createShortUrl(this.form.url);
                this.resultUrl = `${origin}${this.response.href}`;
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
