<script>
export default {
    name: 'HomePage',
    props: {
        msg: String
    }
}
</script>

<template>
  <div class="homepage">
    <section id="home" class="hero-section">
      <div class="hero-background"></div>
      <div class="hero-content">
        <h1>Center for Electoral Leadership and Voter Education</h1>
        <p style="color: orange;">Empower Voters. Inspire Leaders. Sustain Democracy.</p>
        <router-link to="/register" class="cta-button">Get Involved</router-link>
       
      </div>
    </section>

    <section class="why-matters-section">
      <div class="container">
        <div class="why-matters-content">
          <h2>Why Civic Education Can’t Wait</h2>
          <p>
            Kenya faces recurring electoral challenges—low civic awareness, misinformation, youth apathy, and election-time violence. CELVE was born from a belief that democracy must be built every day, not just during campaigns.
          </p>
          <p class="emphasis">Informed citizens make stronger democracies.</p>
        </div>
      </div>
    </section>

    <section id="about" class="mission-section">
      <div class="container">
        <h2 class="section-title">Empower, Educate, Engage.</h2>
        <div class="card-container">
          <div class="card">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            </div>
            <h3>Train electoral officials</h3>
            <ul>
              <li>Certified</li>
              <li>Ethical</li>
              <li>Professional</li>
            </ul>
          </div>
          <div class="card">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3>Educate voters</h3>
            <ul>
              <li>Year-round</li>
              <li>Accessible</li>
              <li>Inclusive</li>
            </ul>
          </div>
          <div class="card">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3>Fight misinformation</h3>
            <ul>
              <li>Especially online</li>
              <li>In campaigns</li>
            </ul>
          </div>
          <div class="card">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            </div>
            <h3>Empower youth & women</h3>
            <ul>
              <li>In civic spaces</li>
            </ul>
          </div>
          <div class="card">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
            <h3>Promote peace & unity</h3>
            <ul>
              <li>Before elections</li>
              <li>During elections</li>
              <li>After elections</li>
            </ul>
          </div>
          <div class="card">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
            </div>
            <h3>Research & innovate</h3>
            <ul>
              <li>Using data</li>
              <li>Behavioral insights</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="program" class="programs-section">
      <div class="container programs-container">
        <div class="program-list">
          <h3>Our Core Programs</h3>
          <ul>
            <li><strong>Know Your Leader:</strong> Get wide informational access about your county leaders.</li>
            <li><strong>Outreach:</strong> Forums in schools, churches, radio, and rural groups.</li>
            <li><strong>Research:</strong> Analysis of trends, disinformation, and behavioral change.</li>
            <li><strong>Peace Forums:</strong> Dialogues and conflict prevention activities.</li>
          </ul>
        </div>
        <div class="join-movement">
          <h3>Join the Movement</h3>
          <p>Become a part of the solution for an informed democracy.</p>
          <ul>
            <li>✓ Become a Civic Educator</li>
            <li>✓ Enroll in Our Certification Program</li>
            <li>✓ Volunteer in Your Community</li>
            <li>✓ Donate to Support Civic Empowerment</li>
          </ul>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* GENERAL STYLES */
.homepage {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #4A4A4A;
  background-color: #f8f9fa; /* Light grey background for the whole page */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: #1a237e; /* A deep, trustworthy blue */
  font-weight: 700;
}

/* 1. HERO SECTION */
.hero-section {
  position: relative;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 20px;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/home.avif');
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.hero-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 25, 47, 0.6); /* Dark blue overlay for readability */
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  max-width: 800px;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-content p {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 40px;
}

.cta-button {
  background-color: #3498db; /* Bright, optimistic blue */
  color: white;
  padding: 15px 35px;
  border-radius: 50px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
}

/* 2. WHY MATTERS SECTION */
.why-matters-section {
  padding: 80px 0;
  background-color: #ffffff;
}
.why-matters-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
.why-matters-content h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #1a237e;
  font-weight: 700;
}
.why-matters-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
}
.why-matters-content .emphasis {
  margin-top: 20px;
  font-weight: 600;
  font-size: 1.2rem;
  color: #333;
}

/* 3. MISSION SECTION & CARDS */
.mission-section {
  padding: 80px 0;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e0e0e0;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.card-icon {
  margin: 0 auto 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e3f2fd; /* Light blue background for icon */
  color: #1976d2; /* Darker blue for icon */
}

.card-icon svg {
  width: 32px;
  height: 32px;
}

.card h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #333;
}

.card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card ul li {
  color: #666;
  line-height: 1.6;
}

/* 4. PROGRAMS SECTION */
.programs-section {
    padding: 80px 0;
    background-color: #4D0099; /* Dark blue background */
    color: #ffffff;
}

.programs-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
}

.program-list h3, .join-movement h3 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 25px;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    display: inline-block;
}

.program-list ul, .join-movement ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.program-list li {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 15px;
    color: #bdc3c7;
}

.program-list li strong {
    color: #ffffff;
    font-weight: 600;
}

.join-movement p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    color: #bdc3c7;
}

.join-movement li {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 10px;
    color: #ffffff;
    font-weight: 500;
}

/* RESPONSIVE DESIGN */
@media (max-width: 992px) {
    .hero-content h1 {
        font-size: 2.8rem;
    }
    .hero-content p {
        font-size: 1.3rem;
    }
    .section-title, .why-matters-content h2 {
        font-size: 2.2rem;
    }
}

@media (max-width: 768px) {
    .hero-section {
        height: 70vh;
    }
    .hero-content h1 {
        font-size: 2.2rem;
    }
    .hero-content p {
        font-size: 1.2rem;
    }
    .programs-container {
        grid-template-columns: 1fr;
    }
    .card-container {
        grid-template-columns: 1fr;
    }
}
</style>