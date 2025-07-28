<script>
import { registerUser } from '../services/AuthService';

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
      success: null,
      loading: false,
    };
  },
  methods: {
    async registerUserHandler() {
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match';
        return;
      }

      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        const response = await registerUser({
          username: this.username,
          email: this.email,
          password: this.password,
          password2: this.confirmPassword
        });

        this.success = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.$router.push('/login');
        }, 1200);
        console.log('registered:',response.data)
      } catch (err) {
        this.error = Object.values(err.response?.data).flat().join(', ');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div class="register-container">
    <div class="form-box">
      <h3>Create Your Account</h3>
      <p class="subtitle">Join Celve today!</p>

      <div v-if="error" class="alert error">{{ error }}</div>
      <div v-if="success" class="alert success">{{ success }}</div>

      <form @submit.prevent="registerUserHandler">
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />

        <button type="submit" :disabled="loading">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>

      <p class="login-link">
        Already have an account? <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Page background */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  padding: 20px;
}

/* Card-like form box */
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
.alert.success {
  background: #d1e7dd;
  color: #0f5132;
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
  border-color: #2575fc;
  box-shadow: 0 0 5px rgba(37, 117, 252, 0.3);
}

/* Button */
form button {
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  border: none;
  border-radius: 8px;
  background: #2575fc;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

form button:hover {
  background: #1d63d8;
}

form button:disabled {
  background: #a6c8ff;
  cursor: not-allowed;
}

/* Login link */
.login-link {
  margin-top: 15px;
  font-size: 14px;
}

.login-link a {
  color: #2575fc;
  text-decoration: none;
  font-weight: bold;
}
</style>

