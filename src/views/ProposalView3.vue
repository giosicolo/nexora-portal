<template>
  <div class="proposal-page">

    <!-- Floating petals background -->
    <div class="petals-bg">
      <span v-for="p in petals" :key="p.id" class="petal" :style="p.style">❀</span>
    </div>

    <!-- Header -->
    <header class="proposal-header" :class="{ 'visible': revealed }">
      <p class="header-eyebrow">{{ currentDate }}</p>
      <h1 class="header-title">Para <em>{{ recipientName }}</em></h1>
      <div class="header-divider"><span>✦</span></div>
    </header>

    <section class="book-section" :class="{ 'visible': revealed }">

      <!-- ══════════════════════════════════════════════
           MODO MÓVIL: una página por vez
           ══════════════════════════════════════════════ -->
      <div v-if="isMobile" class="mobile-book">

        <div class="mobile-page-counter">
          Página {{ currentPage + 1 }} de {{ allPages.length }}
        </div>

        <!-- Página única con animación de slide -->
        <div
          class="mobile-page"
          :class="mobilePageClass"
          :key="currentPage"
        >
          <div class="page-inner">
            <div class="page-number left">{{ currentPage + 1 }}</div>
            <div class="page-content">
              <PageContent :page="allPages[currentPage]" :answered="answered" :noStyle="noStyle" @yes="handleYes" @no-hover="moveNoButton" />
            </div>
          </div>
          <!-- Corner ornament -->
          <div class="mobile-corner-tl"></div>
          <div class="mobile-corner-br"></div>
        </div>

        <!-- Nav móvil -->
        <div class="book-nav">
          <button class="nav-btn" :disabled="currentPage === 0 || isFlipping" @click="mobilePrev">
            ← Anterior
          </button>
          <div class="spread-dots">
            <span
              v-for="(p, i) in allPages" :key="i"
              class="spread-dot" :class="{ active: i === currentPage }"
              @click="mobileJump(i)"
            ></span>
          </div>
          <button class="nav-btn" :disabled="currentPage === allPages.length - 1 || isFlipping" @click="mobileNext">
            Siguiente →
          </button>
        </div>

      </div>

      <!-- ══════════════════════════════════════════════
           MODO DESKTOP: libro doble
           ══════════════════════════════════════════════ -->
      <template v-else>

        <div class="page-counter">
          {{ currentSpread + 1 }} / {{ spreads.length }}
        </div>

        <div class="book-wrapper">

          <!-- Left page -->
          <div class="book-page left-page"
            :class="{
              'flipping-out-left':  isFlipping && flipDirection === 'next',
              'flipping-in-left':   isFlipping && flipDirection === 'prev'
            }"
          >
            <div class="page-inner">
              <div class="page-number left">{{ currentSpread * 2 + 1 }}</div>
              <div class="page-content">
                <PageContent :page="spreads[currentSpread].left" :answered="answered" :noStyle="noStyle" @yes="handleYes" @no-hover="moveNoButton" />
              </div>
            </div>
            <div class="page-shadow-left"></div>
          </div>

          <div class="book-spine"></div>

          <!-- Right page -->
          <div class="book-page right-page"
            :class="{
              'flipping-out-right': isFlipping && flipDirection === 'next',
              'flipping-in-right':  isFlipping && flipDirection === 'prev'
            }"
          >
            <div class="page-inner">
              <div class="page-number right">{{ currentSpread * 2 + 2 }}</div>
              <div class="page-content">
                <PageContent :page="spreads[currentSpread].right" :answered="answered" :noStyle="noStyle" @yes="handleYes" @no-hover="moveNoButton" />
              </div>
            </div>
            <div class="page-shadow-right"></div>
          </div>

        </div>

        <!-- Nav desktop -->
        <div class="book-nav">
          <button class="nav-btn" :disabled="currentSpread === 0 || isFlipping" @click="goTo('prev')">
            ← Anterior
          </button>
          <div class="spread-dots">
            <span
              v-for="(s, i) in spreads" :key="i"
              class="spread-dot" :class="{ active: i === currentSpread }"
              @click="jumpTo(i)"
            ></span>
          </div>
          <button class="nav-btn" :disabled="currentSpread === spreads.length - 1 || isFlipping" @click="goTo('next')">
            Siguiente →
          </button>
        </div>

      </template>

    </section>

    <footer class="proposal-footer">
      <span>Hecho con ♥ y mucho código</span>
    </footer>

  </div>
</template>

<!-- ─────────────────────────────────────────────────────────
     Sub-componente inline: renderiza el contenido de una página
     ───────────────────────────────────────────────────────── -->
<script>
import { defineComponent, h, resolveComponent } from 'vue'

// Componente para renderizar cualquier tipo de página
const PageContent = defineComponent({
  name: 'PageContent',
  props: {
    page:     { type: Object,  required: true },
    answered: { type: String,  default: null  },
    noStyle:  { type: Object,  default: () => ({}) },
  },
  emits: ['yes', 'no-hover'],
  setup(props, { emit }) {
    return () => {
      const p = props.page

      if (p.type === 'cover') {
        return h('div', { class: 'cover-content' }, [
          h('p',   { class: 'cover-eyebrow'  }, p.eyebrow),
          h('h2',  { class: 'cover-title'    }, p.title),
          h('div', { class: 'cover-ornament' }, '✦ ✦ ✦'),
          h('p',   { class: 'cover-subtitle' }, p.subtitle),
        ])
      }

      if (p.type === 'photo') {
        return h('div', { class: 'photo-container' }, [
          h('img', {
            src: p.src, alt: p.caption, class: 'page-photo',
            onError: (e) => { e.target.style.display = 'none' }
          }),
          h('div', { class: 'photo-fallback' }, [
            h('span', { class: 'ph-icon'  }, '📷'),
            h('span', { class: 'ph-label' }, p.file),
          ]),
          h('p', { class: 'photo-caption-book' }, p.caption),
        ])
      }

      if (p.type === 'text') {
        return h('div', { class: 'text-page-content' }, [
          p.title     ? h('h3', { class: 'text-title' }, p.title) : null,
          ...(p.paragraphs || []).map((para, i) =>
            h('p', { class: 'text-body', key: i }, para)
          ),
          p.signature ? h('p', { class: 'text-signature' }, '— ' + p.signature) : null,
        ])
      }

      if (p.type === 'proposal') {
        const answered = props.answered
        return h('div', { class: 'text-page-content' }, [
          p.title ? h('h3', { class: 'text-title proposal-title' }, p.title) : null,
          ...(p.paragraphs || []).map((para, i) =>
            h('p', { class: 'text-body', key: i }, para)
          ),
          h('div', { class: 'proposal-actions' }, [
            h('button', {
              class: ['btn-yes', answered === 'yes' ? 'clicked' : ''],
              onClick: () => emit('yes'),
            }, answered !== 'yes' ? '💌 Sí, quiero' : '🎉 ¡Lo sabía!'),
            h('button', {
              class: 'btn-no',
              style: props.noStyle,
              onMouseover: () => emit('no-hover'),
            }, 'Todavía no...'),
          ]),
          answered === 'yes'
            ? h('p', { class: 'celeb-text' }, '🌸 ¡Sos lo más lindo que me pasó!')
            : null,
        ])
      }

      return null
    }
  }
})

export default { components: { PageContent } }
</script>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ✏️ PERSONALIZÁ ESTE DATO
const recipientName = ref('Mi amor')

// ════════════════════════════════════════════════════════════
//  CONTENIDO DEL LIBRO
// ════════════════════════════════════════════════════════════
const spreads = [

  // ── SPREAD 1 ── Portada + Foto 1
  {
    left: {
      type: 'cover',
      eyebrow: 'Una historia para vos',
      title: 'Nuestros\nMomentos',
      subtitle: 'Un libro hecho con amor',
    },
    right: {
      type: 'photo',
      src: "/photos/foto1.jpg",
      file: 'foto1.jpg',
      caption: 'El primer día que te vi',
    },
  },

  // ── SPREAD 2 ── Texto + Foto 2
  {
    left: {
      type: 'text',
      title: 'El principio',
      paragraphs: [
        'Hay momentos que uno no sabe que van a cambiar todo. Este fue uno de ellos.',
        'Desde que te conocí, algo en mí empezó a funcionar diferente. Como cuando deployás código y de repente todo compila sin errores.',
      ],
      signature: 'Tu programador favorito',
    },
    right: {
      type: 'photo',
      src: '/photos/foto2.jpg',
      file: 'foto2.jpg',
      caption: 'Momentos que guardo',
    },
  },

  // ── SPREAD 3 ── Foto 3 + Texto
  {
    left: {
      type: 'photo',
      src: '/photos/foto3.jpg',
      file: 'foto3.jpg',
      caption: 'Sonrisas que recuerdo',
    },
    right: {
      type: 'text',
      title: 'Lo que me gusta de vos',
      paragraphs: [
        'Tu forma de reírte. Esa en la que cerrás los ojos cuando algo te parece muy gracioso.',
        'Cómo escuchás cuando algo te importa. Y cómo lo hacés saber sin decir nada.',
      ],
    },
  },

  // ── SPREAD 4 ── Texto + Foto 4
  {
    left: {
      type: 'text',
      title: 'Cosas que quiero',
      paragraphs: [
        'Quiero seguir teniendo excusas para hablarte.',
        'Quiero conocer más de vos. Tus planes, tus miedos, tus historias favoritas.',
        'Quiero que sepas que me importás mucho más de lo que sé decir con palabras.',
      ],
    },
    right: {
      type: 'photo',
      src: '/photos/foto4.jpg',
      file: 'foto4.jpg',
      caption: 'Mi momento favorito',
    },
  },

  // ── SPREAD 5 ── Foto 5 + Propuesta
  {
    left: {
      type: 'photo',
      src: '/photos/foto5.jpg',
      file: 'foto5.jpg',
      caption: 'Instantes únicos',
    },
    right: {
      type: 'proposal',
      title: '¿Querés ser mi novia?',
      paragraphs: [
        'Si llegaste hasta acá, ya sabés cómo me sentí escribiendo cada página.',
        'Solo me falta saber si querés que sigamos escribiendo juntos.',
      ],
    },
  },
]

// Lista plana de todas las páginas (para móvil)
const allPages = computed(() => spreads.flatMap(s => [s.left, s.right]))

// ── Estado ──────────────────────────────────────────────────
const isMobile      = ref(false)
const currentSpread = ref(0)   // desktop
const currentPage   = ref(0)   // móvil
const isFlipping    = ref(false)
const flipDirection = ref('next')
const mobileDir     = ref('next')  // 'next' | 'prev'
const revealed      = ref(false)
const answered      = ref(null)
const celebIndex    = ref(0)
const noStyle       = reactive({ position: 'relative', left: '0px', top: '0px' })

const currentDate = new Date().toLocaleDateString('es-AR', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

const celebrationMessages = [
  '🌸 ¡Sos lo más lindo que me pasó!',
  '✨ Prometo hacerte sonreír cada día.',
  '💕 El mejor bug que nunca voy a querer fixear.',
  '🚀 ¡A deployar nuestra historia juntos!',
]

// Clase de animación para la página móvil
const mobilePageClass = computed(() => ({
  'mobile-slide-in-right': isFlipping.value && mobileDir.value === 'next',
  'mobile-slide-in-left':  isFlipping.value && mobileDir.value === 'prev',
}))

const petals = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  style: {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 8}s`,
    animationDuration: `${6 + Math.random() * 8}s`,
    fontSize: `${10 + Math.random() * 12}px`,
    opacity: 0.12 + Math.random() * 0.25,
  }
}))

// ── Detección de móvil ───────────────────────────────────────
function checkMobile() {
  isMobile.value = window.innerWidth < 700
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  setTimeout(() => { revealed.value = true }, 200)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// ── Navegación desktop ───────────────────────────────────────
async function goTo(direction) {
  if (isFlipping.value) return
  const next = direction === 'next' ? currentSpread.value + 1 : currentSpread.value - 1
  if (next < 0 || next >= spreads.length) return
  flipDirection.value = direction
  isFlipping.value    = true
  await new Promise(r => setTimeout(r, 420))
  currentSpread.value = next
  isFlipping.value    = false
}

async function jumpTo(index) {
  if (isFlipping.value || index === currentSpread.value) return
  flipDirection.value = index > currentSpread.value ? 'next' : 'prev'
  isFlipping.value    = true
  await new Promise(r => setTimeout(r, 420))
  currentSpread.value = index
  isFlipping.value    = false
}

// ── Navegación móvil ─────────────────────────────────────────
async function mobileTo(index) {
  if (isFlipping.value || index === currentPage.value) return
  mobileDir.value  = index > currentPage.value ? 'next' : 'prev'
  isFlipping.value = true
  await new Promise(r => setTimeout(r, 350))
  currentPage.value = index
  isFlipping.value  = false
}

const mobileNext = () => mobileTo(currentPage.value + 1)
const mobilePrev = () => mobileTo(currentPage.value - 1)
const mobileJump = (i) => mobileTo(i)

// ── Handlers ─────────────────────────────────────────────────
function handleYes() {
  answered.value   = 'yes'
  celebIndex.value = Math.floor(Math.random() * celebrationMessages.length)
  launchConfetti()
}

function moveNoButton() {
  noStyle.left = (Math.random() - 0.5) * 220 + 'px'
  noStyle.top  = (Math.random() - 0.5) * 100 + 'px'
}

function launchConfetti() {
  const colors = ['#e8c4b8','#c4756a','#8b3a3a','#faf6f0','#f9c6d0']
  for (let i = 0; i < 70; i++) {
    const el = document.createElement('div')
    el.style.cssText = `
      position:fixed; top:-10px;
      left:${Math.random()*100}vw;
      width:${4+Math.random()*8}px; height:${4+Math.random()*8}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${Math.random()>.5?'50%':'0'};
      animation:confettiFall ${1.5+Math.random()*2}s ease forwards;
      animation-delay:${Math.random()*.5}s;
      z-index:9999; pointer-events:none;
    `
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 4000)
  }
}
</script>

<style scoped>
/* ── Page shell ──────────────────────────────────────────── */
.proposal-page {
  min-height: 100vh;
  display: flex; flex-direction: column; align-items: center;
  padding: 0 0 60px;
  position: relative; overflow-x: hidden;
}

/* ── Petals ──────────────────────────────────────────────── */
.petals-bg { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
.petal     { position:absolute; top:-20px; color:var(--rose); animation:floatDown linear infinite; }
@keyframes floatDown {
  0%   { transform:translateY(-20px) rotate(0deg);   opacity:0; }
  10%  { opacity:1; }
  90%  { opacity:0.8; }
  100% { transform:translateY(110vh) rotate(360deg); opacity:0; }
}

/* ── Header reveal ───────────────────────────────────────── */
.proposal-header,
.book-section {
  opacity:0; transform:translateY(28px);
  transition:opacity .9s ease, transform .9s ease;
  position:relative; z-index:1; width:100%;
}
.book-section { transition-delay:.3s; }
.proposal-header.visible,
.book-section.visible { opacity:1; transform:translateY(0); }

.proposal-header { text-align:center; padding:50px 20px 32px; }
.header-eyebrow  { font-size:11px; letter-spacing:.15em; text-transform:uppercase; color:var(--soft-gray); margin-bottom:16px; }
.header-title    { font-family:'Cormorant Garamond',serif; font-size:clamp(34px,7vw,70px); font-weight:300; color:var(--charcoal); line-height:1.05; }
.header-title em { color:var(--rose); font-style:italic; }
.header-divider  { margin-top:20px; color:var(--rose); font-size:16px; letter-spacing:.5em; }

/* ── Book section ────────────────────────────────────────── */
.book-section {
  display:flex; flex-direction:column; align-items:center;
  gap:24px; padding:0 16px;
  max-width:1000px; margin:0 auto; width:100%;
}
.page-counter { font-size:11px; letter-spacing:.12em; color:var(--soft-gray); text-transform:uppercase; }

/* ════════════════════════════════════════════════════════════
   MODO MÓVIL
   ════════════════════════════════════════════════════════════ */
.mobile-book {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.mobile-page-counter {
  font-size: 11px;
  letter-spacing: .12em;
  color: var(--soft-gray);
  text-transform: uppercase;
}

.mobile-page {
  width: 100%;
  max-width: 360px;
  min-height: 520px;
  background: var(--warm-white);
  border: 1px solid rgba(196,117,106,.22);
  position: relative;
  filter: drop-shadow(0 12px 40px rgba(100,50,40,.15));
  /* Animación de entrada */
  animation: mobilePageAppear .35s ease both;
}

@keyframes mobilePageAppear {
  from { opacity: 0; transform: translateY(16px) scale(.98); }
  to   { opacity: 1; transform: translateY(0)    scale(1);   }
}

/* Línea decorativa superior */
.mobile-page::before {
  content: '';
  position: absolute;
  top: -1px; left: 0;
  width: 50px; height: 3px;
  background: var(--rose);
}

/* Ornamentos de esquina */
.mobile-corner-tl,
.mobile-corner-br {
  position: absolute;
  width: 16px; height: 16px;
}
.mobile-corner-tl {
  top: 10px; left: 10px;
  border-top: 1px solid rgba(196,117,106,.3);
  border-left: 1px solid rgba(196,117,106,.3);
}
.mobile-corner-br {
  bottom: 10px; right: 10px;
  border-bottom: 1px solid rgba(196,117,106,.3);
  border-right: 1px solid rgba(196,117,106,.3);
}

/* Slide animations (se reutiliza la key de Vue para re-animar) */
.mobile-slide-in-right { animation: slideInRight .35s ease both; }
.mobile-slide-in-left  { animation: slideInLeft  .35s ease both; }

@keyframes slideInRight {
  from { opacity:0; transform:translateX(30px); }
  to   { opacity:1; transform:translateX(0); }
}
@keyframes slideInLeft {
  from { opacity:0; transform:translateX(-30px); }
  to   { opacity:1; transform:translateX(0); }
}

/* ════════════════════════════════════════════════════════════
   MODO DESKTOP — libro doble
   ════════════════════════════════════════════════════════════ */
.book-wrapper {
  display:flex; align-items:stretch;
  width:100%; max-width:860px; min-height:480px;
  filter:drop-shadow(0 20px 60px rgba(100,50,40,.18));
  perspective:1200px;
}

.book-page {
  flex:1; position:relative;
  background:var(--warm-white);
  border:1px solid rgba(196,117,106,.2);
  overflow:hidden;
  transition:transform .4s cubic-bezier(.4,0,.2,1), opacity .4s ease;
}
.left-page  { border-right:none; }
.right-page { border-left:none;  }

.flipping-out-left  { transform:rotateY(14deg)  translateX(-10px); opacity:.55; }
.flipping-out-right { transform:rotateY(-14deg) translateX(10px);  opacity:.55; }
.flipping-in-left   { transform:rotateY(-14deg) translateX(-10px); opacity:.55; }
.flipping-in-right  { transform:rotateY(14deg)  translateX(10px);  opacity:.55; }

/* Compartido desktop + móvil */
.page-inner {
  padding:36px 32px 28px;
  height:100%; display:flex; flex-direction:column;
}
.page-number { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.1em; color:rgba(196,117,106,.4); margin-bottom:18px; }
.page-number.left  { text-align:left;  }
.page-number.right { text-align:right; }
.page-content { flex:1; display:flex; flex-direction:column; }

/* Sombras de doblez */
.page-shadow-left  { position:absolute; top:0; right:0; width:18px; height:100%; background:linear-gradient(to right, transparent, rgba(100,50,40,.07)); pointer-events:none; }
.page-shadow-right { position:absolute; top:0; left:0;  width:18px; height:100%; background:linear-gradient(to left,  transparent, rgba(100,50,40,.07)); pointer-events:none; }

/* Lomo */
.book-spine {
  width:14px; flex-shrink:0;
  background:linear-gradient(to right, rgba(139,58,58,.25), rgba(196,117,106,.38), rgba(139,58,58,.25));
  position:relative;
}
.book-spine::before,
.book-spine::after { content:''; position:absolute; left:0; right:0; height:1px; background:rgba(196,117,106,.3); }
.book-spine::before { top:20px;    }
.book-spine::after  { bottom:20px; }

/* ── Contenidos de página (usados en ambos modos) ─────────── */

/* Cover */
.cover-content {
  flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center;
  text-align:center; gap:16px; padding:20px;
  background:linear-gradient(160deg,#faf0eb,#f5e6df);
  border:1px solid rgba(196,117,106,.12); margin:-8px;
}
.cover-eyebrow  { font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:var(--rose); }
.cover-title    { font-family:'Cormorant Garamond',serif; font-size:clamp(24px,4vw,38px); font-weight:300; color:var(--charcoal); line-height:1.2; white-space:pre-line; }
.cover-ornament { color:var(--blush); font-size:12px; letter-spacing:.4em; }
.cover-subtitle { font-size:11px; color:var(--soft-gray); font-style:italic; letter-spacing:.05em; }

/* Photo */
.photo-container { flex:1; display:flex; flex-direction:column; gap:10px; position:relative; min-height:200px; }
.page-photo      { flex:1; width:100%; object-fit:cover; display:block; min-height:0; border:1px solid rgba(196,117,106,.1); }
.photo-fallback  {
  position:absolute; inset:0 0 36px 0;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;
  background:linear-gradient(135deg,#f5ebe6,#ede0da); pointer-events:none;
}
.ph-icon  { font-size:26px; opacity:.45; }
.ph-label { font-size:10px; letter-spacing:.08em; color:var(--soft-gray); font-family:'DM Mono',monospace; }
.photo-caption-book { font-family:'Cormorant Garamond',serif; font-size:12px; font-style:italic; color:var(--soft-gray); text-align:center; flex-shrink:0; }

/* Text */
.text-page-content { flex:1; display:flex; flex-direction:column; gap:14px; justify-content:center; padding:8px 4px; }
.text-title        { font-family:'Cormorant Garamond',serif; font-size:clamp(18px,3vw,24px); font-weight:300; color:var(--charcoal); line-height:1.2; margin-bottom:4px; }
.text-body         { font-size:13px; line-height:1.85; color:#5a5a5a; font-style:italic; }
.text-signature    { font-size:12px; color:var(--rose); font-style:italic; margin-top:8px; letter-spacing:.04em; }

/* Proposal */
.proposal-title { font-family:'Cormorant Garamond',serif; font-size:clamp(20px,3.5vw,28px) !important; }
.proposal-actions {
  display:flex; flex-direction:column; gap:10px;
  align-items:flex-start; margin-top:16px;
  position:relative; min-height:110px;
}
.btn-yes {
  background:var(--rose); color:white; border:none;
  padding:12px 24px;
  font-family:'Cormorant Garamond',serif; font-size:16px; font-style:italic;
  cursor:pointer; transition:background .2s, transform .2s;
}
.btn-yes:hover:not(.clicked) { background:var(--deep-rose); transform:scale(1.03); }
.btn-yes.clicked { background:var(--deep-rose); }
.btn-no {
  background:transparent; color:var(--soft-gray);
  border:1px solid var(--border); padding:10px 18px;
  font-family:'DM Mono',monospace; font-size:11px;
  cursor:pointer; transition:left .15s ease, top .15s ease;
  position:relative; letter-spacing:.05em;
}
.btn-no:hover { color:var(--rose); }
.celeb-text { font-family:'Cormorant Garamond',serif; font-size:17px; font-style:italic; color:var(--rose); margin-top:8px; line-height:1.5; }

/* ── Navegación (compartida) ─────────────────────────────── */
.book-nav { display:flex; align-items:center; gap:20px; }
.nav-btn {
  background:transparent; border:1px solid var(--border);
  color:var(--soft-gray); font-family:'DM Mono',monospace;
  font-size:11px; letter-spacing:.08em;
  padding:10px 20px; cursor:pointer; min-width:105px;
  transition:color .2s, border-color .2s, background .2s;
}
.nav-btn:hover:not(:disabled) { color:var(--charcoal); border-color:var(--rose); background:rgba(196,117,106,.06); }
.nav-btn:disabled { opacity:.3; cursor:not-allowed; }

.spread-dots { display:flex; gap:7px; align-items:center; flex-wrap:wrap; justify-content:center; max-width:200px; }
.spread-dot  { width:7px; height:7px; border-radius:50%; background:var(--blush); cursor:pointer; transition:background .2s, transform .2s; flex-shrink:0; }
.spread-dot.active { background:var(--rose); transform:scale(1.3); }
.spread-dot:hover  { background:var(--rose); }

/* ── Footer ──────────────────────────────────────────────── */
.proposal-footer { margin-top:50px; font-size:11px; letter-spacing:.1em; color:var(--soft-gray); position:relative; z-index:1; }

/* ── Ajuste de padding en móvil ──────────────────────────── */
@media (max-width: 700px) {
  .page-inner { padding:28px 24px 22px; }
  .book-nav   { gap:12px; }
  .nav-btn    { min-width:90px; padding:9px 14px; font-size:10px; }
}
</style>

<style>
@keyframes confettiFall {
  to { transform:translateY(110vh) rotate(720deg); opacity:0; }
}
</style>