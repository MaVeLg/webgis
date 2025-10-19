<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')

async function submit() {
  error.value = ''
  try {
    await auth.login(username.value, password.value)
    const to = (route.query.redirect as string) || '/'
    router.replace(to)
  } catch (_) {
    error.value = 'Login fehlgeschlagen'
  }
}
</script>

<template>
  <div style="display:grid;place-items:center;height:100vh;">
    <form @submit.prevent="submit" style="min-width:280px;padding:1rem;border:1px solid #d1d5db;border-radius:.75rem;background:#fff;">
      <h2 style="margin-top:0;">Login</h2>
      <div style="display:flex;flex-direction:column;gap:.5rem;">
        <input v-model="username" placeholder="Benutzername" autocomplete="username" />
        <input v-model="password" type="password" placeholder="Passwort" autocomplete="current-password" />
        <button class="btn">Einloggen</button>
        <p v-if="error" style="color:#b91c1c">{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.btn{border:1px solid #d1d5db;background:#f3f4f6;padding:.5rem .75rem;border-radius:.5rem;cursor:pointer}
.btn:hover{background:#e5e7eb}
input{padding:.5rem .6rem;border:1px solid #d1d5db;border-radius:.5rem}
</style>

