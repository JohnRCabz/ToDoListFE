import LandingView from '@/views/LandingView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AdminDashboard from '@/views/Admin/AdminDashboard.vue'
import UserDashboard from '@/views/User/UserDashboard.vue'
import TaskView from '@/views/Task/TaskView.vue'
import AdminProfile from '@/views/Admin/AdminProfile.vue'
import AdminUser from '@/views/Admin/AdminUser.vue'
import AdminTask from '@/views/Admin/AdminTask.vue'
import UserProfile from '@/views/User/UserProfile.vue'
/**
 * routes
 *
 * @var [type]
 */
const routes = [
  {
    path: '/',
    name: 'index',
    component: LandingView,
    meta: { requiresGuest: true },
  },
  {
    path: '/admin/dashboard',
    name: 'admin.dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, user_type: 1 },
  },
  {
    path: '/admin/profile',
    name: 'admin.profile',
    component: AdminProfile,
    meta: { requiresAuth: true, user_type: 1 },
  },
  {
    path: '/admin/users',
    name: 'admin.users',
    component: AdminUser,
    meta: { requiresAuth: true, user_type: 1 },
  },
  {
    path: '/admin/tasks',
    name: 'admin.tasks',
    component: TaskView,
    meta: { requiresAuth: true, user_type: 1 },
  },
  {
    path: '/user/dashboard',
    name: 'user.dashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, user_type: 2 },
  },
  {
    path: '/user/profile',
    name: 'user.profile',
    component: UserProfile,
    meta: { requiresAuth: true, user_type: 2 },
  },
  {
    path: '/user/tasks',
    name: 'tasks',
    component: TaskView,
    meta: { requiresAuth: true, user_type: 2 },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (!auth.token) auth.loadStoredAuth()

  const isLoggedIn = auth.isAuthenticated
  const userType = auth.user?.user_type

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'index' })
  }

  if (to.meta.requiresGuest && isLoggedIn) {
    if (userType === 1) return next({ name: 'admin.dashboard' })
    if (userType === 2) return next({ name: 'user.dashboard' })
  }

  if (to.meta.requiresAuth && to.meta.user_type && to.meta.user_type !== userType) {
    if (userType === 1) return next({ name: 'admin.dashboard' })
    if (userType === 2) return next({ name: 'user.dashboard' })
  }

  next()
})

export default router
