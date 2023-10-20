<template>
    <challenge-layout>
        <div :class="$style.container">
            <h1>Timestamp</h1>
            <p>
                By clicking on <strong>Generate</strong>, you will get a timestamp for the current date and time on
                <strong>UTC and UNIX Format</strong>
            </p>
            <p>
                You can also type a date and get a timestamp for that specific date. The date types can be in different
                formats:
            </p>
            <ul>
                <li>Unix format: <strong>e.g. 1451001600000</strong></li>
                <li>
                    <em>Or any valid date format</em>
                </li>
            </ul>
            <form @submit.prevent="getTimestampByDate">
                <form-field>
                    <input id="url" v-model="form.date" type="text" required placeholder="1451001600000" />
                </form-field>
                <div :class="$style.buttons">
                    <button class="button" type="button" @click="generateTimestamp">Generate</button>
                    <button class="button" type="submit">Get for Date</button>
                </div>
            </form>
            <div>
                <pre v-text="result"></pre>
            </div>
        </div>
    </challenge-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import FormField from '../../components/forms/FormField.vue';
import ChallengeLayout from '../../components/layouts/ChallengeLayout.vue';

async function generateTimestamp() {
    try {
        const response = await fetch('/projects/apis/timestamp');

        if (!response.ok) {
            throw new Error('Error on request');
        }

        result.value = await response.json();
    } catch (error) {
        console.error(error);
    }
}
async function getTimestampByDate() {
    try {
        const date = encodeURIComponent(form.value.date);
        const response = await fetch(`/projects/apis/timestamp/${date}`);

        if (!response.ok) {
            throw new Error('Error on request');
        }

        result.value = await response.json();
    } catch (error) {
        console.error(error);
    }
}
const form = ref({
    date: '',
});
const result = ref(null);
</script>

<style module>
.container pre {
    display: flex;
    align-items: center;
    min-height: 7rem;
    background-color: var(--darkerBlue);
    border-radius: 10px;
    font-size: 0.875em;
    overflow-x: auto;
    padding: 1.25rem 1.5rem;
    white-space: pre;
    word-wrap: normal;
}
.buttons {
    display: flex;
    gap: 1rem;
    width: 100%;
}
.buttons button {
    width: 100%;
}
</style>
