<template>
  <section class="about-header" id="about-us"  >
    <div class="container">
        <h1 style="color:white;">What We Do</h1>
        <p class="tagline">Empowering Voters. Inspiring Leaders. Sustaining Democracy.</p>
    </div>
  </section>
   <section class="about-content">
    <div class="container content-container">
        <div class="mission-vision">
            <div class="text-block">
                <h2>Our Vision</h2>
                <p>A vibrant democracy driven by informed citizens and principled leaders.</p>
            </div>
            <div class="text-block">
                <h2>Our Mission</h2>
                <p>To empower citizens with robust voter education and nurture leaders with integrity and civic duty, fostering trust and active participation in democracy.</p>
            </div>
        </div>
        <div class="cta-block">
            <p>Join us in building a stronger, more engaged democratic future.</p>
            <router-link :to="{name:'LoginPage'}" class="cta-button">Get Involved</router-link> 
        </div>
    </div>
   </section>

  <section class="core-values">
    <div class="container">
       
        <header class="section-header">
            <h2>Our Core Values</h2>
            <p>Guiding principles for empowering informed and engaged citizens.</p>
        </header>

        <div class="values-grid">
            <div class="value-card">
                <div class="value-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#490f84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                </div>
                <h3>Active Participation</h3>
                <p>Encouraging citizens to actively engage in the democratic process.</p>
            </div>

            <div class="value-card">
                <div class="value-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#490f84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                </div>
                <h3>Inclusivity</h3>
                <p>Ensuring every voice is valued and represented in our democracy.</p>
            </div>

            <div class="value-card">
                <div class="value-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#490f84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                </div>
                <h3>Impartiality</h3>
                <p>Upholding objective principles to foster trust in civic processes.</p>
            </div>

            <div class="value-card">
                <div class="value-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#490f84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 17 17 23 15.79 13.88"></polyline>
                    </svg>
                </div>
                <h3>Integrity</h3>
                <p>Promoting transparency and accountability with ethical standards.</p>
            </div>
        </div>
    </div>
 </section>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>


.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
 
}


.about-header {
    padding: 4rem 1rem;
    background: #490f84;
    color: #ffffff;
    text-align: center;
    position: relative;
}

.about-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(73, 15, 132, 0.2), transparent);
    z-index: 0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    position: relative;
    z-index: 1;
}

.about-header h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    animation: fade-in 1s ease-out;
}

.tagline {
    font-size: 1.5rem;
    font-style: italic;
    color: #d1d5db;
    max-width: 800px;
    margin: 0 auto;
    animation: fade-in 1.2s ease-out;
}

.about-content {
    padding: 4rem 1rem;
    background: #490f84;
}

.content-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.mission-vision {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.text-block {
    background: #ffffff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.text-block:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.text-block h2 {
    font-size: 1.8rem;
    color: #1e3a8a;
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 2rem;
}

.text-block h2::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1.5rem;
    height: 3px;
    background: #490f84;
}

.text-block p {
    font-size: 1rem;
    color: #4b5563;
}

.cta-block {
    text-align: center;
    margin-top: 2rem;
}

.cta-block p {
    font-size: 1.2rem;
    color: white;
    margin-bottom: 1.5rem;
    animation: fade-in 1.4s ease-out;
}

.cta-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background:#1e3a8a;
    color: #ffffff;
    text-decoration: none;
    border-radius: 4px;
    font-size: 1.1rem;
    transition: background 0.3s ease, transform 0.3s ease;
}

.cta-button:hover {
    background: #3b0a6b;
    transform: scale(1.05);
}

@keyframes fade-in {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
    .about-header h1 {
        font-size: 2rem;
    }
    .tagline {
        font-size: 1.2rem;
    }
    .text-block h2 {
        font-size: 1.5rem;
    }
    .text-block p {
        font-size: 0.9rem;
    }
    .cta-block p {
        font-size: 1rem;
    }
    .cta-button {
        font-size: 1rem;
    }
}

.section-header {
    text-align: center;
    margin-bottom: 7rem;
    margin-top: 120px;
   
}
.core-values{
    background-color: #b4b7bb; 
    padding: 10px 0px;
}

.section-header h2 {
    font-size: 2.5rem;
    color: #1e3a8a;
    margin-bottom: 0.5rem;
    animation: fade-in 1s ease-out;
}

.section-header p {
    font-size: 1.2rem;
    color: #4b5563;
    max-width: 600px;
    margin: 0 auto;
    animation: fade-in 1.2s ease-out;
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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.value-icon {
    margin-bottom: 1rem;
}

.value-icon svg {
    stroke: #490f84;
    transition: transform 0.3s ease;
}

.value-card:hover .value-icon svg {
    transform: scale(1.1);
}

.value-card h3 {
    font-size: 1.5rem;
    color: #1e3a8a;
    margin-bottom: 0.5rem;
}

.value-card p {
    font-size: 1rem;
    color: #4b5563;
}

@keyframes fade-in {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
    .section-header h2 {
        font-size: 2rem;
    }
    .section-header p {
        font-size: 1rem;
    }
    .value-card h3 {
        font-size: 1.3rem;
    }
    .value-card p {
        font-size: 0.9rem;
    }
    .value-icon svg {
        width: 24px;
        height: 24px;
    }
}

</style>