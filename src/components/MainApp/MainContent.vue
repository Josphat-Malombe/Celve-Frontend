

<template>
  <div class="main-content">
    <div class="welcome-bar">
      <h1 class="welcome-text">Hello, {{ firstName }}</h1>

      <div class="welcome-center">
        <router-link :to="{name: 'AgentPage'}" class="misinfo-btn">
          Misinformation Checker
        </router-link>
      </div>
      <div class="user-info" ref="menuWrapper">
        <div class="avatar" @click="toggleMenu">{{ initials }}</div>
        <div v-if="menuOpen" class="dropdown-menu">
          <router-link :to="{name: 'ProfilePage'}" class="dropdown-item">Profile</router-link>
          <router-link :to="{name: 'HomeScreen'}" class="dropdown-item">Dashboard</router-link>
          <a v-if="isSuperuser" href="https://celve-backend.onrender.com/admin/" target="_blank" class="dropdown-item">
            Admin Panel
          </a>
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
      isSuperuser: false,
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
      this.isSuperuser = response.data.is_superuser;
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  height: 70px;
  border-radius: 1rem;
}

.welcome-center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.misinfo-btn {
  display: inline-block;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(90deg ,#4D0099, #cdaaef);
  border-radius: 6px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  animation: pulseGlow 2s infinite ease-in-out;
}

.misinfo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(1, 77, 30, 0.5);
  background: linear-gradient(90deg , #cdaaef, #4D0099);
}

.misinfo-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.5s ease, height 0.5s ease;
}

.misinfo-btn:hover::before {
  width: 200px;
  height: 200px;
}

.welcome-text {
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0 20px;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

.logout-btn {
  background-color: #4D0099;
  color: white;
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

@media (max-width: 768px) {
  .welcome-bar {
    flex-wrap: wrap;
    height: auto;
    padding: 10px;
  }

  .welcome-text {
    font-size: 1.2rem;
    margin: 10px;
  }

  .misinfo-btn {
    font-size: 0.9rem;
    padding: 6px 12px;
  }

  .welcome-center {
    flex-grow: 0;
  }
}

@media (min-width: 768px) {
  .main-content {
    margin-left: 260px;
  }
}

@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.7);
  }
  50% {
    box-shadow: 0 0 10px 5px rgba(229, 62, 62, 0.3);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.7);
  }
}
</style>