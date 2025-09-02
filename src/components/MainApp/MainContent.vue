
<template>
  <div class="main-content">
    <div class="welcome-bar">
      <h1 class="welcome-text">Hello, {{ firstName }}</h1>
      <div class="user-info" ref="menuWrapper">
        <div class="avatar" @click="toggleMenu">{{ initials }}</div>
        
        <div v-if="menuOpen" class="dropdown-menu">
          <router-link :to="{name: 'ProfilePage'}" class="dropdown-item">Profile</router-link>
          <router-link :to="{name: 'HomeScreen'}" class="dropdown-item">Dashboard</router-link>
          <button @click="handleLogout" class="logout-btn">Logout</button>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { getProfile, logoutUser } from '@/services/AuthService';

export default {
  data() {
    return {
      username: '',
      initials: '',
      firstName: '',
      menuOpen: false,  
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    handleLogout() {
      logoutUser()
        .then(() => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh');
          this.$router.push('/login');
        })
        .catch((error) => {
          console.error("Logout failed", error);
        });
    },
    handleClickOutside(event) {
      if (this.menuOpen && this.$refs.menuWrapper && !this.$refs.menuWrapper.contains(event.target)) {
        this.menuOpen = false;
      }
    }
  },
  async mounted() {
    try {
      const response = await getProfile();
      this.username = response.data.username;
      this.initials = this.username ? this.username.charAt(0).toUpperCase() : '';
      const nameParts = this.username.split(/[\s-_]+/);
      this.firstName = nameParts.length > 0 ? nameParts[0] : this.username;
    } catch (err) {
      console.error('Error fetching profile:', err);
    }

    
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
  
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>

<style scoped>
.main-content {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  transition: margin-left 0.3s ease-in-out;

}


.welcome-bar {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  margin-bottom: 20px;
  height: 60px;
}

.welcome-text {
  font-size: 1.4rem;
  font-weight: bold;
  margin: 30px;
  color: #333;
}


.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #4D0099;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  cursor: pointer;

}
.dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 150px;
  z-index: 100;
}

.dropdown-item {
  display: block;
  padding: 5px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f5f5f5;
}
.logout-btn{
  background-color:#4D0099;
  color:white;
  padding: 10px;
  width: 80%;
  border-radius: 10px;
  border-color: white;
  cursor: pointer;
}

.username {
  margin-top: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #555;
}

@media (min-width: 768px) {
  .main-content {
    margin-left: 260px;
  }
 
  

}
</style>