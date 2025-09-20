
<template>
  <section class="about-header" id="about-us">
    <div class="container">
      <h1 style="color:white">What We Do</h1>
      <p class="tagline">
        Empowering Voters. Inspiring Leaders. Sustaining Democracy.
      </p>
    </div>
  </section>

  <section class="about-content">
    <div class="container content-container">
      <div class="mission-vision">
        
        <div
          class="text-block vision"
          :class="{ 'animate-slide-left': inView.vision }"
          ref="visionRef"
        >
          <h2 style="color:#4c1d95;">Our Vision</h2>
          <p>
            A vibrant democracy driven by informed citizens and principled
            leaders.
          </p>
        </div>

        <div
          class="text-block mission"
          :class="{ 'animate-slide-right': inView.mission }"
          ref="missionRef"
        >
          <h2 style="color:#4c1d95;">Our Mission</h2>
          <p>
            To empower citizens with robust voter education and nurture leaders
            with integrity and civic duty, fostering trust and active
            participation in democracy.
          </p>
        </div>
      </div>

      <div class="cta-block">
        <p>Join us in building a stronger, more engaged democratic future.</p>
        <router-link :to="{ name: 'LoginPage' }" class="cta-button">
          Get Involved
        </router-link>
      </div>
    </div>
  </section>

  <section class="core-values" >
    <div class="container">
      <header class="section-header">
        <h2 style="color:#4c1d95;">Our Core Values</h2>
        <p>Guiding principles for empowering informed and engaged citizens.</p>
      </header>

      <div class="values-grid" >
        <div class="value-card">
          <div class="value-icon"></div>
          <h3>Active Participation</h3>
          <p>Encouraging citizens to actively engage in the democratic process.</p>
        </div>

        <div class="value-card">
          <div class="value-icon"></div>
          <h3>Inclusivity</h3>
          <p>
            Ensuring every voice is valued and represented in our democracy.
          </p>
        </div>

        <div class="value-card">
          <div class="value-icon"></div>
          <h3>Impartiality</h3>
          <p>
            Upholding objective principles to foster trust in civic processes.
          </p>
        </div>

        <div class="value-card">
          <div class="value-icon"></div>
          <h3>Integrity</h3>
          <p>
            Promoting transparency and accountability with ethical standards.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      inView: {
        vision: false,
        mission: false,
      },
    };
  },
  mounted() {
    const options = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("vision")) {
            this.inView.vision = true;
          }
          if (entry.target.classList.contains("mission")) {
            this.inView.mission = true;
          }
        }
      });
    }, options);

    observer.observe(this.$refs.visionRef);
    observer.observe(this.$refs.missionRef);
  },
};
</script>

<style scoped>

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}


.about-header {
  padding: 4rem 1rem;
  background: #490f84;
  color: #ffffff;
  text-align: center;
  position: relative;
}

.about-header h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.tagline {
  font-size: 1.2rem;
  font-style: italic;
  color: #d1d5db;
  max-width: 800px;
  margin: 0 auto;
}

.about-content {
  padding: 4rem 1rem;
  background: #490f84;
  color: #fff;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.mission-vision {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.text-block {
  background: #ffffff;
  color: #333;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
}

.animate-slide-left {
  animation: slideInLeft 1s ease forwards;
}

.animate-slide-right {
  animation: slideInRight 1s ease forwards;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-120px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(120px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}


.cta-block {
  text-align: center;
  margin-top: 2rem;
}

.cta-block p {
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #1e3a8a;
  color: #ffffff;
  text-decoration: none;
  border-radius: 6px;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.3s ease;
}

.cta-button:hover {
  background: #3b0a6b;
  transform: scale(1.05);
}


.core-values {
  background-color: #b4b7bb; 
  padding: 4rem 1rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.section-header p {
  font-size: 1rem;
  color: #4b5563;
}

.values-grid {
 
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.value-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.value-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.value-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #4c1d95;
}

.value-card p {
  font-size: 0.95rem;
  color: #4b5563;
}


@media (max-width: 768px) {
  .about-header h1 {
    font-size: 2rem;
  }
  .tagline {
    font-size: 1rem;
  }
  .cta-block p {
    font-size: 1rem;
  }
  .cta-button {
    font-size: 0.95rem;
  }
}
</style>
