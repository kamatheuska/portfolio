<template>
    <div class="timestamp container">
        <PageHeader :title="title" />
        <BoxForm v-if="!result" submitButtonText="Get for Date" @submit="getTimestamp" :disableSubmit="!form.date">
            <template v-slot:description>
                <h4>Create a new User</h4>
                <code> /api/users </code>
            </template>
            <div class="field mt-5">
                <div class="control">
                    <input class="input" type="text" v-model="form.date" required />
                </div>
            </div>
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
import {} from '@/services/timestamp';

// const getTimestampByDate = () => {};
export default {
    name: 'ExerciseTracker',
    components: {
        BoxForm,
        PageHeader,
    },

    data() {
        return {
            form: {},
            result: '',
            title: 'Exercise Tracker',
            response: null,
        };
    },

    methods: {
        async getTimestamp() {
            try {
                this.response = await this.getTimestampByDate(this.form.date);
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
        @include tablet {
            width: 40rem;
        }

        pre {
            display: flex;
            align-items: center;
            min-height: 10rem;
        }
    }
}
</style>
