<template>
  <h4 style="font-size: 30px; color: #1a237e; margin-top: 100px;">Meet the team</h4>
  <div class="member-card-container">
   
    
    <div class="member-card">
      <img src="" alt="Member Avatar" class="member-avatar">
      <h4 class="member-name">Mercy Kerubo</h4>
      <h5 class="member-title">Project Lead, Celve</h5>
      <p class="member-bio">
        She is the driving force behind this first-of-its-kind institution in Kenya,
        conceived to addresspersistent electoral challenges.
      </p>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'TeamMemberCard'
  }
</script>

<style scoped>


.member-card-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
}

.member-card {
  background-color: #e2e6e8;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); 
  padding: 30px;
  text-align: center;
  max-width: 350px; 
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
  
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); 
}

.member-avatar {
  width: 120px; 
  height: 120px;
  border-radius: 50%; 
  object-fit: cover; 
  border: 4px solid #42b983; 
  margin-bottom: 20px; 
  transition: border-color 0.3s ease;
}

.member-card:hover .member-avatar {
    border-color: #36a472; 
}

.member-name {
  color: #333;
  font-size: 1.8em;
  margin-bottom: 8px;
  font-weight: 600; 
}

.member-title {
  color: #666;
  font-size: 1.1em;
  margin-bottom: 15px;
  font-weight: 400;
  letter-spacing: 1px;
}

.member-bio {
  color: #555;
  font-size: 0.95em;
  line-height: 1.6; 
  text-align: justify; 
}


@media (max-width: 768px) {
  .member-card {
    padding: 20px;
    margin: 0 15px; 
  }

  .member-avatar {
    width: 100px;
    height: 100px;
  }

  .member-name {
    font-size: 1.5em;
  }

  .member-title {
    font-size: 1em;
  }

  .member-bio {
    font-size: 0.9em;
  }
}
</style>