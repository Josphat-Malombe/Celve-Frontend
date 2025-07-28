<script>

import { logoutUser } from '../../services/AuthService'; 

export default {
  name: 'HomePage',
  data() {
    return {
      username: '',
    };
  },
  
  methods: {
    async logout() {
      try {
        await logoutUser(); 
        console.log('Logout error:');
      } finally {
        localStorage.removeItem('access_token'); 
        this.$router.push('/login'); 
      }
    },
  },
};
</script>

<template>
  <div class="home-container">
    <h1>Welcome, user</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<style scoped>
.home-container {
  text-align: center;
  margin-top: 50px;
}
button {
  margin-top: 20px;
  padding: 10px 15px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
