import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // 🔴 هذا السطر هو الحل السحري! يخبر البرنامج أن يبحث عن الملفات في نفس المجلد
})