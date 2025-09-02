
<template>
  <div class="lessons-container">
    <h2 class="page-title">Lessons</h2>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      Loading lessons...
    </div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="lessons-list">
      <div
        v-for="(lesson, index) in lessons"
        :key="lesson.id"
        class="lesson-card"
        :class="{
          completed: lesson.completed,
          locked: lesson.locked,
          current: !lesson.completed && !lesson.locked
        }"
        tabindex="0"
        role="button"
        @click="handleLessonClick(lesson, index)"
        @keydown.enter="handleLessonClick(lesson, index)"
      >
        <div class="lesson-header">
          <h3 class="lesson-title">
            {{ lesson.title }}
            <span v-if="lesson.completed" class="checkmark">
              <svg class="checkmark-icon" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
          </h3>
          <span v-if="lesson.locked" class="lock-icon">
            <svg viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6v12h12V8zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </span>
        </div>
        <p class="lesson-desc">{{ lesson.description }}</p>
        <div class="lesson-footer">
          <span class="status-text">
            {{ lesson.completed ? 'Completed' : lesson.locked ? 'Locked' : 'Start Learning' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchLessons } from '@/services/CourseServices';
import { useToast } from 'vue-toastification';

export default {
  name: 'Lessons',
  data() {
    return {
      lessons: [],
      loading: false,
      error: null,
      toast: useToast(),
    };
  },
  async mounted() {
    this.loading = true;
    try {
      const res = await fetchLessons(this.$route.params.moduleId);
      this.lessons = this.markLessonLocks(res.data);
    } catch (err) {
      console.error(err);
      this.error = 'Failed to load lessons.';
    } finally {
      this.loading = false;
    }
  },
  methods: {
    markLessonLocks(lessons) {
      lessons.sort((a, b) => a.order - b.order);
      if (lessons.length === 0) return lessons.map(l => ({ ...l, completed: Boolean(l.completed) }));
      lessons = lessons.map(l => ({ ...l, completed: Boolean(l.completed) }));
      lessons[0].locked = false;
      
      for (let i = 1; i < lessons.length; i++) {
        lessons[i].locked = !lessons[i - 1].completed;
      }
      return lessons;
    },
    handleLessonClick(lesson) {
      if (lesson.completed) {
        this.toast.info('Lesson already completed.');
      } else if (lesson.locked) {
        this.toast.warning('Previous lessons not completed.');
      } else {
        const courseId = this.$route.params.courseId || this.$route.params.course_id;
        const moduleId = this.$route.params.moduleId || this.$route.params.module_id;
        if (courseId && moduleId) {
          this.$router.push(`/dashboard/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}`);
        } else {
          this.$router.push({ name: 'Lesson', params: { courseId: this.$route.params.courseId, moduleId: this.$route.params.moduleId, id: lesson.id }});
        }
      }
    }

  }
};
</script>

<style scoped>
.lessons-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f0 100%);
  min-height: 100vh;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeInDown 0.6s ease-out;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #4a5568;
  margin-top: 3rem;
  animation: fadeIn 0.5s ease-out;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #4a5568;
  border-top: 3px solid #3182ce;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.75rem;
}

.error {
  text-align: center;
  font-size: 1.25rem;
  color: #e53e3e;
  margin-top: 3rem;
  animation: shake 0.5s ease-in-out;
}

.lessons-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
}

.lesson-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid transparent;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  animation: cardFadeIn 0.6s ease-out forwards;
  animation-delay: calc(0.1s * var(--index));
  position: relative;
  overflow: hidden;
}

.lesson-card:hover,
.lesson-card:focus {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  outline: none;
}

.lesson-card.locked {
  cursor: not-allowed;
  opacity: 0.7;
  background: #f7fafc;
}

.lesson-card.locked:hover,
.lesson-card.locked:focus {
  transform: none;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.lesson-card.completed {
  border-color: #48bb78;
}

.lesson-card.completed::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(72, 187, 120, 0.2), transparent);
  animation: shimmer 2s infinite;
}

.lesson-card.current {
  border-color: #3182ce;
  animation: pulseBorder 2s infinite;
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.lesson-title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.lesson-card.completed .lesson-title {
  color: #48bb78;
}

.checkmark-icon {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: #48bb78;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  margin-left: 0.5rem;
  animation: drawCheck 0.4s ease-out;
}

.lock-icon {
  width: 20px;
  height: 20px;
  fill: #a0aec0;
  animation: fadeIn 0.4s ease-out;
}

.lesson-desc {
  margin: 0;
  font-size: 0.95rem;
  color: #718096;
  line-height: 1.6;
  max-height: 4.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*-webkit-line-clamp: 3;*/
  -webkit-box-orient: vertical;
}

.lesson-footer {
  margin-top: 1rem;
  text-align: right;
}

.status-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: #3182ce;
  transition: color 0.3s ease;
}

.lesson-card.completed .status-text {
  color: #48bb78;
}

.lesson-card.locked .status-text {
  color: #a0aec0;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  20%, 60% {
    transform: translateX(-10px);
  }
  40%, 80% {
    transform: translateX(10px);
  }
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes pulseBorder {
  0%, 100% {
    border-color: #3182ce;
    box-shadow: 0 0 0 0 rgba(49, 130, 206, 0.3);
  }
  50% {
    border-color: #3182ce;
    box-shadow: 0 0 12px 3px rgba(49, 130, 206, 0.5);
  }
}

@keyframes drawCheck {
  from {
    stroke-dasharray: 30;
    stroke-dashoffset: 30;
  }
  to {
    stroke-dasharray: 30;
    stroke-dashoffset: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}


.lesson-card {
  --index: 0;
}
.lesson-card:nth-child(1) { --index: 1; }
.lesson-card:nth-child(2) { --index: 2; }
.lesson-card:nth-child(3) { --index: 3; }
.lesson-card:nth-child(4) { --index: 4; }
.lesson-card:nth-child(5) { --index: 5; }
.lesson-card:nth-child(6) { --index: 6; }
.lesson-card:nth-child(7) { --index: 7; }
.lesson-card:nth-child(8) { --index: 8; }


@media (max-width: 768px) {
  .lessons-container {
    padding: 1.5rem 0.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .lessons-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .lesson-card {
    padding: 1.25rem;
  }

  .lesson-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }

  .lesson-desc {
    font-size: 0.9rem;
    /*-webkit-line-clamp: 2;*/
    max-height: 3.2rem;
  }
}
</style>