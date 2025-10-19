// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { pinia } from '../pinia'   
import { useAuthStore } from '../stores/useAuthStore'

// Views (lazy geladen)
const LoginView = () => import('../views/LoginView.vue')
const MapView   = () => import('../views/MapView.vue')

const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'login', component: LoginView },
  { path: '/', name: 'home', component: MapView, meta: { requiresAuth: true } },
  // optionaler Catch-All:
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } },
})

// Auth-Guard: prüft Session via Store (/auth/me)
router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true

  const auth = useAuthStore(pinia)
  if (!auth.ready) {
    try { await auth.check() } catch { /* ignore */ }
  }
  if (!auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  return true
})

export default router

