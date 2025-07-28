<script>
import { loginUser } from '../services/AuthService';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      error: null,
      loading: false,
    };
  },
  methods: {
    async loginHandler() {
      this.error = null;
      this.loading = true;

      try {
        const response = await loginUser({
          email: this.email,
          password: this.password,
        });

        const accessToken = response.data.access;
        localStorage.setItem('access_token', accessToken);

        this.$router.push({ name: 'HomePage' });
      } catch (err) {
        this.error = err.response?.data?.detail || 'Invalid credentials';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div class="login-container">
    <div class="form-box">
      <h3>Welcome Back</h3>
      <p class="subtitle">Login to continue learning</p>

      <div v-if="error" class="alert error">{{ error }}</div>

      <form @submit.prevent="loginHandler">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />

        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="register-link">
        Don't have an account? <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>






.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height */
  width: 100vw;
  background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
  padding: 0px;
  margin: 0;
  box-sizing: border-box;
  
}

/* Card style */
.form-box {
  background: #fff;
  padding: 30px 40px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.form-box h3 {
  margin-bottom: 10px;
  font-size: 24px;
  color: #333;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

/* Alerts */
.alert {
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 14px;
}
.alert.error {
  background: #f8d7da;
  color: #842029;
}

/* Inputs */
form input {
  width: 100%;
  padding: 12px 15px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  transition: border 0.2s ease-in-out;
}

form input:focus {
  outline: none;
  border-color: #6a11cb;
  box-shadow: 0 0 5px rgba(106, 17, 203, 0.3);
}

/* Button */
form button {
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  border: none;
  border-radius: 8px;
  background: #6a11cb;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

form button:hover {
  background: #5a0fbf;
}

form button:disabled {
  background: #b09dff;
  cursor: not-allowed;
}

/* Register link */
.register-link {
  margin-top: 15px;
  font-size: 14px;
}

.register-link a {
  color: #6a11cb;
  text-decoration: none;
  font-weight: bold;
}
</style>

