<template>
  <div class="layout">
    <Sidebar />
    <MainContent />
  </div>
</template>

<script>
import Sidebar from '@/components/MainApp/Sidebar.vue';
import MainContent from '@/components/MainApp/MainContent.vue';

export default {
  components: {
    Sidebar,
    MainContent,
  }
}
</script>

<style>
.layout {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

@media screen and (max-width: 768px) {
  .layout {
    flex-direction: column;
  }
}
</style>
