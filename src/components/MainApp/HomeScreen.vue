<template>
  <div class="dashboard">
    <div v-if="loading" class="skeleton-wrapper">
      <div v-for="n in 3" :key="n" class="skeleton-card">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-progress"></div>
      </div>
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="enrolledCourses?.length > 0" class="welcome-enrolled">
      <h1>Welcome back, {{ firstName }}!</h1>
      <p>Pick up right where you left off and continue your learning adventure!</p>

      <div class="courses-list">
        <div
          v-for="course in enrolledCourses"
          :key="course.course_id"
          class="course-card"
        >
          <h2>{{ course.course_title }}</h2>
          <p>Enrolled at: {{ formatDate(course.enrolled_at) }}</p>

     
          <p>
            Progress:
            {{ calculateCourseProgress(course) }}%
            <span class="progress-stats">
              ({{ getCompletedModules(course) }}/{{ getTotalModules(course) }} modules)
            </span>
          </p>

          <div class="progress-bar">
            <div :style="{ width: calculateCourseProgress(course) + '%' }"></div>
          </div>

          <div v-if="course.modules?.length > 0" class="module-info">
            <p>
              Current Module:
              <span v-if="calculateCourseProgress(course) < 100">
                {{ getCurrentModule(course)?.title || 'No active module' }}
              </span>
              <span v-else>
                All modules completed!
              </span>
            </p>

            <RouterLink
              v-if="calculateCourseProgress(course) < 100 && getCurrentModule(course)"
              :to="{ name: 'Modules', params: { id: course.course_id } }"
              class="continue-link"
            >
              Continue Learning
            </RouterLink>

            <span v-else class="completed-badge">
              ✅ Course Completed
            </span>
          </div>
        </div>
      </div>
    </div>

   
    <div v-else class="welcome-new">
      <h1>Welcome to Your Learning Journey!</h1>
      <p>Embark on a new adventure by enrolling in a course today.</p>
      <RouterLink to="/dashboard/courses" class="enroll-btn">
        Discover Courses
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { fetchEnrolledCourses } from '@/services/CourseServices';
import { getProfile } from '@/services/AuthService';

export default {
  name: 'Dashboard',
  data() {
    return {
      username: '',
      enrolledCourses: [],
      loading: false,
      error: null,
      firstName: ''
    };
  },
  methods: {
    async getEnrolledCourses() {
      this.loading = true;
      try {
        const res = await fetchEnrolledCourses();
        this.enrolledCourses = res.data || [];
      } catch (err) {
        this.error = 'Failed to load your courses.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return dateStr ? new Date(dateStr).toLocaleDateString(undefined, options) : '';
    },
    getTotalModules(course) {
      return course.modules?.length || 0;
    },
    getCompletedModules(course) {
  if (!course.modules?.length) return 0;
  return course.modules.filter(m => {
    const total = Number(m.lesson_count || 0);
    const done = Number(m.completed_lessons || 0);
    return total === 0 || done >= total;
  }).length;
},
    calculateCourseProgress(course) {
      const totalModules = this.getTotalModules(course);
      return totalModules === 0
        ? 0
        : Math.round((this.getCompletedModules(course) / totalModules) * 100);
    },
    
    getSortedModules(course) {
  const mods = [...(course.modules || [])];
  mods.sort((a, b) => {
    const ao = Number(a.order ?? a.position ?? a.seq ?? a.id);
    const bo = Number(b.order ?? b.position ?? b.seq ?? b.id);
    return ao - bo;
  });
  return mods;
},
    getCurrentModule(course) {
  const mods = this.getSortedModules(course);
  if (!mods.length) return null;

  const isComplete = (m) => {
    const total = Number(m.lesson_count || 0);
    const done  = Number(m.completed_lessons || 0);
    return total === 0 || done >= total;
  };

  for (let i = 0; i < mods.length; i++) {
    const m = mods[i];
   
    if (i === 0) {
      if (!isComplete(m)) return m;
      continue;
    }
    
    if (isComplete(mods[i - 1]) && !isComplete(m)) return m;
  }

 
  return null;
},
  },
  async mounted() {
    try {
      const response = await getProfile();
      this.username = response.data.username;
      const nameParts = this.username.split(/[\s-_]+/);
      this.firstName = nameParts.length > 0 ? nameParts[0] : this.username;
    } catch (err) {
      console.error('Error fetching profile:', err);
    }

    this.getEnrolledCourses();
  }
};
</script>




<style scoped>

.dashboard {
  max-width: 920px;
  border-radius: 1rem;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2d3748;
  /*background: linear-gradient(135deg, #e0e7ff 0%, #e9d5ff 100%);*/
  background: #f8f9fa;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.completed-badge {
  display: inline-block;
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  font-weight: bold;
}
.locked-badge {
  display: inline-block;
  padding: 5px 10px;
  background-color: #f1c40f;
  color: #333;
  border-radius: 4px;
  font-weight: 600;
}



.dashboard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.2), transparent 70%);
  animation: pulse 10s infinite ease-in-out;
  z-index: -1;
}


.loading {
  text-align: center;
  padding: 4rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: #4c1d95;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  animation: fadeIn 0.5s ease-in;
}


.error {
  text-align: center;
  padding: 2rem;
  color: #7f1d1d;
  background-color: #fee2e2;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  max-width: 500px;
  margin: 2rem auto;
}


.welcome-enrolled {
  text-align: center;
  animation: slideIn 0.6s ease-out;
}

.welcome-enrolled h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #4c1d95;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.welcome-enrolled p {
  font-size: 1.25rem;
  color: #475569;
  margin-bottom: 2.5rem;
  font-weight: 400;
}


.courses-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}


.course-card {
  background: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.course-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.course-card h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #4c1d95;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.course-card p {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.progress-stats {
  font-size: 0.85rem;
  color: #9ca3af;
}


.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin: 0.75rem 0;
}

.progress-bar div {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #4c1d95);
  transition: width 0.5s ease;
}

.module-info {
  margin-top: 1rem;
}

.module-info p {
  font-size: 0.95rem;
  color: #6b7280;
}

.continue-link {
  display: inline-flex;
  align-items: center;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(90deg, #7c3aed, #4c1d95);
  color: #ffffff;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.continue-link:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.welcome-new {
  text-align: center;
  padding: 4rem 2rem;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  max-width: 920px;
  margin: 3rem auto;
  animation: slideIn 0.6s ease-out;
}

.welcome-new h1 {
  font-size: 2.75rem;
  font-weight: 700;
  color: #4c1d95;
  margin-bottom: 1.25rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.welcome-new p {
  font-size: 1.25rem;
  color: #475569;
  margin-bottom: 2rem;
}

.enroll-btn {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #7c3aed, #4c1d95);
  color: #ffffff;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.enroll-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
.skeleton-wrapper {
  display: grid;
  gap: 1rem;
}

.skeleton-card {
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.skeleton {
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-title {
  height: 20px;
  width: 60%;
  margin-bottom: 0.5rem;
}

.skeleton-text {
  height: 14px;
  width: 80%;
  margin-bottom: 0.5rem;
}

.skeleton-progress {
  height: 10px;
  width: 100%;
  border-radius: 10px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.5; }
  100% { transform: scale(1); opacity: 0.3; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}


@media (max-width: 768px) {
  .dashboard {
    padding: 1.5rem;
  }

  .welcome-enrolled h1,
  .welcome-new h1 {
    font-size: 2rem;
  }

  .welcome-enrolled p,
  .welcome-new p {
    font-size: 1rem;
  }

  .courses-list {
    grid-template-columns: 1fr;
  }

  .course-card {
    padding: 1.5rem;
  }

  .welcome-new {
    padding: 2rem;
    margin: 2rem 1rem;
  }
}

@media (max-width: 480px) {
  .welcome-enrolled h1,
  .welcome-new h1 {
    font-size: 1.75rem;
  }

  .enroll-btn,
  .continue-link {
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
  }
}
</style>