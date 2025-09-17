<template>
  <div class="misinfo-container">
    <h2 class="title">Misinformation Analyzer</h2>

    <textarea
      v-model="text"
      placeholder="Enter text to analyze..."
      class="textarea"
    ></textarea>

    <input type="file" @change="handleImage" class="file-input" />

    
    <button
      @click="submitCheck"
      :disabled="loading"
      class="submit-btn"
    >
      {{ loading ? "Analyzing..." : "Analyze Misinformation" }}
    </button>

   
    <div v-if="result" class="result-box">
      <h3 class="result-title">Verdict: {{ result.verdict }}</h3>
      <p class="result-text"><strong>Confidence:</strong> {{ result.confidence }}%</p>
      <p class="result-text"><strong>Explanation:</strong> {{ result.explanation }}</p>
    </div>

    <div v-if="error" class="error-box">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { checkMisinformation } from '@/services/kyl';

export default {
  name: "MisinformationCheck",
  data() {
    return {
      text: "",
      image: null,
      result: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    handleImage(e) {
      this.image = e.target.files[0];
    },
    async submitCheck() {
      this.error = null;
      this.result = null;
      this.loading = true;

      try {
        const formData = new FormData();
        if (this.text) formData.append("text", this.text);
        if (this.image) formData.append("image", this.image);

        const { data } = await checkMisinformation(formData);
        this.result = data;
      } catch (err) {
        this.error = err.response?.data?.error || "Something went wrong!";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.misinfo-container {
  max-width: 920px;
  margin: 0px auto;
  margin-top: 50px;
  padding: 24px;
  height: 85vh;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.misinfo-container:hover {
  transform: translateY(-4px);
}

.title {
  font-size: 2rem;
  font-weight: 700;
  background-color: #4c1d95;
  text-align: center;
  margin-bottom: 50px;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.textarea {
  width: 100%;
  height: 120px;
  padding: 12px;
  background: #ffffff;
  color: #06193b;
  border: 1px solid #4c1d95;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.textarea:focus {
  border-color:  #4D0099;
  box-shadow: 0 0 8px rgba(99, 179, 237, 0.5);
}

.textarea::placeholder {
  color: #83868a;
}

.file-input {
  display: block;
  width: 100%;
  margin: 16px 0;
  color: #212224;
  font-size: 0.9rem;
}

.file-input::-webkit-file-upload-button {
  padding: 8px 16px;
  background:  #4D0099;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.file-input::-webkit-file-upload-button:hover {
  background: #c022e0;
}

.submit-btn {
  width: 100%;
  padding: 12px 24px;
  background: linear-gradient(to right, #4c1d95,  #4D0099);
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background: #c022e0;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background: #718096;
  cursor: not-allowed;
  transform: none;
}

.result-box {
  margin-top: 24px;
  padding: 16px;
  background: rgba(45, 55, 72, 0.7);
  border: 1px solid #4a5568;
  border-radius: 8px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
}

.result-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #68d391;
  margin-bottom: 12px;
}

.result-text {
  color: #e2e8f0;
  font-size: 1rem;
  margin-bottom: 8px;
}

.error-box {
  margin-top: 24px;
  padding: 16px;
  background: rgba(229, 62, 62, 0.2);
  border: 1px solid #c53030;
  border-radius: 8px;
  color: #feb2b2;
  font-size: 1rem;
}
</style>