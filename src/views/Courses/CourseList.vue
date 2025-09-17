
<template>
  <section id="article-post" aria-labelledby="article-heading">
    <div class="article-section">

     
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search courses..."
        class="search-bar"
      />

    
      <div v-if="loading" class="loading">Loading courses...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="filteredCourses.length === 0" class="no-articles">No courses found.</div>

      <div v-else class="article-list">
        <article
          v-for="course in filteredCourses"
          :key="course.id"
          class="article-entry"
          role="article"
        >
          <h2 class="title">{{ course.title }}</h2>
          <p class="date">Published on {{ formatDate(course.created_at) }}</p>
          <ul class="roles-list">
         <li v-for="role in course.roles" :key="role.id" class="role-item">{{ role.name }}</li>
         
         </ul>

          

          <button
              :disabled="enrollingId === course.id"
              @click="handleEnrollment(course.id)"
              class="enroll-button"
                >
              <span v-if="enrollingId === course.id">Enrolling...</span>
             <span v-else>Enroll Now</span>
         </button>

          
          <button @click="toggleDetails(course.id)" class="details-button">
            {{ expandedCourses.has(course.id) ? 'Hide Details' : 'View Details' }}
          </button>
          <div v-if="expandedCourses.has(course.id)" class="course-details">
            <p class="modules">Total Modules: {{ course.total_modules }}</p>
            <p class="lessons">Total Lessons: {{ course.total_lessons }}</p>
            <p class="description">{{ course.description }}</p>
            
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchCourses } from '@/services/CourseServices';
import { enrollCourse } from '@/services/CourseServices';
import { useToast } from 'vue-toastification';



export default {
  name: 'Courses',
  data() {
    return {
      toast: useToast(),
      courses: [],
      loading: false,
      error: null,
      searchTerm: '',
      expandedCourses: new Set(),
      enrollingId:null,
    };
  },
  computed: {
    filteredCourses() {
      const term = this.searchTerm.trim().toLowerCase();
      return this.courses.filter(course =>
        course.title.toLowerCase().includes(term)
      );
    },
  },
  methods: {
    async getCourses() {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetchCourses();
        this.courses = Array.isArray(res.data) ? res.data : res.data.results;
      } catch (err) {
        this.error = 'Failed to load courses. Please try again later.';
        console.error('Error fetching courses:', err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    toggleDetails(id) {
      if (this.expandedCourses.has(id)) {
        this.expandedCourses.delete(id);
      } else {
        this.expandedCourses.add(id);
      }
    },

    async handleEnrollment(courseId) {
        this.enrollingId = courseId;
        try {
          const res = await enrollCourse(courseId);
          this.toast.success(res.data.detail || "Enrollment successful!");
          this.$router.push(`courses/${courseId}/modules`);
        } catch (err) {
          console.error("Enrollment error:", err.response?.data || err);
          let errorMsg = err.response?.data?.detail || "Something went wrong while enrolling.";
          if (!errorMsg && err.response?.data) {
             const firstError = Object.values(err.response.data)[0];
             errorMsg = Array.isArray(firstError) ? firstError[0] : firstError;
            }
          this.toast.error(errorMsg);
        } finally {
          this.enrollingId = null;
        }
      }

  },
  mounted() {
    this.getCourses();
  },
};
</script>

<style scoped>
.article-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.search-bar {
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 920px;
 
}

.search-bar:focus {
  outline: none;
  border-color: #4c1d95;
  box-shadow: 0 0 0 3px rgba(184, 139, 184, 0.25);
}

.article-list {
  display: grid;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 920px;
  margin:auto;
  
}

.article-entry {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(186, 6, 231, 0.05);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.article-entry:hover {
  box-shadow: 0 6px 12px rgba(180, 10, 223, 0.1);
  transform: translateY(-2px);
}
.roles-list {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.role-item {
  background:  #4D0099;
  color: #fff;
  padding: 0.3rem 0.75rem;
  border-radius: 5px; 
  font-size: 0.85rem;
  font-weight: 500;
}

.title {
  grid-column: 1 / 4;
  grid-row: 1;
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.date {
  grid-column: 1;
  grid-row: 2;
  font-size: 0.875rem;
  color: #777;
  margin: 0;
}

.enroll-button {
  grid-column: 2;
  grid-row: 2;
  align-self: center;
  background-color: #4D0099;
  color: #fff;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.enroll-button:hover {
  background-color: #0056b3;
}

.details-button {
  grid-column: 3;
  grid-row: 2;
  align-self: center;
  background-color: #6c757d;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.details-button:hover {
  background-color: #5a6268;
}

.course-details {
  grid-column: 1 / 4;
  grid-row: 3;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.description {
  font-size: 1rem;
  color: #555;
  margin: 0 0 0.5rem 0;
}

.modules,
.lessons {
  font-size: 0.875rem;
  color: #777;
  margin: 0;
}

.loading,
.error,
.no-articles {
  text-align: center;
  padding: 2rem;
  font-size: 1.125rem;
  color: #555;
}

.error {
  color: #dc3545;
}

@media (max-width: 768px) {
  .article-entry {
    grid-template-columns: 1fr auto;
    gap: 0.5rem;
  }

  .title {
    grid-column: 1 / 3;
    grid-row: 1;
    margin: 0 0 0.5rem 0;
  }

  .date {
    grid-column: 1;
    grid-row: 2;
    align-self: center;
  }

  .enroll-button {
    grid-column: 2;
    grid-row: 2;
    align-self: center;
    margin-top: 0;
  }

  .details-button {
    grid-column: 1 / 3;
    grid-row: 3;
    margin-top: 1rem;
  }

  .course-details {
    grid-column: 1 / 3;
    grid-row: 4;
  }
}
</style>