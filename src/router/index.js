import { createRouter, createWebHistory } from 'vue-router'
import PublicLayouts from '@/layouts/PublicLayouts.vue'

import LoginView from '@/views/LoginView.vue'
import HomePage from '@/views/MainApp/HomePage.vue'
import CreatePage from '@/views/Articles/CreatePage.vue'
import ArticleList from '@/views/Articles/ArticleList.vue'
import ComingSoon from '@/components/ComingSoon.vue'
import ArticleDetail from '@/views/Articles/ArticleDetail.vue'
import PageHolder from '@/components/PageHolder.vue'
import CourseList from '@/views/Courses/CourseList.vue'
import ModuleList from '@/views/Courses/ModuleList.vue'
import LessonList from '@/views/Courses/LessonList.vue'
import LessonDetail from '@/views/Courses/LessonDetail.vue'
import HomeScreen from '@/components/MainApp/HomeScreen.vue'
import QuizPage from '@/views/Courses/QuizPage.vue'
import CountyList from '@/views/Kyl/CountyList.vue'
import ProfilePage from '@/views/MainApp/ProfilePage.vue'
import AchievementPage from '@/views/MainApp/AchievementPage.vue'
import RolePage from '@/views/Kyl/RolePage.vue'
import ElectionDates from '@/views/Kyl/ElectionDates.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PublicLayouts,
    meta: { title: 'Celve - Home' },
   
  },
  {
    path: '/coming-soon',
    name: 'ComingSoon',
    component: ComingSoon
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('../views/RegisterView.vue'),
    meta: { title: 'Celve - Register' },
   
  },
    {
    path: '/login',
    name: 'LoginPage',
    component: LoginView,
    meta: { title: 'Celve - Login' },

   
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: HomePage,
    meta: {requiresAuth: true},

    children: [
     {
        path: 'soon',
        name: 'Soon',
        component: PageHolder
      },
      
      {
        path: '',
        name: 'HomeScreen',
        component: HomeScreen,
        meta: { title: 'Celve - Dashboard' },
      },
      {
        path: 'elections',
        name: 'ElectionsDate',
        component: ElectionDates,
        meta: { title: 'Celve - Elections' },
      },
      {
        path: 'leaders-role',
        name:'RolePage',
        component: RolePage,
        meta: { title: 'Celve - Roles' },
      },
      {
        path: 'create-articles',
        name: 'Articles',
        component: CreatePage,
        meta: { title: 'Celve - Create Articles' },
      },
      {
        path: 'read-articles',
        name: 'Article-List',
        component: ArticleList,
        meta: { title: 'Celve - Articles List'},
      },
      {
        path: 'articles/:slug',
        name: 'ArticleDetail',
        component: ArticleDetail,
        meta: { title: 'Celve - Article' },
     },
     {
      path: 'courses/:courseId/modules/:moduleId/lessons/:id',
      name: 'Lesson',
      component: LessonDetail,
      meta: { title: 'Celve - Lessons' },
     },
     {
      path: 'courses',
      name: 'Courses',
      component: CourseList,
      meta: { title: 'Celve - Courses' },

     },
     {
     path: 'courses/:id/modules',
     name: 'Modules',
     component: ModuleList,
     meta: { title: 'Celve - Modules' },
     },

     {
      path: 'courses/:courseId/modules/:moduleId/lessons',
      name: 'LessonList',
      component: LessonList,
      meta: { title: 'Celve - Lessons' },
     },
     {
      path: 'lesson/:id/quiz',
      name: 'QuizPage',
      component: QuizPage,
      meta: { title: 'Celve - Quiz' },
     },
     {
      path: 'know-your-leader',
      name: 'CountyList',
      component: CountyList,
      meta: { title: 'Celve - Leaders' },
     },
     {
      path: 'profile',
      name: 'ProfilePage',
      component: ProfilePage,
      meta: { title: 'Celve - Profile' },
     },
     {
      path:'my-achievements',
      name: 'AchievementPage',
      component: AchievementPage,
      meta: { title: 'Celve - Achievements' },
     }

    ]
  },
  
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token');

  document.title = to.meta.title || 'Celve';

  if (to.meta.requiresAuth && !token) {
    next({ name: 'LoginPage' });
  } else if ((to.name === 'LoginPage' || to.name === 'RegisterPage') && token) {
    next({ name: 'Dashboard' }); 
  } else {
    next();
  }
});

export default router
