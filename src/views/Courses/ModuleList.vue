
<template>
  <div class="modules-container">
    <h2 class="page-title">Modules</h2>

    <div v-if="loading" class="modules-grid">
        <div v-for="n in 3" :key="n" class="module-card skeleton">
            <div class="card-content">
            <div class="skeleton-title"></div>
            <div class="skeleton-desc"></div>
            <div class="skeleton-progress"></div>
            <div class="skeleton-stats"></div>
        </div>
       <div class="skeleton-btn"></div>
      </div>
     </div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="modules-grid">
      <div v-for="(m, idx) in modules" :key="m.id" class="module-card">
        <div class="card-content">
          <h3 class="module-title">{{ m.title }}</h3>
          <p class="module-desc">{{ m.description }}</p>

       
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{
                width: getCompletionPercent(m) + '%',
                backgroundColor: getProgressColor(getCompletionPercent(m))
              }"
            ></div>
          </div>

        
          <div class="stats">
            <span>
              {{ m.lesson_count > 0
                ? getCompletionPercent(m).toFixed(1) + '% complete'
                : 'No lessons yet'
              }}
            </span>
            <span>{{ m.lesson_count }} lessons</span>
          </div>
        </div>

        <button
          class="start-btn"
          :disabled="isModuleLocked(idx)"
          @click="goToModule(m)"
        >
          {{ isModuleLocked(idx) ? 'Locked' : 'Continue' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchModules } from '@/services/CourseServices';

export default {
  name: 'Modules',
  data() {
    return {
      modules: [],
      loading: false,
      error: null,
    };
  },
  async mounted() {
    this.loading = true;
    try {
      const res = await fetchModules(this.$route.params.id);
      this.modules = res.data;
    } catch (err) {
      console.error(err);
      this.error = 'Failed to load modules.';
    } finally {
      this.loading = false;
    }
  },
  methods: {
    getCompletionPercent(m) {
      if (m.lesson_count === 0) return 0;
      return (m.completed_lessons / m.lesson_count) * 100;
    },
    getProgressColor(percent) {
      if (percent <= 0) return '#ccc';
      if (percent < 40) return '#e74c3c';
      if (percent < 70) return '#f1c40f';
      return '#4caf50';
    },
    isModuleLocked(index) {
     
      if (index === 0) return false;
      const prevModule = this.modules[index - 1];
      return this.getCompletionPercent(prevModule) < 100;
    },
    goToModule(module) {
      this.$router.push({
        name: 'LessonList',
        params: { courseId: this.$route.params.id, moduleId: module.id },
      });
    },
  },
};
</script>


<style scoped>
.modules-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #4D0099;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.125rem;
  color: #555;
}

.error {
  color: #dc3545;
}

.modules-grid {
  display: grid;
  flex-direction: column;
  gap: 1.5rem;
}

.module-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.module-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.module-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.module-desc {
  font-size: 0.875rem;
  color: #555;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.progress-bar {
  background: #f0f0f0;
  border-radius: 4px;
  height: 0.5rem;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.progress-fill {
  height: 100%;
  transition: width 0.4s ease, background-color 0.4s ease;
}

.stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #777;
  margin-bottom: 1rem;
}

.start-btn {
  width: 20%;
  background-color: #4D0099;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.start-btn:hover {
  background-color: #0056b3;
}


.skeleton {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  animation: pulse 1.5s infinite;
}

.skeleton-title {
  width: 60%;
  height: 20px;
  background: #ddd;
  margin-bottom: 12px;
  border-radius: 4px;
}

.skeleton-desc {
  width: 90%;
  height: 14px;
  background: #ddd;
  margin-bottom: 10px;
  border-radius: 4px;
}

.skeleton-progress {
  width: 100%;
  height: 8px;
  background: #ddd;
  border-radius: 4px;
  margin: 8px 0;
}

.skeleton-stats {
  width: 50%;
  height: 14px;
  background: #ddd;
  border-radius: 4px;
  margin-bottom: 12px;
}

.skeleton-btn {
  width: 80px;
  height: 32px;
  background: #ddd;
  border-radius: 16px;
}

@keyframes pulse {
  0% { background-color: #eee; }
  50% { background-color: #ddd; }
  100% { background-color: #eee; }
}


@media (max-width: 768px) {
  .modules-grid {
    grid-template-columns: 1fr;
  }
  .start-btn{
    width: 40%;
  }
}
</style>



