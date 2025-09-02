<!--
<template>
  <div class="lesson-background">
    <main class="lesson-container">
      <header class="lesson-header">
        <h1 class="lesson-title">{{ lesson.title }}</h1>
        <p class="lesson-duration">
          <svg class="icon" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clip-rule="evenodd" />
          </svg>
          <span class="duration-text">Estimated Duration:</span> {{ lesson.estimated_duration }}
        </p>
      </header>

      <section class="lesson-content">
        <div class="lesson-text-block" v-html="lesson.content_text"></div>

        <div class="lesson-media-section">
          <div v-if="lesson.infographic" class="media-card infographic-card">
            <h3 class="media-title">Infographic: Key Concepts</h3>
            <img :src="lesson.infographic" alt="Infographic" class="media-img" />
          </div>

          <div v-if="lesson.video_url" class="media-card video-card">
            <h3 class="media-title">Video: Deep Dive</h3>
            <div class="video-wrapper">
              <iframe
                :src="getEmbeddedVideoUrl(lesson.video_url)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <footer class="lesson-footer">
        <router-link :to="{name: 'QuizPage'}" class="quiz-button">Lesson Quiz</router-link>
        
      </footer>
    </main>
  </div>
</template>
<script>

 import { fetchLessonDetail } from '@/services/CourseServices';

export default {
  data() {
    return {
      lesson: { },
      error: null,
    };
  },
  methods: {
    async loadLesson() {
      try {
       const lessonId = this.$route.params.id;
       const data = await fetchLessonDetail(lessonId);
        this.lesson = data.data;
      } catch (err) {
        this.error = 'Failed to load lesson data.';
        console.error(err);
      }
     },
   getEmbeddedVideoUrl(url) {
     
      if (!url) return '';
      const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^?&]+)/);
      if (videoIdMatch) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
      }
      return url;
    },
  },
   created() {
     this.loadLesson();
   },
};
</script>

<style scoped>

:root {
  --background-color: #f8fafc;
  --card-background: #ffffff;
  --primary-text: #1e293b;
  --secondary-text: #475569;
  --accent-color: #2563eb;
  --card-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
  --border-color: #e2e8f0;
}

body {
  font-family: 'Inter', sans-serif;
}

.lesson-background {
  background-color: var(--background-color);
  min-height: 100vh;
  padding: 3rem 1rem;
}

.lesson-container {
  max-width: 900px;
  margin: 0 auto;
  background-color: var(--card-background);
  border-radius: 1.5rem;
  box-shadow: var(--card-shadow);
  padding: 3rem;
  transition: box-shadow 0.3s ease;
}


.lesson-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.lesson-title {
  font-size: 2.75rem;
  font-weight: 700;
  color: var(--primary-text);
  line-height: 1.2;
  letter-spacing: -0.025em;
  margin-bottom: 0.5rem;
}

.lesson-duration {
  font-size: 1rem;
  color: var(--secondary-text);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.lesson-duration .icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--accent-color);
}

.duration-text {
  font-weight: 600;
  color: var(--primary-text);
}


.lesson-content {
  font-size: 1.1rem;
  line-height: 1.75;
  color: var(--secondary-text);
}

.lesson-text-block :deep(h2) {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--primary-text);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.lesson-text-block :deep(p) {
  margin-bottom: 1.5rem;
}

.lesson-media-section {
  display: grid;
  gap: 2rem;
  margin-top: 3rem;

}

.media-card {
  padding: 2rem;
  background-color: var(--background-color);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  text-align: center;
}

.media-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: 1.5rem;
}


.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; 
  height: 0;
  overflow: hidden;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}


.media-img {
  max-width: 100%;
  height: auto;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
}


.lesson-footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.quiz-button {
  display: inline-block;
  background-color: var(--accent-color);
  color: #4D0099;
  font-weight: 700;
  padding: 0.85rem 2.5rem;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.2), 0 4px 6px -2px rgba(37, 99, 235, 0.1);
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
}

.quiz-button:hover {
  background-color: #9aa6c9;
  transform: translateY(-2px) scale(1.02);
}


@media (max-width: 768px) {
  .lesson-container {
    padding: 2rem 1.5rem;
  }
  .lesson-title {
    font-size: 2rem;
  }
}
</style>
-->

<template>
  <div class="lesson-background">
    <main class="lesson-container">
    
      <div v-if="loading" class="skeleton">
        <div class="skeleton-title"></div>
        <div class="skeleton-duration"></div>
        <div class="skeleton-paragraph" v-for="n in 3" :key="n"></div>
        <div class="skeleton-media"></div>
      </div>

      <div v-else-if="error" class="error-block">
        <p>{{ error }}</p>
        <button @click="loadLesson" class="retry-btn">Retry</button>
      </div>


      <div v-else>
        <header class="lesson-header">
          <h1 class="lesson-title">{{ lesson.title }}</h1>
          <p class="lesson-duration">
            <svg
              class="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="duration-text">Estimated Duration:</span>
            {{ lesson.estimated_duration }}
          </p>
        </header>

        <section class="lesson-content">
          <div
            class="lesson-text-block"
            v-html="sanitizedContent"
          ></div>

          <div class="lesson-media-section">
            <div
              v-if="lesson.infographic"
              class="media-card infographic-card"
            >
              <h3 class="media-title">Infographic: Key Concepts</h3>
              <img
                :src="lesson.infographic"
                alt="Infographic of key concepts"
                class="media-img"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div
              v-if="lesson.video_url"
              class="media-card video-card"
            >
              <h3 class="media-title">Video: Deep Dive</h3>
              <div class="video-wrapper">
                <iframe
                  :src="getEmbeddedVideoUrl(lesson.video_url)"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
                  title="Lesson video"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        <footer class="lesson-footer">
          <router-link
            v-if="canTakeQuiz"
            :to="{ name: 'QuizPage', params: { lessonId: $route.params.id } }"
            class="quiz-button"
          >
            Lesson Quiz
          </router-link>
          <button v-else class="quiz-button disabled" disabled>
            Quiz Locked ⏳
          </button>
        </footer>
      </div>
    </main>
  </div>
</template>

<script>
import { fetchLessonDetail } from '@/services/CourseServices';
import DOMPurify from 'dompurify';

export default {
  data() {
    return {
      lesson: {},
      error: null,
      loading: true,
      elapsedTime: 0,
      timer: null,
    };
  },
  computed: {
    sanitizedContent() {
      return this.lesson.content_text
        ? DOMPurify.sanitize(this.lesson.content_text)
        : '';
    },
    canTakeQuiz() {
      const totalMinutes = this.parseDuration(this.lesson.estimated_duration);
      return totalMinutes > 0 && this.elapsedTime >= totalMinutes / 2;
    },
  },
  methods: {
    async loadLesson() {
      this.loading = true;
      this.error = null;
      try {
        const lessonId = this.$route.params.id;
        const data = await fetchLessonDetail(lessonId);
        this.lesson = data.data;
        this.startTimer();
      } catch (err) {
        this.error = 'Failed to load lesson data.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    getEmbeddedVideoUrl(url) {
      if (!url) return '';
      const patterns = [
        /youtu\.be\/([^?&/]+)/,
        /youtube\.com\/watch\?v=([^?&]+)/,
        /youtube\.com\/embed\/([^?&/]+)/,
        /youtube\.com\/shorts\/([^?&/]+)/,
      ];
      for (const re of patterns) {
        const m = url.match(re);
        if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}`;
      }
      return url;
    },
    parseDuration(str) {
      if (!str) return 0;
      const h = /(\d+)\s*h/.exec(str);
      const m = /(\d+)\s*m/.exec(str);
      const hours = h ? parseInt(h[1]) : 0;
      const mins = m ? parseInt(m[1]) : 0;
      return hours * 60 + mins;
    },
    startTimer() {
      this.elapsedTime = 0;
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.elapsedTime++;
      }, 60000); 
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadLesson();
      },
    },
  },
  created() {
    this.loadLesson();
  },
  beforeUnmount() {
    if (this.timer) clearInterval(this.timer);
  },
};
</script>

<style scoped>


:root {
  --background-color: #f8fafc;
  --card-background: #ffffff;
  --primary-text: #1e293b;
  --secondary-text: #475569;
  --accent-color: #2563eb;
  --card-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
  --border-color: #e2e8f0;
}

body {
  font-family: 'Inter', sans-serif;
}

.lesson-background {
  background-color: var(--background-color);
  min-height: 100vh;
  padding: 3rem 1rem;
}

.lesson-container {
  max-width: 900px;
  margin: 0 auto;
  background-color: var(--card-background);
  border-radius: 1.5rem;
  box-shadow: var(--card-shadow);
  padding: 3rem;
  transition: box-shadow 0.3s ease;
}


.lesson-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.lesson-title {
  font-size: 2.75rem;
  font-weight: 700;
  color: var(--primary-text);
  line-height: 1.2;
  letter-spacing: -0.025em;
  margin-bottom: 0.5rem;
}

.lesson-duration {
  font-size: 1rem;
  color: var(--secondary-text);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.lesson-duration .icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--accent-color);
}

.duration-text {
  font-weight: 600;
  color: var(--primary-text);
}


.lesson-content {
  font-size: 1.1rem;
  line-height: 1.75;
  color: var(--secondary-text);
}

.lesson-text-block :deep(h2) {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--primary-text);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.lesson-text-block :deep(p) {
  margin-bottom: 1.5rem;
}

.lesson-media-section {
  display: grid;
  gap: 2rem;
  margin-top: 3rem;

}

.media-card {
  padding: 2rem;
  background-color: var(--background-color);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  text-align: center;
}

.media-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-text);
  margin-bottom: 1.5rem;
}


.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; 
  height: 0;
  overflow: hidden;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}


.media-img {
  max-width: 100%;
  height: auto;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
}


.lesson-footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.quiz-button {
  display: inline-block;
  background-color: var(--accent-color);
  color: #4D0099;
  font-weight: 700;
  padding: 0.85rem 2.5rem;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.2), 0 4px 6px -2px rgba(37, 99, 235, 0.1);
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
}

.quiz-button:hover {
  background-color: #9aa6c9;
  transform: translateY(-2px) scale(1.02);
}


@media (max-width: 768px) {
  .lesson-container {
    padding: 2rem 1.5rem;
  }
  .lesson-title {
    font-size: 2rem;
  }
}

.skeleton {
  display: grid;
  gap: 1rem;
}
.skeleton-title,
.skeleton-duration,
.skeleton-paragraph,
.skeleton-media {
  background: #e2e8f0;
  border-radius: 0.5rem;
  animation: pulse 1.5s infinite ease-in-out;
}
.skeleton-title {
  height: 2.5rem;
  width: 70%;
  margin: 0 auto;
}
.skeleton-duration {
  height: 1rem;
  width: 40%;
  margin: 0 auto;
}
.skeleton-paragraph {
  height: 1rem;
  width: 100%;
}
.skeleton-media {
  height: 200px;
  width: 100%;
}
@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
.error-block {
  text-align: center;
  color: #dc2626;
}
.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border-radius: 0.5rem;
}
.quiz-button.disabled {
  background-color: #cbd5e1;
  color: #475569;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
