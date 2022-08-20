<template>
  <div class="file-metadata container">
    <PageHeader :title="title" />
    <BoxForm
      description="Please upload a file to be analised"
      submit-button-text="Upload"
      @submit="onSubmit"
    >
      <div class="mb-5 file has-name">
        <label
          for="resume"
          class="file-label"
        >
          <span class="file-cta">
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span class="file-name">
            {{ filename }}
          </span>
          <input
            class="file-input"
            type="file"
            name="resume"
            @change="setFile"
          >
        </label>
      </div>
      <template #preview>
        <div
          v-if="response"
          class="timestamp__preview"
        >
          <pre>{{ response }}</pre>
        </div>
      </template>
    </BoxForm>
  </div>
</template>

<script>
import { uploadFile } from '@/services/file-metadata';

import BoxForm from '@/components/BoxForm.vue';
import PageHeader from '@/components/PageHeader.vue';

export default {
  name: 'FileMedatada',
  components: {
    BoxForm,
    PageHeader,
  },

  data: () => ({
    file: null,
    form: {},
    response: '',
    title: 'File Metadata',
  }),

  computed: {
    filename() {
      return this.file?.name || '';
    },
  },

  methods: {
    uploadFile,

    setFile(event) {
      const file = event.target.files[0];

      this.file = file;
    },

    async onSubmit() {
      try {
        if (this.file) {
          const formData = new FormData();

          formData.append('attachment', this.file);
          this.response = await this.uploadFile(formData);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.file-metadata {
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
