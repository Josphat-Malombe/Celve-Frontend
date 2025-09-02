<template>
  <div class="achievements-page">
   
    <header class="hero">
      <h1 class="hero-title">🏆 Your Achievements</h1>
      <p class="hero-subtitle">Keep learning, keep winning!</p>
    </header>

 
    <section class="summary">
      <div class="summary-card" v-for="stat in stats" :key="stat.label">
        <div class="icon">{{ stat.icon }}</div>
        <h3>{{ stat.value }}</h3>
        <p>{{ stat.label }}</p>
      </div>
    </section>


      <section class="badges">
           <h2 class="section-title">🎖️ Badges</h2>
           <div v-if="achievements.courses && achievements.courses.length">
            <div 
            v-for="(course, index) in achievements.courses" :key="index" 
            class="course-badges">
            
            <h3 class="course-title">{{ course.course_name }} Badges</h3>
            
            <div class="badge-grid">
              <div 
              v-for="n in course.modules_total" 
              :key="n" class="module-badge"
              :class="{ unlocked: n <= course.modules_completed, locked: n > course.modules_completed }">
              
              <span class="badge-number">{{ n }}</span>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="empty">No badges earned yet. 🚀</p>
    </section>



  
    <section class="certificates">
      <h2 class="section-title">📜 Certificates</h2>
      <div v-if="achievements.certificates.length" class="certificate-list">
        <div v-for="cert in achievements.certificates" :key="cert.certificate_code" class="certificate-card">
          <div class="certificate-icon">🎓</div>
          <div class="certificate-info">
            <h4>{{ cert.course }}</h4>
            <p>Code: {{ cert.certificate_code }}</p>
            <small>Completed: {{ new Date(cert.date_completed).toLocaleDateString() }}</small>
          </div>
        </div>
      </div>
      <p v-else class="empty">No certificates yet. 🎯</p>
    </section>
  </div>
</template>

<script>
import { fetchAchievements } from '@/services/CourseServices';
export default {
  name: 'AchievementPage',
  data() {
    return {
      achievements: {
        total_points: 0,
        badges_count: 0,
        badges: [],
        certificates_count: 0,
        certificates: [],
        lessons_completed: 0,
        modules_completed: 0,
        courses_enrolled: 0,
        streak_days: 0,
        courses:[],
      },
    };
  },
  computed: {
    stats() {
      return [
        { label: 'Total Points', value: this.achievements.total_points, icon: '⚡' },
        { label: 'Courses Enrolled', value: this.achievements.courses_enrolled, icon: '📘' },
        { label: 'Lessons Completed', value: this.achievements.lessons_completed, icon: '📖' },
        { label: 'Modules Completed', value: this.achievements.modules_completed, icon: '📦' },
        { label: 'Streak Days', value: this.achievements.streak_days, icon: '🔥' },
      ];
    },
  },
  async mounted() {
    try {
      const res = await fetchAchievements();
      this.achievements = res.data;
    } catch (err) {
      console.error(err);
      alert('Failed to load achievements.');
    }
  },
};
</script>

<style scoped>

.achievements-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.hero {
  text-align: center;
  margin-bottom: 40px;
}
.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
}
.hero-subtitle {
  color: #475569;
  margin-top: 6px;
}


.summary {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
}
.summary-card {
  flex: 1 1 160px;
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  color: white;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 8px 18px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}
.summary-card:hover {
  transform: translateY(-5px);
}
.summary-card .icon {
  font-size: 2rem;
  margin-bottom: 10px;
}
.summary-card h3 {
  font-size: 1.8rem;
  margin: 0;
}


.section-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #0f172a;
  font-weight: 700;
}

.course-badges {
  margin-bottom: 20px;
}

.course-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.badge-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.module-badge {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: 2px solid #ccc;
  transition: all 0.3s ease;
}

.module-badge.unlocked {
  background: #4caf50;
  color: #fff;
  border-color: #4caf50;
}

.module-badge.locked {
  background: #eee;
  color: #999;
  border-color: #ccc;
}



.certificate-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.certificate-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  border-left: 6px solid #3b82f6;
  transition: transform 0.2s ease;
}
.certificate-card:hover {
  transform: translateX(5px);
}
.certificate-icon {
  font-size: 2rem;
}
.certificate-info h4 {
  margin: 0;
  font-weight: 600;
}


.empty {
  color: #6b7280;
  font-style: italic;
}
</style>



<!--

achievements span from    total score points collected, number of badges collected,number of certificates so far
,the badge images,the certificate images,total number of lessons done, total modules completed, total number of courses enrolled,streak days,


-->

