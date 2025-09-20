

<template>
  <section class="team-section">
    <h2 class="section-title">Meet the Team</h2>
    <div class="member-grid">
      <div v-for="member in team" :key="member.name" class="member-card">
        <img :src="member.avatar" alt="Member Avatar" class="member-avatar" />

        <div class="member-info">
          <h4 class="member-name" style="color:#4c1d95">{{ member.name }}</h4>
          <h5 class="member-title">{{ member.title }}</h5>
          <p class="member-bio">{{ member.bio || 'Bio coming soon...' }}</p>
        </div>

      
        <div class="social-icons" v-if="member.linkedin">
          <a :href="member.linkedin" target="_blank" rel="noopener">
            <svg xmlns="http://www.w3.org/2000/svg" class="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5 2.5v5.5h-3v-10h3v1.528c.747-1.093 2.11-1.528 3.5-1.528 2.485 0 4.5 2.015 4.5 4.5v5.5z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TeamSection",
  data() {
    return {
      team: [
        {
          name: "Mercy Kerubo",
          title: "Project Lead, Celve",
          avatar: require("@/assets/MERCY.jpeg"),
          bio: "Mercy Kerubo Onyiego holds a Masters degree in Electoral Policy and Administration from Sant'Anna School of Advanced Studies, Italy. She has experience as an educator before taking an administrative role at the Parliamentary Service Commission.",
          linkedin: "#",
        },
        {
          name: "Josphat Malombe",
          title: "Software Engineer, Celve",
          avatar: require("@/assets/josphatm.jpg"),
          bio: "Josphat specializes in AI Engineering and Research ,and full-stack development, building innovative solutions.",
          linkedin: "https://josphat-malombe.github.io/me-josphat/",
        },
        
      ],
    };
  },
};
</script>

<style scoped>
.team-section {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
}

.section-title {
  font-size: 2.8rem;
  color: #4c1d95;
  margin-bottom: 50px;
}

.member-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px;
  justify-items: center;
}

.member-card {
  position: relative;
  background-color: #e2e6e8;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  padding: 30px 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.member-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #42b983;
  margin-bottom: 20px;
  transition: border-color 0.3s ease;
}

.member-card:hover .member-avatar {
  border-color: #36a472;
}

.member-name {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.member-title {
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: 15px;
  color: #666;
}

.member-bio {
  font-size: 0.95rem;
  line-height: 1.6;
  text-align: justify;
  color: #555;
}


.social-icons {
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.member-card:hover .social-icons {
  opacity: 1;
}

.linkedin-icon {
  width: 28px;
  height: 28px;
  fill: #0a66c2;
  transition: transform 0.2s ease;
}

.linkedin-icon:hover {
  transform: scale(1.2);
}


@media (max-width: 768px) {
  .member-avatar {
    width: 100px;
    height: 100px;
  }

  .member-name {
    font-size: 1.5rem;
  }

  .member-title {
    font-size: 1rem;
  }

  .member-bio {
    font-size: 0.9rem;
  }

  .social-icons {
    top: 15px;
    right: 15px;
  }
}
</style>
