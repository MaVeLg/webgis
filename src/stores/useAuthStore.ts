import { defineStore } from 'pinia'

type User = { name?: string; email?: string; user?: string } | null

export const useAuthStore = defineStore('auth', {
  state: () => ({
    ready: false,
    isLoggedIn: false,
    user: null as User
  }),
  actions: {
    async check() {
      try {
        const r = await fetch('/auth/me', { credentials: 'include' })
        if (r.ok) {
          const data = await r.json()
          this.user = data
          this.isLoggedIn = true
        } else {
          this.user = null
          this.isLoggedIn = false
        }
      } catch (_) {
        this.user = null
        this.isLoggedIn = false
      } finally {
        this.ready = true
      }
    },
    async login(username: string, password: string) {
      const r = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      })
      if (!r.ok) throw new Error('Login failed')
      this.isLoggedIn = true
      this.user = await r.json()
    },
    async logout() {
      await fetch('/auth/logout', { method: 'POST', credentials: 'include' })
      this.isLoggedIn = false
      this.user = null
    }
  }
})

