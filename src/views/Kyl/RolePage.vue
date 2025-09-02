<template>
  <div class="container">
    <h1 class="page-title">Positions and Roles</h1>

    <div v-for="position in positions" :key="position" class="position-card">
      <div class="position-header" @click="toggleRoles(position)">
        <span>{{ position }}</span>
        <span class="arrow">
          <span v-if="openPosition === position">▲</span>
          <span v-else>▼</span>
        </span>
      </div>
>
      <div v-if="openPosition === position" class="roles-section">
        <div v-if="loading" class="loading">Loading roles...</div>
        <div v-else-if="roles.length === 0" class="no-roles">No roles found.</div>
        <ul v-else class="roles-list">
          <li v-for="role in roles" :key="role.id" class="role-item">
            <h3 class="role-title">{{ role.title }}</h3>
            <p class="role-description">{{ role.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getRoles } from "@/services/kyl";

export default {
  name: "PositionsPage",
  data() {
    return {
      positions: [
        "President",
        "Deputy President",
        "Governor",
        "Deputy Governor",
        "Senator",
        "MP",
        "Women Rep",
        "MCA",
      ],
      openPosition: null,
      roles: [],
      loading: false,
    };
  },
  methods: {
    async toggleRoles(position) {
      if (this.openPosition === position) {
        this.openPosition = null;
        this.roles = [];
        return;
      }

      this.openPosition = position;
      this.roles = [];
      this.loading = true;

      try {
        const response = await getRoles(position);
        this.roles = response.data.roles || [];
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.position-card {
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.position-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f7f7f7;
  cursor: pointer;
  font-weight: 500;
}

.position-header:hover {
  background-color: #ececec;
}

.roles-section {
  padding: 12px 16px;
  background-color: #fff;
}

.loading {
  color: #666;
  font-style: italic;
}

.no-roles {
  color: #999;
  font-style: italic;
}

.roles-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.role-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fafafa;
}

.role-title {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: bold;
}

.role-description {
  margin: 0;
  font-size: 14px;
  color: #555;
}
</style>
