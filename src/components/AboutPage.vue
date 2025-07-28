<template>
  <div class="about-page">
    <section class="about-header">
      <div class="container">
        <h1>What we do?</h1>
        <p class="tagline">Empower Voters. Inspire Leaders. Sustain Democracy.</p>
      </div>
    </section>

    <section class="about-content">
      <div class="container content-container">
        <div class="mission-vision">
          <div class="text-block">
            <h2>Our Vision</h2>
            <p>A democracy sustained by informed voters and principled electoral leaders.</p>
          </div>
          <div class="text-block">
            <h2>Our Mission</h2>
            <p>To empower citizens through comprehensive voter education and cultivate electoral leaders equipped with integrity, vision, and civic responsibility, thereby strengthening democratic participation and trust.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="core-values">
      <div class="container">
        <h2 class="section-title">Our Core Values</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3>Participation</h3>
            <p>We champion active and informed engagement from all citizens in the democratic process.</p>
          </div>

          <div class="value-card">
            <div class="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <h3>Inclusivity</h3>
            <p>We are committed to ensuring every voice is heard, regardless of background, gender, or belief.</p>
          </div>

          <div class="value-card">
            <div class="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3>Impartiality</h3>
            <p>Our work is non-partisan and guided by objective principles to build trust in the electoral system.</p>
          </div>

          <div class="value-card">
            <div class="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 17 17 23 15.79 13.88"></polyline></svg>
            </div>
            <h3>Integrity</h3>
            <p>We operate with the highest ethical standards, promoting transparency and accountability.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
/* Inheriting the professional font from the homepage */
.about-page {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #ffffff;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header Section */
.about-header {
  background-color: #4D0099; /* Consistent deep blue */
  color: #ffffff;
  padding: 80px 0;
  text-align: center;
}

.about-header h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.about-header .tagline {
  font-size: 1.5rem;
  font-weight: 300;
  color: #bdc3c7; /* Soft grey for contrast */
  max-width: 600px;
  margin: 0 auto;
}

/* Vision and Mission Content Section */
.about-content {
  padding: 80px 0;
}

.mission-vision {
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
}

@media (min-width: 768px) {
  .mission-vision {
    grid-template-columns: 1fr 1.5fr; /* Give more space to the mission */
    align-items: center;
  }
}

.text-block h2 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 15px;
  border-bottom: 3px solid #3498db;
  padding-bottom: 10px;
  display: inline-block;
}

.text-block p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
}

/* Core Values Section */
.core-values {
  padding: 80px 0;
  background-color: #f8f9fa; /* Light grey background for section separation */
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
  color: #1a237e;
  font-weight: 700;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.value-card {
  background-color: #ffffff;
  padding: 35px 25px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.value-icon {
  margin: 0 auto 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e3f2fd; /* Consistent icon background */
  color: #1976d2; /* Consistent icon color */
}

.value-icon svg {
  width: 32px;
  height: 32px;
}

.value-card h3 {
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: #333;
}

.value-card p {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .about-header h1 {
    font-size: 2.8rem;
  }
  .about-header .tagline {
    font-size: 1.2rem;
  }
}
</style>