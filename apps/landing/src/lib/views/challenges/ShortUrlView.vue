<template>
    <div :class="$style.root">
        <fullscreen-layout :show-backdrop="showBackdrop">
            <header>
                <div :class="$style.menu">
                    <font-awesome-icon @click="showBackdrop = !showBackdrop" :icon="['fa', 'bars']" />
                </div>
            </header>
            <h1>Url Shortener</h1>
            <form @submit.prevent="createShortUrl">
                <p>
                    Tired of typing long urls that you do not want to remember? Just use this mini service to make that
                    long and infinite procession of characters into a small and well behaved one.
                </p>
                <div>
                    <div :class="$style.field">
                        <label for="url"> Type a URL </label>
                        <input id="url" v-model="form.url" type="url" required placeholder="https:://google.com" />
                    </div>
                    <button class="button" type="submit">Send</button>
                </div>
                <div :class="$style.result" v-if="resultUrl">
                    <p>Now you can access it by going to:</p>
                    <a :href="resultUrl" target="_blank" rel="noopener noreferrer">
                        {{ resultUrl }}
                    </a>
                </div>
            </form>
        </fullscreen-layout>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import FullscreenLayout from '../../components/layouts/FullscreenLayout.vue';

async function createShortUrl() {
    try {
        if (!form.value.url) return;

        const body = JSON.stringify({ url: form.value.url });

        const response = await fetch('/projects/apis/shorturl', {
            body,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Error on request');
        }

        const responseBody = await response.json();

        resultUrl.value = `${import.meta.env.VITE_API_URL}${responseBody.short}`;
    } catch (error) {
        console.error(error);
    }
}

const form = ref({
    url: '',
});

const resultUrl = ref('');

const showBackdrop = ref(true);
</script>

<style module>
.root form {
    max-width: 350px;
}
.root p {
    text-align: justify;
}
.root header {
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
    font-weight: 900;
    color: var(--lightBrown);
    align-items: flex-end;
}

.menu {
    font-size: 2rem;
}

.field {
    padding: 1rem 0;
}

.field label {
    margin-bottom: 1rem;
    display: block;
}

.field input {
    padding: 0.5rem 0.5rem;
    width: 100%;
    border-radius: 10px;
}
.result {
    margin-top: 2rem;
}
.result p {
    font-family: var(--font-family-mono);
    color: var(--lightGreen);
}
</style>
