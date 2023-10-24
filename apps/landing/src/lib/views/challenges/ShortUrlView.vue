<template>
    <challenge-layout>
        <h1>Url Shortener</h1>
        <form @submit.prevent="createShortUrl">
            <p>
                Tired of typing long urls that you do not want to remember? Just use this mini service to make that long
                and infinite procession of characters into a small and well behaved one.
            </p>
            <div>
                <form-field>
                    <label for="url"> Type a URL </label>
                    <input id="url" v-model="form.url" type="url" required placeholder="https:://google.com" />
                </form-field>
                <button class="button" type="submit">Send</button>
            </div>
            <div :class="$style.result" v-if="resultUrl">
                <p>Now you can access it by going to:</p>
                <a :href="resultUrl" target="_blank" rel="noopener noreferrer">
                    {{ resultUrl }}
                </a>
            </div>
        </form>
    </challenge-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import ChallengeLayout from '../../components/layouts/ChallengeLayout.vue';
import FormField from '../../components/forms/FormField.vue';

const baseUrl = import.meta.env.VITE_API_URL;
async function createShortUrl() {
    try {
        if (!form.value.url) return;

        const body = JSON.stringify({ url: form.value.url });

        const response = await fetch(`${baseUrl}/projects/apis/shorturl`, {
            body,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Error on request');
        }

        const responseBody = await response.json();

        resultUrl.value = `${baseUrl}${responseBody.short}`;
    } catch (error) {
        console.error(error);
    }
}

const form = ref({
    url: '',
});

const resultUrl = ref('');
</script>

<style module>
.result {
    margin-top: 2rem;
}
.result p {
    font-family: var(--font-family-mono);
    color: var(--lightGreen);
}
</style>
