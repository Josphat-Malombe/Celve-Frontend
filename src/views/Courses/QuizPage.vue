<!--

<template>
  <div class="quiz-container" v-if="!loading">
    <h2>{{ lesson.title }} - Quiz</h2>

    <div v-if="!result">
      <div
        v-for="question in lesson.questions"
        :key="question.id"
        class="quiz-question"
      >
        <p class="question-text">{{ question.text }}</p>

        <div class="answers">
          <label
            v-for="answer in question.answers"
            :key="answer.id"
            class="answer-option"
          >
            <input
              :type="question.allow_multiple_answers ? 'checkbox' : 'radio'"
              :name="'question-' + question.id"
              :value="answer.id"
              v-model="answers[question.id]"
            />
            {{ answer.text }}
          </label>
        </div>
      </div>

      <div class="controls">
        <button
          @click="submitQuiz"
          class="submit-btn"
          :disabled="submitDisabled"
        >
          {{ submitDisabled ? 'Submit (blocked)' : 'Submit' }}
        </button>
      </div>

      <div v-if="blocked" class="blocked-card">
        <p>You have reached the maximum attempts. Next attempt in:</p>
        <p class="countdown">{{ countdownDisplay }}</p>
      </div>
    </div>

    <div v-else class="quiz-result">
      <p>Your Score: {{ result.score }} / {{ lesson.questions.length }}</p>
      <p>Percentage: {{ result.percentage }}%</p>

      <div v-if="result.passed" class="pass-section">
        <p class="pass-msg">🎉 Congratulations! You passed.</p>
       
      <button
  v-if="result.next_lesson_id"
  @click="goToNextLesson"
  class="btn next-btn"
>
  Next: {{ result.next_lesson_title || 'Next Lesson' }}
</button>
</div>

      <div v-else class="fail-section">
        <p class="fail-msg">❌ You scored below 75%. Try again.</p>

        <div v-if="result.retry_allowed">
          <router-link
            :to="`/dashboard/lesson/${lessonId}/`"
            class="btn retry-btn"
          >
            Retry Lesson
          </router-link>
        </div>

        <div v-else-if="result.blocked">
          <p>Retry locked. Next attempt in: {{ countdownDisplay }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading">Loading quiz...</div>
</template>

<script>
import { fetchLessonDetail, submitLessonQuiz, fetchLessonProgress } from "@/services/CourseServices";

export default {
  name: "QuizPage",
  data() {
    return {
      lesson: {},
      lessonId: null,
      answers: {},
      result: null,
      loading: true,

      // blocking / countdown
      blocked: false,
      secondsRemaining: 0,
      countdownTimer: null,
    };
  },

  computed: {
    submitDisabled() {
      // disable submit when blocked or already submitted result present
      return this.blocked || !!this.result;
    },

    countdownDisplay() {
      const s = this.secondsRemaining;
      if (!s || s <= 0) return "00:00:00";
      const hrs = Math.floor(s / 3600);
      const mins = Math.floor((s % 3600) / 60);
      const secs = Math.floor(s % 60);
      return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    },
  },

  async created() {
    // tolerate both param names: lessonId or id
    this.lessonId = Number(this.$route.params.lessonId || this.$route.params.id || this.$route.params.lesson_id);

    try {
      const res = await fetchLessonDetail(this.lessonId);
      this.lesson = res.data || {};

      // Initialize answers object for v-model (defensive)
      const qs = Array.isArray(this.lesson.questions) ? this.lesson.questions : (this.lesson.questions || []);
      qs.forEach((q) => {
        this.$set(this.answers, q.id, q.allow_multiple_answers ? [] : null);
      });

      // fetch existing progress so we can show attempts/blocked immediately
      try {
        const progRes = await fetchLessonProgress(this.lessonId);
        const progress = progRes.data || {};
        if (progress.blocked) {
          this.blocked = true;
          this.secondsRemaining = progress.seconds_remaining || progress.secondsRemaining || 0;
          this.startCountdown();
        }
      } catch (err) {
        // It's fine if no progress exists yet (404 or similar). Ignore.
      }
    } catch (err) {
      console.error("Error fetching lesson quiz:", err);
    } finally {
      this.loading = false;
    }
  },

  beforeUnmount() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  },

  methods: {
    startCountdown() {
      if (this.countdownTimer) clearInterval(this.countdownTimer);
      if (!this.secondsRemaining || this.secondsRemaining <= 0) {
        this.blocked = false;
        return;
      }
      this.countdownTimer = setInterval(() => {
        if (this.secondsRemaining > 0) {
          this.secondsRemaining--;
        } else {
          clearInterval(this.countdownTimer);
          this.blocked = false;
          this.countdownTimer = null;
        }
      }, 1000);
    },

    normalizeAnswers(rawAnswers) {
      const normalized = {};
      Object.keys(rawAnswers).forEach((qId) => {
        const val = rawAnswers[qId];
        if (Array.isArray(val)) {
          normalized[qId] = val.map((v) => Number(v));
        } else if (val !== null && val !== undefined && val !== "") {
          normalized[qId] = Number(val);
        } else {
          normalized[qId] = null;
        }
      });
      return normalized;
    },

    async submitQuiz() {
      if (this.submitDisabled) return;
      try {
        const payload = {
          lesson_id: this.lessonId,
          answers: this.normalizeAnswers(this.answers),
        };
        console.log("submitting payload", JSON.stringify(payload, null, 2));
        const { data } = await submitLessonQuiz(payload);

        // If server responds that user is blocked (attempts exhausted), show countdown.
        if (data.blocked) {
          this.blocked = true;
          this.secondsRemaining = data.seconds_remaining || data.secondsRemaining || 0;
          this.startCountdown();
          this.result = null;
          return;
        }

        // Normal result flow
        this.result = data;

        // If user passed, emit and navigate to next lesson (using defensive router build)
        if (data.passed) {
          this.$emit("lessonCompleted", { lessonId: this.lessonId, nextLessonId: data.next_lesson_id });
          // navigate using helper that builds nested route (safe)
          await this.goToNextLesson(data.next_lesson_id);
          return; // early return to avoid showing retry UI
        }

        // If the result says blocked after failing, start countdown too
        if (this.result.blocked) {
          this.blocked = true;
          this.secondsRemaining = this.result.seconds_remaining || 0;
          this.startCountdown();
        }
      } catch (error) {
        const serverData = error.response?.data;
        console.error("Error submitting quiz:", serverData || error);
        // fallback: if server returned unlock_at or similar in 400, compute secondsRemaining
        if (serverData && serverData.unlock_at) {
          const unlock = new Date(serverData.unlock_at);
          const now = new Date();
          const seconds = Math.max(0, Math.floor((unlock - now) / 1000));
          this.blocked = true;
          this.secondsRemaining = seconds;
          this.startCountdown();
        }
      }
    },

    // Option A: resolve nested route on demand and navigate there
    async goToNextLesson(nextId) {
      const nextLessonId = nextId || this.result?.next_lesson_id;
      if (!nextLessonId) return;

      // try to get courseId/moduleId from current route params (several naming styles)
      const courseId = this.$route.params.courseId || this.$route.params.course_id || this.$route.params.courseId;
      const moduleId = this.$route.params.moduleId || this.$route.params.module_id || this.$route.params.moduleId;

      if (courseId && moduleId) {
        // push nested path
        try {
          await this.$router.push(`/dashboard/courses/${courseId}/modules/${moduleId}/lessons/${nextLessonId}`);
          return;
        } catch (err) {
          console.warn("Router push nested path failed, falling back:", err);
        }
      }

      // fallback: fetch lesson detail to discover module/course ids
      try {
        const res = await fetchLessonDetail(nextLessonId);
        const lesson = res.data || {};
        // Attempt to read module/course ids from returned lesson structure (defensive)
        const fetchedModuleId = lesson.module?.id || lesson.module_id || lesson.module;
        const fetchedCourseId =
          lesson.module?.course?.id ||
          lesson.module?.course_id ||
          lesson.course_id ||
          lesson.course?.id ||
          null;

        if (fetchedCourseId && fetchedModuleId) {
          await this.$router.push(`/dashboard/courses/${fetchedCourseId}/modules/${fetchedModuleId}/lessons/${nextLessonId}`);
          return;
        }
      } catch (err) {
        console.warn("Could not fetch next lesson metadata:", err);
      }

      // final fallback: push a simple lesson route (whatever your app accepts)
      await this.$router.push(`/dashboard/`);
    },
  },
};
</script>


<style scoped>
/* same styles as before, plus blocked-card styles */
.blocked-card {
  margin-top: 12px;
  padding: 12px;
  background: #fff4e5;
  border-radius: 6px;
}
.countdown {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
-->



<template>
  <div class="quiz-container" v-if="!loading">
    <h2>{{ lesson.title }} - Quiz</h2>

    <div v-if="!result">
      <div
        v-for="question in lesson.questions"
        :key="question.id"
        class="quiz-question"
      >
        <p class="question-text">{{ question.text }}</p>

        <div class="answers">
          <label
            v-for="answer in question.answers"
            :key="answer.id"
            class="answer-option"
          >
            <input
              :type="question.allow_multiple_answers ? 'checkbox' : 'radio'"
              :name="'question-' + question.id"
              :value="answer.id"
              v-model="answers[question.id]"
            />
            {{ answer.text }}
          </label>
        </div>
      </div>

      <div class="controls">
        <button
          @click="submitQuiz"
          class="submit-btn"
          :disabled="submitDisabled"
        >
          {{ submitDisabled ? 'Submit (blocked)' : 'Submit' }}
        </button>
      </div>

      <div v-if="blocked" class="blocked-card">
        <p>You have reached the maximum attempts. Next attempt in:</p>
        <p class="countdown">{{ countdownDisplay }}</p>
      </div>
    </div>

    <div v-else class="quiz-result">
      <p>Your Score: {{ result.score }} / {{ lesson.questions.length }}</p>
      <p>Percentage: {{ result.percentage }}%</p>

      <div v-if="result.passed" class="pass-section">
        <p class="pass-msg">🎉 Congratulations! You passed.</p>
        <button
          v-if="result.next_lesson_id"
          @click="goToNextLesson"
          class="btn next-btn"
        >
          Next: {{ result.next_lesson_title || 'Next Lesson' }}
        </button>
      </div>

      <div v-else class="fail-section">
        <p class="fail-msg">❌ You scored below 75%. Try again.</p>

        <div v-if="result.retry_allowed">
          <router-link
            @click="retryLesson"
            class="btn retry-btn"
          >
            Retry Lesson
          </router-link>
        </div>

        <div v-else-if="result.blocked">
          <p>Retry locked. Next attempt in: {{ countdownDisplay }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading">Loading quiz...</div>
</template>

<script>
import { fetchLessonDetail, submitLessonQuiz, fetchLessonProgress } from "@/services/CourseServices";
import { useToast } from "vue-toastification";

export default {
  name: "QuizPage",
  data() {
    return {
      lesson: {},
      lessonId: null,
      answers: {},
      result: null,
      loading: true,
      blocked: false,
      secondsRemaining: 0,
      countdownTimer: null,
      toast: useToast(),
    };
  },

  computed: {
    submitDisabled() {
      return this.blocked || !!this.result;
    },

    countdownDisplay() {
      const s = this.secondsRemaining;
      if (!s || s <= 0) return "00:00:00";
      const hrs = Math.floor(s / 3600);
      const mins = Math.floor((s % 3600) / 60);
      const secs = Math.floor(s % 60);
      return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    },
  },

  async created() {
    
    this.lessonId = Number(this.$route.params.lessonId || this.$route.params.id || this.$route.params.lesson_id);

    try {
      const res = await fetchLessonDetail(this.lessonId);
      this.lesson = res.data || {};
      const qs = Array.isArray(this.lesson.questions) ? this.lesson.questions : (this.lesson.questions || []);
      qs.forEach((q) => {
        this.$set(this.answers, q.id, q.allow_multiple_answers ? [] : null);
      });

      try {
        const progRes = await fetchLessonProgress(this.lessonId);
        const progress = progRes.data || {};
        if (progress.blocked) {
          this.blocked = true;
          this.secondsRemaining = progress.seconds_remaining || progress.secondsRemaining || 0;
          this.startCountdown();
        }
      } catch (err) {
     // Ignore.
      }
    } catch (err) {
      console.error("Error fetching lesson quiz:", err);
      this.toast.error(err)
    } finally {
      this.loading = false;
    }
  },

  beforeUnmount() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  },

  methods: {
    retryLesson(){
      this.$router.go()
    },
    startCountdown() {
      if (this.countdownTimer) clearInterval(this.countdownTimer);
      if (!this.secondsRemaining || this.secondsRemaining <= 0) {
        this.blocked = false;
        return;
      }
      this.countdownTimer = setInterval(() => {
        if (this.secondsRemaining > 0) {
          this.secondsRemaining--;
        } else {
          clearInterval(this.countdownTimer);
          this.blocked = false;
          this.countdownTimer = null;
        }
      }, 1000);
    },

    normalizeAnswers(rawAnswers) {
      const normalized = {};
      Object.keys(rawAnswers).forEach((qId) => {
        const val = rawAnswers[qId];
        if (Array.isArray(val)) {
          normalized[qId] = val.map((v) => Number(v));
        } else if (val !== null && val !== undefined && val !== "") {
          normalized[qId] = Number(val);
        } else {
          normalized[qId] = null;
        }
      });
      return normalized;
    },

    async submitQuiz() {
      if (this.submitDisabled) return;
      try {
        const payload = {
          lesson_id: this.lessonId,
          answers: this.normalizeAnswers(this.answers),
        };
        console.log("submitting payload", JSON.stringify(payload, null, 2));
        const { data } = await submitLessonQuiz(payload);

        if (data.blocked) {
          this.blocked = true;
          this.secondsRemaining = data.seconds_remaining || data.secondsRemaining || 0;
          this.startCountdown();
          this.result = null;
          return;
        }

 
        this.result = data;

 
        if (data.passed) {
          this.$emit("lessonCompleted", { lessonId: this.lessonId, nextLessonId: data.next_lesson_id });
          await this.goToNextLesson(data.next_lesson_id);
          return; 
        }

     
        if (this.result.blocked) {
          this.blocked = true;
          this.secondsRemaining = this.result.seconds_remaining || 0;
          this.startCountdown();
        }
      } catch (error) {
        const serverData = error.response?.data;
        console.error("Error submitting quiz:", serverData || error);
        
        if (serverData && serverData.unlock_at) {
          const unlock = new Date(serverData.unlock_at);
          const now = new Date();
          const seconds = Math.max(0, Math.floor((unlock - now) / 1000));
          this.blocked = true;
          this.secondsRemaining = seconds;
          this.startCountdown();
        }
      }
    },

   
    async goToNextLesson(nextId) {
      const nextLessonId = nextId || this.result?.next_lesson_id;
      if (!nextLessonId) return;

      
      const courseId = this.$route.params.courseId || this.$route.params.course_id || this.$route.params.courseId;
      const moduleId = this.$route.params.moduleId || this.$route.params.module_id || this.$route.params.moduleId;

      if (courseId && moduleId) {
      
        try {
          await this.$router.push(`/dashboard/courses/${courseId}/modules/${moduleId}/lessons/${nextLessonId}`);
          return;
        } catch (err) {
          console.warn("Router push nested path failed, falling back:", err);
        }
      }

      
      try {
        const res = await fetchLessonDetail(nextLessonId);
        const lesson = res.data || {};
        
        const fetchedModuleId = lesson.module?.id || lesson.module_id || lesson.module;
        const fetchedCourseId =
          lesson.module?.course?.id ||
          lesson.module?.course_id ||
          lesson.course_id ||
          lesson.course?.id ||
          null;

        if (fetchedCourseId && fetchedModuleId) {
          await this.$router.push(`/dashboard/courses/${fetchedCourseId}/modules/${fetchedModuleId}/lessons/${nextLessonId}`);
          return;
        }
      } catch (err) {
        console.warn("Could not fetch next lesson metadata:", err);
      }

      
      await this.$router.push(`/dashboard/`);
    },
  },
};
</script>

<style scoped>

.quiz-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}


.quiz-container h2 {
  font-size: 2rem;
  color: #1a202c;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}


.quiz-question {
  background: #ffffff;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.quiz-question:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.question-text {
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 1rem;
  font-weight: 500;
}


.answers {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.answer-option {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.answer-option:hover {
  background: #edf2f7;
  border-color: #4a5568;
}

.answer-option input {
  margin-right: 0.75rem;
  accent-color: #4a5568;
}

.controls {
  text-align: center;
  margin-top: 2rem;
}

.submit-btn {
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #4a5568 0%, #2d3748 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(90deg, #5a6b8c 0%, #3b4a6b 100%);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

.blocked-card {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #fefcbf;
  border-radius: 12px;
  text-align: center;
  color: #744210;
}

.countdown {
  font-size: 1.5rem;
  font-weight: 600;
  color: #975a16;
}
.quiz-result {
  text-align: center;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.quiz-result p {
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 1rem;
}


.pass-section {
  margin-top: 1.5rem;
}

.pass-msg {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2f855a;
}

.next-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #38a169 0%, #2f855a 100%);
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s ease;
}

.next-btn:hover {
  background: linear-gradient(90deg, #4ab680 0%, #3b9e6f 100%);
  transform: translateY(-2px);
}

.fail-section {
  margin-top: 1.5rem;
}

.fail-msg {
  font-size: 1.5rem;
  font-weight: 600;
  color: #c53030;
}

.retry-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #e53e3e 0%, #c53030 100%);
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s ease;
}

.retry-btn:hover {
  background: linear-gradient(90deg, #f56565 0%, #e53e3e 100%);
  transform: translateY(-2px);
}

.loading {
  text-align: center;
  font-size: 1.25rem;
  color: #4a5568;
  padding: 2rem;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .quiz-container {
    margin: 1rem;
    padding: 1.5rem;
  }

  .quiz-container h2 {
    font-size: 1.5rem;
  }

  .question-text {
    font-size: 1.1rem;
  }

  .submit-btn,
  .next-btn,
  .retry-btn {
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
