<template>
    <div class="timestamp container">
        <PageHeader :title="title" />
        <BoxForm
            v-if="!result"
            submitButtonText="Get for Date"
            @submit="getTimestamp"
            :disableSubmit="!form.date"
        >
            <template v-slot:description>
                <p class="block">
                    By clicking on <strong>Generate</strong>, you will get a timestamp for the
                    current date and time
                </p>
                <p class="block">
                    You can also type a date and get a timestamp for that specific date. The date
                    types can be in different formats:
                </p>
                <ul class="pl-5 block">
                    <li>Unix format: <strong>e.g. 1451001600000</strong></li>
                    <li>
                        <em>Or any valid date format</em>
                    </li>
                </ul>
            </template>
            <div class="field mt-5">
                <div class="control">
                    <input class="input" type="text" v-model="form.date" required />
                </div>
            </div>
            <button class="button is-info mr-3" @click="createTimestamp" type="button">
                Generate
            </button>

            <template v-slot:preview>
                <div class="timestamp__preview">
                    <pre>{{ response }}</pre>
                </div>
            </template>
        </BoxForm>
    </div>
</template>

<script>
import BoxForm from '@/components/BoxForm.vue';
import PageHeader from '@/components/PageHeader.vue';
import { generateTimestamp, getTimestampByDate } from '@/services/timestamp';

// const getTimestampByDate = () => {};
export default {
    name: 'Timestamp',
    components: {
        BoxForm,
        PageHeader,
    },

    data() {
        return {
            result: '',
            form: {
                date: '',
            },
            title: 'Timestamp Generator',
            response: null,
        };
    },

    methods: {
        generateTimestamp,
        getTimestampByDate,
        async getTimestamp() {
            try {
                this.response = await this.getTimestampByDate(this.form.date);
            } catch (error) {
                console.error(error);
            }
        },

        async createTimestamp() {
            try {
                this.response = await this.generateTimestamp();
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>

<style lang="scss">
.timestamp {
    &__preview {
        width: 40rem;
        pre {
            display: flex;
            align-items: center;
            min-height: 10rem;
        }
    }
}
</style>
