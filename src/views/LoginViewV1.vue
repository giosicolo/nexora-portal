<template>
  <div class="login-page">

    <!-- Decorative background grid -->
    <div class="bg-grid"></div>

    <!-- Top bar -->
    <header class="topbar">
      <div class="logo">
        <span class="logo-icon">◈</span>
        <span class="logo-name">NEXORA CORP.</span>
      </div>
      <span class="topbar-tag">Portal de acceso</span>
    </header>

    <!-- Login card -->
    <main class="login-wrapper">
      <div class="login-card" :class="{ 'shake': shakeError }">

        <div class="card-header">
          <p class="card-eyebrow">Sistema interno</p>
          <h1 class="card-title">Iniciar sesión</h1>
          <p class="card-subtitle">Ingresá tus credenciales corporativas para continuar.</p>
        </div>

        <form class="login-form" @submit.prevent="handleLogin">

          <div class="field-group">
            <label class="field-label" for="username">Usuario</label>
            <div class="field-wrapper" :class="{ 'focused': focusedField === 'username', 'has-error': errorMsg }">
              <span class="field-icon">_</span>
              <input
                id="username"
                v-model="username"
                type="text"
                class="field-input"
                placeholder="usuario@nexora.com"
                autocomplete="off"
                @focus="focusedField = 'username'"
                @blur="focusedField = ''"
              />
            </div>
          </div>

          <div class="field-group">
            <label class="field-label" for="password">Contraseña</label>
            <div class="field-wrapper" :class="{ 'focused': focusedField === 'password', 'has-error': errorMsg }">
              <span class="field-icon">*</span>
              <input
                id="password"
                v-model="password"
                :type="showPass ? 'text' : 'password'"
                class="field-input"
                placeholder="••••••••"
                @focus="focusedField = 'password'"
                @blur="focusedField = ''"
              />
              <button type="button" class="toggle-pass" @click="showPass = !showPass">
                {{ showPass ? 'ocultar' : 'mostrar' }}
              </button>
            </div>
          </div>

          <transition name="error-slide">
            <div v-if="errorMsg" class="error-msg">
              <span class="error-icon">!</span> {{ errorMsg }}
            </div>
          </transition>

          <button class="submit-btn" type="submit" :disabled="loading">
            <span v-if="!loading">Ingresar al sistema</span>
            <span v-else class="loading-dots">
              <span>.</span><span>.</span><span>.</span>
            </span>
          </button>

        </form>

        <footer class="card-footer">
          <span>¿Olvidaste tu contraseña?</span>
          <a href="#" @click.prevent>Contactá a IT</a>
        </footer>
      </div>

      <!-- Side decoration -->
      <div class="side-deco">
        <div class="deco-line"></div>
        <p class="deco-text">v2.4.1 — Acceso seguro</p>
        <div class="deco-line"></div>
      </div>
    </main>

    <!-- Bottom bar -->
    <footer class="bottom-bar">
      <span>© 2025 Nexora Corp. Todos los derechos reservados.</span>
      <span>Política de privacidad · Términos de uso</span>
    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { setAuthenticated } from '../router/index.js'

const router = useRouter()

// ─── CAMBIÁ ESTAS CREDENCIALES ───────────────────────────
const SECRET_USER = 'cami'
const SECRET_PASS = 'conejita'
// ─────────────────────────────────────────────────────────

const username = ref('')
const password = ref('')
const errorMsg = ref('')
const shakeError = ref(false)
const focusedField = ref('')
const showPass = ref(false)
const loading = ref(false)

async function handleLogin() {
  errorMsg.value = ''
  loading.value = true

  // Pequeño delay para que parezca que "verifica"
  await new Promise(r => setTimeout(r, 900))

  if (username.value === SECRET_USER && password.value === SECRET_PASS) {
    setAuthenticated(true)
    router.push('/propuesta')
  } else {
    loading.value = false
    errorMsg.value = 'Credenciales inválidas. Verificá tus datos.'
    shakeError.value = true
    setTimeout(() => { shakeError.value = false }, 600)
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--cream);
  position: relative;
  overflow: hidden;
}

/* Background grid */
.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(196,117,106,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(196,117,106,0.06) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}

/* Top bar */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  border-bottom: 1px solid var(--border);
  position: relative;
  z-index: 1;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'DM Mono', monospace;
  font-weight: 400;
  letter-spacing: 0.15em;
  font-size: 13px;
}

.logo-icon {
  color: var(--rose);
  font-size: 18px;
}

.logo-name {
  color: var(--charcoal);
}

.topbar-tag {
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--soft-gray);
  text-transform: uppercase;
}

/* Login wrapper */
.login-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  position: relative;
  z-index: 1;
  gap: 60px;
}

/* Card */
.login-card {
  width: 100%;
  max-width: 420px;
  background: var(--warm-white);
  border: 1px solid var(--border);
  padding: 48px 44px;
  position: relative;
}

.login-card::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--rose);
}

.shake {
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
}

/* Card header */
.card-eyebrow {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--rose);
  margin-bottom: 10px;
}

.card-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 34px;
  font-weight: 300;
  color: var(--charcoal);
  margin-bottom: 8px;
  line-height: 1.1;
}

.card-subtitle {
  font-size: 12px;
  color: var(--soft-gray);
  line-height: 1.6;
  margin-bottom: 36px;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field-label {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--soft-gray);
}

.field-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid var(--border);
  background: var(--cream);
  transition: border-color 0.2s, background 0.2s;
  padding: 0 14px;
  gap: 10px;
}

.field-wrapper.focused {
  border-color: var(--rose);
  background: var(--warm-white);
}

.field-wrapper.has-error {
  border-color: #c4756a88;
}

.field-icon {
  color: var(--rose);
  font-size: 16px;
  font-family: 'DM Mono', monospace;
  flex-shrink: 0;
}

.field-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  color: var(--charcoal);
  padding: 13px 0;
  letter-spacing: 0.03em;
}

.field-input::placeholder {
  color: #bbb;
}

.toggle-pass {
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  color: var(--soft-gray);
  letter-spacing: 0.05em;
  padding: 0;
  transition: color 0.2s;
}

.toggle-pass:hover {
  color: var(--rose);
}

/* Error */
.error-msg {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--deep-rose);
  background: rgba(196,117,106,0.08);
  border-left: 2px solid var(--rose);
  padding: 10px 14px;
}

.error-icon {
  font-weight: bold;
}

.error-slide-enter-active,
.error-slide-leave-active {
  transition: all 0.3s ease;
}
.error-slide-enter-from,
.error-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Submit button */
.submit-btn {
  background: var(--charcoal);
  color: var(--cream);
  border: none;
  padding: 15px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 6px;
  transition: background 0.2s;
  min-height: 48px;
}

.submit-btn:hover:not(:disabled) {
  background: var(--deep-rose);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-dots span {
  animation: blink 1.2s infinite;
  font-size: 20px;
}
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
}

/* Card footer */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  font-size: 11px;
  color: var(--soft-gray);
}

.card-footer a {
  color: var(--rose);
  text-decoration: none;
}

/* Side decoration */
.side-deco {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  opacity: 0.4;
}

.deco-line {
  width: 1px;
  height: 80px;
  background: var(--rose);
}

.deco-text {
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--soft-gray);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

/* Bottom bar */
.bottom-bar {
  display: flex;
  justify-content: space-between;
  padding: 16px 40px;
  border-top: 1px solid var(--border);
  font-size: 10px;
  color: var(--soft-gray);
  letter-spacing: 0.05em;
  position: relative;
  z-index: 1;
}

@media (max-width: 600px) {
  .topbar { padding: 16px 20px; }
  .login-card { padding: 32px 24px; }
  .side-deco { display: none; }
  .bottom-bar { flex-direction: column; gap: 4px; padding: 16px 20px; }
}
</style>
