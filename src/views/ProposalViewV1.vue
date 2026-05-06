<template>
  <div class="proposal-page">

    <!-- Floating petals background -->
    <div class="petals-bg">
      <span v-for="p in petals" :key="p.id" class="petal" :style="p.style">❀</span>
    </div>

    <!-- Header with greeting -->
    <header class="proposal-header" :class="{ 'visible': revealed }">
      <p class="header-eyebrow">{{ currentDate }}</p>
      <h1 class="header-title">
        Para <em>{{ recipientName }}</em>
      </h1>
      <div class="header-divider">
        <span>✦</span>
      </div>
    </header>

    <!-- Photo collage -->
    <section class="collage-section" :class="{ 'visible': revealed }">
      <div class="collage-grid">

        <div class="photo-card large" style="--delay: 0.1s">
          <div class="photo-frame">
            <!-- Reemplazá el src con tus fotos -->
            <img src="../photos/foto1.jpg" alt="Recuerdo 1" @error="handleImgError" />
            <div class="photo-placeholder" v-if="true">
              <span class="ph-icon">📷</span>
              <span class="ph-text">foto1.jpg</span>
            </div>
          </div>
          <p class="photo-caption">El primer día que te vi</p>
        </div>

        <div class="photo-card" style="--delay: 0.2s">
          <div class="photo-frame">
            <img src="../photos/foto2.jpg" alt="Recuerdo 2" @error="handleImgError" />
            <div class="photo-placeholder">
              <span class="ph-icon">📷</span>
              <span class="ph-text">foto2.jpg</span>
            </div>
          </div>
          <p class="photo-caption">Momentos que guardo</p>
        </div>

        <div class="photo-card" style="--delay: 0.3s">
          <div class="photo-frame">
            <img src="../photos/foto3.jpg" alt="Recuerdo 3" @error="handleImgError" />
            <div class="photo-placeholder">
              <span class="ph-icon">📷</span>
              <span class="ph-text">foto3.jpg</span>
            </div>
          </div>
          <p class="photo-caption">Sonrisas que recuerdo</p>
        </div>

        <div class="photo-card tall" style="--delay: 0.4s">
          <div class="photo-frame">
            <img src="../photos/foto4.jpg" alt="Recuerdo 4" @error="handleImgError" />
            <div class="photo-placeholder">
              <span class="ph-icon">📷</span>
              <span class="ph-text">foto4.jpg</span>
            </div>
          </div>
          <p class="photo-caption">Mi momento favorito</p>
        </div>

        <div class="photo-card" style="--delay: 0.5s">
          <div class="photo-frame">
            <img src="../photos/foto5.jpg" alt="Recuerdo 5" @error="handleImgError" />
            <div class="photo-placeholder">
              <span class="ph-icon">📷</span>
              <span class="ph-text">foto5.jpg</span>
            </div>
          </div>
          <p class="photo-caption">Instantes únicos</p>
        </div>

      </div>
    </section>

    <!-- The Proposal -->
    <section class="proposal-section" :class="{ 'visible': revealed }">
      <div class="proposal-card">

        <p class="proposal-from">— De parte de {{ senderName }}</p>

        <h2 class="proposal-question">
          ¿Querés ser<br/><em>mi novia?</em>
        </h2>

        <!-- Mensaje personalizado -->
        <p class="proposal-text">
          Sé que soy un programador, y probablemente esta no sea la forma más convencional de decírtelo...
          pero quería que supieras que cada línea de código que escribí acá fue pensando en vos.
          <br/><br/>
          <!-- ✏️ EDITÁ este mensaje a tu gusto -->
          Me gustás mucho. Tu sonrisa, tu forma de ser, cada pequeña cosa que hacés.
          Y quiero que seamos algo más.
        </p>

        <div class="proposal-actions">
          <button
            class="btn-yes"
            :class="{ 'clicked': answered === 'yes' }"
            @click="handleYes"
          >
            <span v-if="answered !== 'yes'">💌 Sí, quiero</span>
            <span v-else>🎉 ¡Sabía que ibas a decir que sí!</span>
          </button>

          <button
            class="btn-no"
            :style="noStyle"
            @mouseover="moveNoButton"
            @click="handleNo"
          >
            Todavía no...
          </button>
        </div>

        <transition name="celebration">
          <div v-if="answered === 'yes'" class="celebration-msg">
            <p class="celeb-text">{{ celebrationMessages[celebIndex] }}</p>
          </div>
        </transition>

      </div>
    </section>

    <footer class="proposal-footer">
      <span>Hecho con ♥ y mucho código</span>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'

// ✏️ PERSONALIZÁ ESTOS DATOS
const recipientName = ref('Mi amor')    // Nombre de quien recibe
const senderName = ref('Tu programador') // Tu nombre o apodo

const revealed = ref(false)
const answered = ref(null)
const celebIndex = ref(0)
const noStyle = reactive({ position: 'relative', left: '0px', top: '0px' })

const currentDate = new Date().toLocaleDateString('es-AR', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

const celebrationMessages = [
  '🌸 ¡Sos lo más lindo que me pasó!',
  '✨ Prometo hacerte sonreír cada día.',
  '💕 Este es el mejor bug que nunca voy a querer fixear.',
  '🚀 ¡A deployar nuestra historia juntos!',
]

// Petals animation
const petals = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  style: {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 8}s`,
    animationDuration: `${6 + Math.random() * 8}s`,
    fontSize: `${10 + Math.random() * 14}px`,
    opacity: 0.15 + Math.random() * 0.3,
  }
}))

onMounted(() => {
  setTimeout(() => { revealed.value = true }, 200)
})

function handleYes() {
  answered.value = 'yes'
  celebIndex.value = Math.floor(Math.random() * celebrationMessages.length)
  launchConfetti()
}

function handleNo() {
  // El botón huye del cursor :)
}

function moveNoButton() {
  const x = (Math.random() - 0.5) * 300
  const y = (Math.random() - 0.5) * 150
  noStyle.left = x + 'px'
  noStyle.top = y + 'px'
}

function handleImgError(e) {
  e.target.style.display = 'none'
}

function launchConfetti() {
  const colors = ['#e8c4b8', '#c4756a', '#8b3a3a', '#faf6f0', '#f9c6d0']
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div')
    el.style.cssText = `
      position: fixed;
      top: -10px;
      left: ${Math.random() * 100}vw;
      width: ${4 + Math.random() * 8}px;
      height: ${4 + Math.random() * 8}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      animation: confettiFall ${1.5 + Math.random() * 2}s ease forwards;
      animation-delay: ${Math.random() * 0.5}s;
      z-index: 9999;
      pointer-events: none;
    `
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 4000)
  }
}
</script>

<style scoped>
/* Page */
.proposal-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 60px;
  position: relative;
  overflow-x: hidden;
}

/* Petals */
.petals-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.petal {
  position: absolute;
  top: -20px;
  color: var(--rose);
  animation: floatDown linear infinite;
}

@keyframes floatDown {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.8; }
  100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
}

/* Reveal animation base */
.proposal-header,
.collage-section,
.proposal-section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.9s ease, transform 0.9s ease;
  position: relative;
  z-index: 1;
  width: 100%;
}
.collage-section { transition-delay: 0.3s; }
.proposal-section { transition-delay: 0.6s; }

.proposal-header.visible,
.collage-section.visible,
.proposal-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Header */
.proposal-header {
  text-align: center;
  padding: 60px 20px 40px;
}

.header-eyebrow {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--soft-gray);
  margin-bottom: 20px;
}

.header-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(42px, 8vw, 80px);
  font-weight: 300;
  color: var(--charcoal);
  line-height: 1.05;
}

.header-title em {
  color: var(--rose);
  font-style: italic;
}

.header-divider {
  margin-top: 24px;
  color: var(--rose);
  font-size: 18px;
  letter-spacing: 0.5em;
}

/* Collage */
.collage-section {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
}

.collage-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 240px 280px;
  gap: 14px;
}

.photo-card {
  animation: cardReveal 0.7s ease both;
  animation-delay: var(--delay, 0s);
}

.photo-card.large {
  grid-column: span 2;
}

.photo-card.tall {
  grid-row: span 1;
}

@keyframes cardReveal {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.photo-frame {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--border);
  position: relative;
  background: #f0e8e4;
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.photo-card:hover .photo-frame img {
  transform: scale(1.04);
}

/* Placeholder para cuando no hay fotos */
.photo-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #f5ebe6, #ede0da);
}

.ph-icon { font-size: 28px; opacity: 0.5; }
.ph-text {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--soft-gray);
  font-family: 'DM Mono', monospace;
}

.photo-caption {
  font-family: 'Cormorant Garamond', serif;
  font-size: 13px;
  font-style: italic;
  color: var(--soft-gray);
  text-align: center;
  margin-top: 8px;
}

/* Proposal card */
.proposal-section {
  max-width: 700px;
  margin: 60px auto 0;
  padding: 0 24px;
}

.proposal-card {
  background: var(--warm-white);
  border: 1px solid var(--border);
  padding: 60px 56px;
  text-align: center;
  position: relative;
}

.proposal-card::before,
.proposal-card::after {
  content: '✦';
  position: absolute;
  color: var(--blush);
  font-size: 12px;
}
.proposal-card::before { top: 20px; left: 20px; }
.proposal-card::after { bottom: 20px; right: 20px; }

.proposal-from {
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--soft-gray);
  margin-bottom: 24px;
}

.proposal-question {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(38px, 6vw, 64px);
  font-weight: 300;
  line-height: 1.15;
  color: var(--charcoal);
  margin-bottom: 30px;
}

.proposal-question em {
  color: var(--rose);
  font-style: italic;
}

.proposal-text {
  font-size: 14px;
  line-height: 1.8;
  color: #666;
  max-width: 480px;
  margin: 0 auto 40px;
}

/* Buttons */
.proposal-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  position: relative;
  min-height: 80px;
}

.btn-yes {
  background: var(--rose);
  color: white;
  border: none;
  padding: 16px 36px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-style: italic;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  letter-spacing: 0.02em;
}

.btn-yes:hover:not(.clicked) {
  background: var(--deep-rose);
  transform: scale(1.04);
}

.btn-yes.clicked {
  background: var(--deep-rose);
}

.btn-no {
  background: transparent;
  color: var(--soft-gray);
  border: 1px solid var(--border);
  padding: 16px 28px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: left 0.15s ease, top 0.15s ease, color 0.2s;
  position: relative;
  letter-spacing: 0.05em;
}

.btn-no:hover {
  color: var(--rose);
}

/* Celebration */
.celebration-msg {
  margin-top: 32px;
  padding: 20px;
  border-top: 1px solid var(--border);
}

.celeb-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  font-style: italic;
  color: var(--rose);
}

.celebration-enter-active {
  animation: bounceIn 0.6s ease;
}

@keyframes bounceIn {
  0% { transform: scale(0.8); opacity: 0; }
  60% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}

/* Footer */
.proposal-footer {
  margin-top: 60px;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--soft-gray);
  position: relative;
  z-index: 1;
}

@media (max-width: 700px) {
  .collage-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
  .photo-card.large { grid-column: span 2; }
  .proposal-card { padding: 36px 24px; }
}

@media (max-width: 400px) {
  .collage-grid { grid-template-columns: 1fr; }
  .photo-card.large { grid-column: span 1; }
}
</style>

<style>
@keyframes confettiFall {
  to {
    transform: translateY(110vh) rotate(720deg);
    opacity: 0;
  }
}
</style>
