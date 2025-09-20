
 <!--Simple app-bar with a logo ,title and somelinks with a get started button...the appbar also has hamburger menu icon
 for screen size responsiveness-->
<template>
  <header class="app-bar">
    <div class="app-bar-container">
   
      <div class="left-section">
        <img src="@/assets/celvelogo.jpeg" alt="Logo" class="logo-img" />
        <h4 class="site-title">Center For Electoral Leadership And Voter Education</h4>
      </div>

     
      <nav class="nav-links">
        <a href="#" @click.prevent="scrollTo('home')">Home</a>
        <a href="#" @click.prevent="scrollTo('about-us')">About</a>
        <a href="#" @click.prevent="scrollTo('program')">Programs</a>
        <a href="#" @click.prevent="scrollTo('article-post')">Articles</a>
        <a href="#" @click.prevent="scrollTo('footer')">Contact</a>
        <router-link :to="{name: 'LoginPage'}" class="button">Get Started</router-link>  
      </nav>

    
      <button class="menu-btn" @click="toggleMenu">
        <svg viewBox="0 0 24 24">
          <path v-if="!isOpen" d="M4 6h16M4 12h16M4 18h16"/>
          <path v-else d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

  
    <div class="mobile-nav" v-if="isOpen">
      <router-link :to="{name: 'LoginPage'}"  class="mobile-btn">Get Started</router-link>
      <a href="#" @click.prevent="scrollTo('home')">Home</a>
      <a href="#" @click.prevent="scrollTo('about-us')">About</a>
      <a href="#" @click.prevent="scrollTo('program')">Programs</a>
      <a href="#" @click.prevent="scrollTo('article-post')">Articles</a>
      <a href="#" @click.prevent="scrollTo('footer')">Contact</a>   
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppBar',
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    scrollTo(id){
      const section=document.getElementById(id);
      if (section) section.scrollIntoView({behavior: 'smooth'});
    }
  }
}
</script>

<style scoped>


body,html{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
.app-bar {
  background-color:#4D0099;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  z-index: 1000;
  font-family: 'Segoe UI', sans-serif;
}


.app-bar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}


.left-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-img {
  height: 40px;
  width: 40px;
  object-fit: contain;
}

.site-title {
  font-size: 18px;
  color: white;
  font-weight: 600;
  margin: 0;
}


.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #1e90ff;
}

.button {
  background-color: #1e90ff;
  color: white;
  border: none;
  padding: 10px 18px;
  font-size: 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #4D0099;
}


.menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-btn svg {
  width: 28px;
  height: 28px;
  stroke: white;
  stroke-width: 2;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}


.mobile-nav {
  display: none;
  flex-direction: column;
  padding: 16px 24px;
  background-color: #0c0c0c;
}

.mobile-nav a {
  padding: 12px 0;
  text-decoration: none;
  color: white;
  border-bottom: 1px solid #333;
  font-size: 16px;
}

.mobile-btn {
  color: #1e90ff;
  font-weight: bold;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .menu-btn {
    display: block;
  }

  .mobile-nav {
    display: flex;
  }

  .app-bar-container {
    padding: 0 16px;
  }

  .site-title {
    font-size: 14px;
  }
}
</style>
