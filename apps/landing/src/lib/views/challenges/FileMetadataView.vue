<template>
    <challenge-layout>
        <div :class="$style.root">
            <h1>File Metadata</h1>
            <p>Please upload a file to be analised</p>
            <form @submit.prevent="uploadFile">
                <div>
                    <label for="resume" class="button">
                        Choose a file
                        <input type="file" id="resume" @change="setFile" />
                    </label>
                    <p :class="$style.filename" v-if="file">
                        {{ file.name }}
                    </p>
                </div>
                <button v-if="file" type="submit" class="button">Analyse</button>
            </form>
            <div v-if="result">
                <pre v-text="result"></pre>
            </div>
        </div>
    </challenge-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ChallengeLayout from '../../components/layouts/ChallengeLayout.vue';

const file = ref<File | null>(null);
const result = ref(null);

function setFile(event: Event) {
    const target = event.target as HTMLInputElement;
    file.value = target.files ? target.files[0] : null;
}
const baseUrl = import.meta.env.VITE_API_URL;

async function uploadFile() {
    try {
        if (file.value) {
            const formData = new FormData();

            formData.append('upfile', file.value);

            const response = await fetch(`${baseUrl}/projects/apis/fileanalyse`, {
                body: formData,
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Error on request');
            }

            result.value = await response.json();
        }
    } catch (error) {
        console.error(error);
    }
}
</script>
<style module>
.root {
    width: 350px;
}
.root input {
    display: none;
}
.root p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.root button {
    margin-top: 2rem;
}
.filename {
    color: var(--green);
    font-family: var(--font-family-mono);
    font-weight: 900;
}
</style>
