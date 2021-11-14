<template>
    <div class="url-shortener container">
        <header>
            <h1 class="title is-3">Give me a shorter one</h1>
        </header>
        <section>
            <div class="url-shortener__form-box box" v-if="!resultUrl">
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
                <p class="url-shortener__original block p-3">
                    <strong>{{ shortendOriginalUrl }}</strong>
                </p>
                <p class="block">going to</p>
                <a :href="response.href" target="_blank">
                    <div class="url-shortener__short box has-background-primary has-text-white m-4">
                        <p class="block">
                            <strong> {{ resultUrl }} </strong>
                        </p>
                    </div>
                </a>
                <div class="mt-5" style="width: 14rem; margin: 0 auto">
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
        createShortUrl,

        async onSubmit() {
            try {
                const { origin } = window.location;
                this.response = await this.createShortUrl(this.form.url);
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
    @include tablet {
        padding-left: 0;
    }
    header {
        padding-left: 1rem;
        @include tablet {
            padding-left: 0;
        }
    }
    section {
        padding-top: 10rem;
        padding-bottom: 10rem;
        @include tablet {
            display: flex;
            justify-content: center;
        }
    }

    &__form-box.box {
        flex-basis: 40rem;
        padding: 4rem 6rem;
    }

    &__original {
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    &__short {
        transition: transform 300ms ease;
        &:hover {
            transform: scale(1.2);
        }
    }
}
</style>
