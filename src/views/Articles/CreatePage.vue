<script setup>
import { ref } from 'vue';
import { useToast } from "vue-toastification";
import Editor from '@tinymce/tinymce-vue';
import ArticleService from '@/services/ArticleService';

const title = ref('');
const content = ref('');
const toast = useToast();

const handleSubmit = async () => {
  const articleData = {
    title: title.value,
    content: content.value,
  };

  try {
    const response = await ArticleService.createArticle(articleData);
    console.log('Article created:', response);
    toast.success("Article published successfully!");
    title.value = ''; 
    content.value = '';
  } catch (error) {
    console.error('Error posting article:', error);
    toast.error("You must be an admin to publish articles!");

  }
};
</script>

<template>
  <div class="container">
    <div class="card">
      <h2>Create Article</h2>
      <div class="form-group">
        <input
          v-model="title"
          type="text"
          placeholder="Enter article title"
          class="title-input"
        />
        <Editor
          api-key="xoh1iamr77mibvs4yhtgbvcpvkmadhu1ed6bgjeac59n747t"
          v-model="content"
          :init="{
            height: '100%',
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
          }"
          class="editor"
        />
        <button @click="handleSubmit" class="submit-button">
          Publish Article
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  width: 80vw;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}

.card {
  width: 100%;
  max-width: 980px;
  height: calc(100vh - 32px);
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 32px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

h2 {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.5rem;
  color: #4c1d95;
  text-align: center;
  margin-bottom: 24px;
  font-weight: 900;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
}

.title-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  color: #1a202c;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.title-input:focus {
  outline: none;
  border-color: #4c1d95;
  box-shadow: 0 0 0 3px rgba(133, 143, 164, 0.2);
}

.title-input::placeholder {
  color: #9ca3af;
  font-style: italic;
}

.editor {
  flex-grow: 1;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}

.tox-tinymce {
  border-radius: 6px;
  border: 1px solid #d1d5db !important;
  height: 100% !important;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #4D0099;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-button:hover {
  background-color: #c022e0;
}

.submit-button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}


@media (max-width: 1024px) {
  .card {
    padding: 24px;
    height: calc(100vh - 48px);
  }

  h2 {
    font-size: 1.75rem;
  }

  .title-input {
    padding: 10px;
  }

  .submit-button {
    padding: 10px;
  }
   .container {
  min-height: 100vh;
  width: 90vw;
  }
}


@media (max-width: 768px) {
  .container {
  min-height: 100vh;
  width: 90vw;
  }
  .card {
    padding: 16px;
    height: calc(100vh - 32px);
    border-radius: 4px;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }

  .title-input {
    padding: 8px;
    font-size: 0.9rem;
  }

  .submit-button {
    padding: 8px;
    font-size: 0.9rem;
  }

  .tox-tinymce {
    min-height: 300px !important;
  }
}
</style>
