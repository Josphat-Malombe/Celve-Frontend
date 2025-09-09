
<template>
  <div>
    <button @click="toggleSidebar" class="menu-toggle">
      <svg v-if="!isSidebarOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="12"></line>
      </svg>
    </button>

    <div class="sidebar" :class="{ 'is-open': isSidebarOpen }">
      <h2 class="sidebar-title">Dashboard</h2>
    
     <div class="sidebar-content">
      <nav class="nav-links">
        <RouterLink to="/dashboard" class="nav-link" exact-active-class="active-link">
          <svg class="nav-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m4-6v6m5-6l2 2m-2-2l-7-7-7 7" />
        </svg>
        Home
       </RouterLink>
     </nav>

     <nav class="nav-links">
 
  <RouterLink
    v-if="enrolledCourses.length > 0"
    :to="{ name: 'Modules', params: { id: enrolledCourses[0].course_id } }"
    class="nav-link" exact-active-class="active-link"
  >
    <svg class="nav-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M12 14l9-5-9-5-9 5 9 5z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M12 14l6.16-3.422A12.083 12.083 0 0118 20.5H6a12.083 12.083 0 01-.16-9.922L12 14z" />
    </svg>
    Learn
  </RouterLink>

  
  <RouterLink
    v-else
    :to="{name: 'Courses'}"
    class="nav-link" exact-active-class="active-link"
  >
    <svg class="nav-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M12 14l9-5-9-5-9 5 9 5z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M12 14l6.16-3.422A12.083 12.083 0 0118 20.5H6a12.083 12.083 0 01-.16-9.922L12 14z" />
    </svg>
    Enroll now
  </RouterLink>
</nav>


     <nav class="nav-links">
        <RouterLink to="/dashboard/courses" class="nav-link" exact-active-class="active-link">
           <svg class="nav-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
               d="M12 20l9-5-9-5-9 5 9 5z" />
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
               d="M3 10l9-5 9 5M3 14l9 5 9-5" />
           </svg>
           Courses
        </RouterLink>
      </nav>

      <nav class="nav-links">
         <RouterLink :to="{name:'AchievementPage'}" class="nav-link" exact-active-class="active-link">
             <svg class="nav-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8l3 4-3 4-3-4 3-4z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 3h14l-1.68 4.06a9 9 0 01-10.64 0L5 3z" />
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 21h14v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2z" />
            </svg>
           Achievements
        </RouterLink>
      </nav>

      <nav class="nav-links">
  <RouterLink :to="{name:'CountyList'}" class="nav-link" exact-active-class="active-link">
    <svg class="nav-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
    d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
    d="M6 20v-1c0-2.21 2.69-4 6-4s6 1.79 6 4v1H6z" />
</svg>

    Know Your Leader
  </RouterLink>
</nav>




      <nav class="nav-links">
        <RouterLink :to="{name:'Articles'}" class="nav-link" exact-active-class="active-link">
          <svg class="nav-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Create Articles
        </RouterLink>
      </nav>

      <nav class="nav-links">
         <RouterLink :to="{name:'Article-List'}"  class="nav-link" exact-active-class="active-link">
             <svg class="nav-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.563 5.342 9.222 5 7.91 5c-2.88 0-5.59 1.15-7.59 3.15a10.022 10.022 0 00-.01 14.15l7.59-7.59" />
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C13.437 5.342 14.778 5 16.09 5c2.88 0 5.59 1.15 7.59 3.15a10.022 10.022 0 00.01 14.15l-7.59-7.59" />
             </svg>
            Read Articles
          
          </RouterLink>
        </nav>


        <nav class="nav-links">
  <RouterLink :to="{name: 'ProfilePage'}" class="nav-link" exact-active-class="active-link">
    <svg class="nav-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.12 17.804z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    Profile
  </RouterLink>
</nav>

<nav class="nav-links">
  <RouterLink :to="{name: 'RolePage'}" class="nav-link" exact-active-class="active-link">
    <svg class="nav-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M4 7h16v13H4z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M9 7V4h6v3" />
    </svg>
    Elective Positions
  </RouterLink>
</nav>


<div class="nav-links more-wrapper" ref="moreWrapper">

    <button
      class="nav-link more-btn"
      @click.stop="toggleMore"
      :aria-expanded="isMoreOpen.toString()"
      aria-haspopup="true"
    >
      <span class="more-label">More</span>
      <svg
        class="more-icon"
        :class="{ open: isMoreOpen }"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M6 9l6 6 6-6"></path>
      </svg>
    </button>


    <transition name="slide">
      <div
  v-if="isMoreOpen"
  class="more-dropdown"
  role="menu"
  aria-label="More menu"
>


        <RouterLink
          :to="{ name: 'ElectionsDate' }"
          class="submenu-item"
          role="menuitem"
          @click="closeMore"
        >
          Elections
        </RouterLink>

        <RouterLink
          :to="{name: 'AgentPage'}"
          class="submenu-item"
          role="menuitem"
          @click="closeMore"
        >
          Checker
        </RouterLink>

        <RouterLink
          to="#"
          class="submenu-item"
          role="menuitem"
          @click="closeMore"
        >
          About
        </RouterLink>
      </div>
    </transition>
  </div>
  </div>
          <button @click="handleLogout" class="logout-btn">Logout</button>
     </div>
   
  </div>

     
</template>

<script>
import { logoutUser } from '@/services/AuthService';
import { fetchEnrolledCourses} from '@/services/CourseServices';

export default {
  
  data() {
    return {
      isSidebarOpen: false,
      enrolledCourses: [],
      loadingCourses: false,
      error: null,
      isMoreOpen: false,

    };
  },
  methods: {
 
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleMore() {
     this.isMoreOpen = !this.isMoreOpen;   
      },
     closeMore() {
       this.isMoreOpen = false;
     },
     handleClickOutsideMore(event) {
      const wrapper = this.$refs.moreWrapper;
      if (this.isMoreOpen && wrapper && !wrapper.contains(event.target)) {
        this.isMoreOpen = false;
      }
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
    async getEnrolledCourses() {
      this.loadingCourses = true;
      this.error = null;
      try {
        const res = await fetchEnrolledCourses();
        this.enrolledCourses = res.data;
      } catch (err) {
        this.error = 'Failed to fetch enrolled courses';
        console.error(err);
      } finally {
        this.loadingCourses = false;
      }
    },
  },
  mounted(){
     this.getEnrolledCourses();
     document.addEventListener("click", this.handleClickOutsideMore);
  },
  beforeUnmount() {
  document.removeEventListener("click", this.handleClickOutsideMore);
}
}
</script>

<style scoped>

.sidebar {
  height: 100vh;
  width: 260px;
  background: linear-gradient(135deg, #1c1c1c, #2a2a2a);
  color: white;
  padding: 40px 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.sidebar-title {
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
  color: #f7f7f7;
  letter-spacing: 1px;
}
.sidebar-content {
  flex: 1;
  overflow: hidden;
}


.nav-links {
  display: flex;
  flex-direction: column;
  gap: 35px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 1.2rem;
  color: #ffffffcc;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 10px;
}

.nav-link-icon {
  width: 20px;
  height: 20px;
  stroke: #ffffffcc;
}

.nav-link:hover {
  color: #4D0099;
  transform: translateX(5px);
}

.nav-link:hover .nav-link-icon {
  stroke: #4D0099;
}


.caret.open {
  transform: rotate(180deg);
}

.logout-btn {
  margin-top: auto;
  background: #4D0099;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.logout-btn:hover {
  background: #d9363e;
}




.menu-toggle {
  display: none;
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1001; 
  background: #2a2a2a;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
}

.menu-toggle svg {
  stroke: white;
}

.active-link {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: white;
  
}



@media (max-width: 768px) {
  .menu-toggle {
    display: block; 
  }

  .sidebar {
    
    transform: translateX(-100%);
  }

  .sidebar.is-open {
   
    transform: translateX(0);
  }
}

.more-wrapper {
  position: relative;
  display: inline-block;
  flex-direction: column;
  width: 100%;
}

.more-btn {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  font-size: 1.2rem;
  color: #ffffffcc;
  padding: 10px;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
}


.more-dropdown {
  position: fixed;  
  top: 550px;        
  left: 270px;       
  width: 220px;
  background: linear-gradient(135deg, #1c1c1c, #2a2a2a);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  padding: 10px;
  z-index: 9999;
}



.more-btn:hover {
  color: #4D0099;
  transform: translateX(5px);
}

.more-icon {
  width: 18px;
  height: 18px;
  stroke: #ffffffcc;
  transition: transform 0.3s ease;
}

.more-icon.open {
  transform: rotate(180deg);
}


.more-sidebar {
  position: absolute;
  top: 100%;   
  left: 0;
  width: 220px;
  background: linear-gradient(135deg, #1c1c1c, #2a2a2a);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  border-radius: 8px;
  padding: 10px;
  margin-top: 6px;
  z-index: 1000;
}




.submenu-item {
  display: block;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  color: #ffffffcc;
  text-decoration: none;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.submenu-item:hover {
  color: #4D0099;
  transform: translateX(5px);
}


.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}


</style>




