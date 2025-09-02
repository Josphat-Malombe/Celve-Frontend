<template>
  <div class="profile-page">
    <div class="profile-header">
      <div class="avatar-wrap">
        <img
          v-if="profile.profile_picture"
          :src="profile.profile_picture"
          alt="Profile picture"
          class="avatar"
        />
        <div v-else class="avatar placeholder">No Pic</div>

        <label for="upload" class="edit-badge" title="Change photo">Edit</label>
        <input id="upload" type="file" accept="image/*" class="hidden" @change="handleFileUpload" />
      </div>

      <div class="user-meta">
        <h2 class="title">{{ profile.username || '...' }}</h2>
        <p class="subtext">{{ profile.email || '...' }}</p>
      </div>
    </div>

   
    <p v-if="loading" class="status">Loading…</p>
    <p v-if="error" class="status error">{{ error }}</p>


    <section class="courses">
      <h3 class="section-title">Your Courses</h3>
      <ul v-if="enrolledCourses.length" class="course-list">
        <li v-for="course in enrolledCourses" :key="course.id" class="course-item">
          <div class="course-dot" aria-hidden="true"></div>
          <span class="course-title">{{ course.course_title }}</span>
        </li>
      </ul>
      <p v-else class="empty">No courses enrolled yet.</p>
    </section>
  </div>
</template>

<script>
import { fetchEnrolledCourses } from '@/services/CourseServices'
import { getProfile, uploadProfilePicture } from '@/services/AuthService'

export default {
  name: 'ProfilePage',
  data() {
    return {
      profile: {
        username: '',
        email: '',
        profile_picture: ''
      },
      enrolledCourses: [],
      loading: false,
      error: null
    }
  },
  methods: {
    async loadProfile() {
      try {
        const res = await getProfile()
        this.profile = res.data || {}
      } catch (err) {
        console.error(err)
        this.error = 'Failed to load profile.'
      }
    },
    async getEnrolledCourses() {
      try {
        const res = await fetchEnrolledCourses()
        this.enrolledCourses = res.data || []
      } catch (err) {
        console.error(err)
        this.error = 'Failed to load your courses.'
      }
    },
    async handleFileUpload(e) {
      const file = e.target.files && e.target.files[0]
      if (!file) return
      const maxMB = 3
      if (file.size > maxMB * 1024 * 1024) {
        alert(`Image too large. Please upload a file under ${maxMB}MB.`)
        return
      }

      try {
        this.loading = true
        const formData = new FormData()
        formData.append('profile_picture', file)
        const res = await uploadProfilePicture(formData)
        this.profile.profile_picture = res.data.profile_picture
      } catch (err) {
        console.error(err)
        alert('Failed to upload picture.')
      } finally {
        this.loading = false
        e.target.value = ''
      }
    }
  },
  async mounted() {
    this.loading = true
    await Promise.allSettled([this.loadProfile(), this.getEnrolledCourses()])
    this.loading = false
  }
}
</script>

<style scoped>

.profile-page {
  max-width: 860px;
  margin: 24px auto;
  padding: 20px;
  box-sizing: border-box;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e6e8ec;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(16, 24, 40, 0.04);
}

.avatar-wrap {
  position: relative;
  width: 96px;
  height: 96px;
  flex: 0 0 96px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #e6e8ec;
  background: #f6f7f9;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 12px;
  user-select: none;
}

.edit-badge {
  position: absolute;
  right: -6px;
  bottom: -6px;
  font-size: 12px;
  line-height: 1;
  padding: 8px 10px;
  background: #4D0099;
  color: #fff;
  border-radius: 999px;
  border: 2px solid #fff;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.35);
}
.edit-badge:hover { transform: translateY(-1px); }
.edit-badge:active { transform: translateY(0); }

.hidden { display: none; }

.user-meta .title {
  margin: 0 0 4px 0;
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
}
.user-meta .subtext {
  margin: 0;
  color: #475569;
  font-size: 14px;
}


.status {
  margin: 14px 2px 0;
  font-size: 14px;
  color: #475569;
}
.status.error {
  color: #b91c1c;
}


.courses {
  margin-top: 24px;
  padding: 16px;
  border: 1px solid #e6e8ec;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(16, 24, 40, 0.04);
}

.section-title {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}

.course-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.course-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 6px;
  border-bottom: 1px dashed #e5e7eb;
}
.course-item:last-child {
  border-bottom: none;
}

.course-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #64748b;
  opacity: 0.6;
}

.course-title {
  font-size: 15px;
  color: #111827;
}


.empty {
  margin: 6px 2px 0;
  font-size: 14px;
  color: #6b7280;
}


@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .avatar-wrap {
    width: 84px;
    height: 84px;
    flex-basis: 84px;
  }
}
</style>


