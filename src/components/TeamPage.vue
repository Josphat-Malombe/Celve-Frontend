<template>
  <h4 style="font-size: 30px; color: #1a237e;">Meet the team!</h4>
  <div class="member-card-container">
   
    
    <div class="member-card">
      <img src="data:image/jpeg;base64,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" alt="Member Avatar" class="member-avatar">
      <h4 class="member-name">Mercy Kerubo</h4>
      <h5 class="member-title">Founder, Celve</h5>
      <p class="member-bio">
        She is the driving force behind this first-of-its-kind institution in Kenya,
        conceived to address persistent electoral challenges.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamMemberCard', // Good practice to name your components
};
</script>

<style scoped>
/* Scoped styles ensure these styles only apply to this component */

.member-card-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9; /* Light background for the container */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Professional font */
  gap: 50px;
}

.member-card {
  background-color: #e2e6e8;
  border-radius: 12px; /* Slightly more rounded corners */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); /* Softer, more pronounced shadow */
  padding: 30px;
  text-align: center;
  max-width: 350px; /* Limit card width for better readability */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth hover effects */
  
}

.member-card:hover {
  transform: translateY(-5px); /* Slight lift on hover */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover */
}

.member-avatar {
  width: 120px; /* Larger avatar */
  height: 120px;
  border-radius: 50%; /* Perfect circle */
  object-fit: cover; /* Ensures image covers the area without distortion */
  border: 4px solid #42b983; /* A pleasant border color, often used in Vue context */
  margin-bottom: 20px; /* Space below avatar */
  transition: border-color 0.3s ease;
}

.member-card:hover .member-avatar {
    border-color: #36a472; /* Slightly darker border on hover */
}

.member-name {
  color: #333;
  font-size: 1.8em; /* Larger name */
  margin-bottom: 8px;
  font-weight: 600; /* Bolder name */
}

.member-title {
  color: #666;
  font-size: 1.1em;
  margin-bottom: 15px;
  font-weight: 400;
  text-transform: uppercase; /* Uppercase for title for distinction */
  letter-spacing: 1px; /* A bit of letter spacing */
}

.member-bio {
  color: #555;
  font-size: 0.95em;
  line-height: 1.6; /* Improved readability for paragraphs */
  text-align: justify; /* Justify text for a clean block */
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .member-card {
    padding: 20px;
    margin: 0 15px; /* Add some horizontal margin on smaller screens */
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