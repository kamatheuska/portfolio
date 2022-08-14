<template>
  <div class="url-shortener container">
    <PageHeader :title="title" />
    <BoxForm
      description="Create a new user"
      submit-button-text="Submit"
      @submit="onCreateUser"
    >
      <div class="field">
        <code> POST /api/users </code>
        <label
          class="label"
          for="username"
        >
          <div class="control mt-2">
            <input
              id="username"
              v-model="user.form.username"
              class="input"
              type="username"
              placeholder="username"
              required
            >
          </div>
        </label>
      </div>
    </BoxForm>
    <BoxForm
      description="Add exercises"
      submit-button-text="Submit"
      @submit="onAddExercise"
    >
      <div class="field">
        <code> POST /api/users/:_id/exercises </code>
        <label
          class="label"
          for="id"
        >
          <div class="control mt-2">
            <input
              id="id"
              v-model="exercise.form._id"
              class="input"
              type="text"
              placeholder="_id"
              required
            >
          </div>
        </label>
      </div>
      <div class="field">
        <label
          class="label"
          for="description"
        >
          <div class="control mt-2">
            <input
              id="description"
              v-model="exercise.form.description"
              class="input"
              type="text"
              placeholder="description"
              required
            >
          </div>
        </label>
      </div>
      <div class="field">
        <label
          class="label"
          for="duration"
        >
          <div class="control mt-2">
            <input
              id="duration"
              v-model="exercise.form.duration"
              class="input"
              type="number"
              placeholder="duration* (mins.)"
              required
            >
          </div>
        </label>
      </div>
      <div class="field">
        <label
          class="label"
          for="date"
        >
          <div class="control mt-2">
            <input
              id="date"
              v-model="exercise.form.date"
              class="input"
              type="text"
              placeholder="date (yyyy-mm-dd)"
              required
            >
          </div>
        </label>
      </div>
    </BoxForm>
  </div>
</template>

<script>
import { createUser, addExercise } from '@/services/exercise-tracker';

import BoxForm from '@/components/BoxForm.vue';
import PageHeader from '@/components/PageHeader.vue';

export default {
  name: 'UrlShortener',
  components: {
    BoxForm,
    PageHeader,
  },

  data: () => ({
    user: {
      form: {
        username: '',
      },
    },
    exercise: {
      form: {
        _id: '',
        description: '',
        duration: '',
        date: '',
      },
    },
    response: {},
    title: 'Exercise Tracker',
  }),

  methods: {
    createUser,
    addExercise,

    async onCreateUser() {
      try {
        this.response = await this.createUser(this.user.form.username);
      } catch (error) {
        console.error(error);
      }
    },

    async onAddExercise() {
      try {
        const {
          description,
          duration,
          date,
          _id,
        } = this.exercise.form;

        this.response = await this.addExercise(_id, {
          description,
          duration,
          date,
        });
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
    section {
        padding-top: 3rem;
        @include tablet {
            display: flex;
            justify-content: center;
        }
    }
}
</style>
