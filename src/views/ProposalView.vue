<template>
  <div class="proposal-page">

    <!-- Floating petals background -->
    <div class="petals-bg">
      <span v-for="p in petals" :key="p.id" class="petal" :style="p.style">❀</span>
    </div>

    <!-- Header -->
    <header class="proposal-header" :class="{ 'visible': revealed }">
      <p class="header-eyebrow">{{ currentDate }}</p>
      <h1 class="header-title"><em>{{ recipientName }},</em> Queres ser mi novia? </h1>
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
          @click="handlePageClick"
          style="cursor: pointer;"
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
            @click="goTo('prev')"
            style="cursor: pointer;"
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
            @click="goTo('next')"
            style="cursor: pointer;"
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
      <span>♥♥♥ Hecho con mucho amooor ♥♥♥ by Chanchi</span>
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
          onLoad:  (e) => { e.target.nextElementSibling.style.display = 'none' },
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
const base = import.meta.env.BASE_URL

// ✏️ PERSONALIZÁ ESTE DATO
const recipientName = ref('Cami')

const fechaConocidos   = new Date('2025-10-29')  // cuando la conociste
const fechaPrimerMsg   = new Date('2026-02-14T11:30:00')  // primer mensaje
const fecha3  = new Date('2024-03-15')  // cuando la conociste
const fecha4  = new Date('2024-03-15T21:30:00')  // primer mensaje

function diffDias(desde) {
  return Math.floor((Date.now() - desde) / (1000 * 60 * 60 * 24))
}
function diffHoras(desde) {
  return Math.floor((Date.now() - desde) / (1000 * 60 * 60))
}

const diasJuntos  = diffDias(fechaConocidos)
const horasMensaje = diffHoras(fechaPrimerMsg)

// ════════════════════════════════════════════════════════════
//  CONTENIDO DEL LIBRO
// ════════════════════════════════════════════════════════════
const spreads = [

  // ── SPREAD 1 ── Portada + Foto 1
  {
    left: {
      type: 'cover',
      eyebrow: 'MI CONEJITA 🐰',
      title: 'TE AMO\nCAMILA',
  subtitle: 'Este pequeño presentito es, a mi manera,\nuna forma de ayudarme un poco a expresar\nalgo de lo que ya hace ratito vengo con ganas de preguntar.\n \n ME VOLVÉS LOCO CAMILA\n \n No hay momento en que no te esté pensando y\nsoñando en que por siempre seas parte de mi vida ',
    },
    right: {
      type: 'photo',
      src: `${base}photos/foto1.jpeg`,
      file: 'foto1.jpg',
      caption: '-',
    },
  },

  // ── SPREAD 2 ── Texto + Foto 2
  {
    left: {
      type: 'text',
      title: 'MI BONITAAA',
      paragraphs: [
      'Si bien no nos conocemos hace tanto, creo que, si se trata de emociones, el tiempo es algo super relativo',
      'Lo que vos me hacés sentir no tiene nombre, pero esa mezcla de amor, felicidad, el acompañamiento y muchísimas otras cosas más me hacen sentir increíble cuando estoy a tu lado',
      ],
      signature: 'Chanchi',
    },
    right: {
      type: 'photo',
      src: `${base}photos/foto2.jpeg`,
      file: 'foto2.jpg',
      caption: '-',
    },
  },

  // ── SPREAD 3 ── Foto 3 + Texto
  {
    left: {
      type: 'photo',
      src: `${base}photos/foto3.jpeg`,
      file: 'foto3.jpg',
      caption: '-',
    },
    right: {
      type: 'text',
      title: 'Por que me sigo acordando de todo',
      paragraphs: [
      'Acá van unos datitos de los que nunca me olvido, de esos que te hicieron pensar de lo raro que soy y si no te convenía irte corriendo, pero es que, si se trata de vos, es imposible olvidarme de hasta el más mínimo detalle',
      `Pasaron aproximadamente ${diasJuntos} días de que vi esa hermosa carita por primera vez y, aunque no intercambiamos muchas palabras, entraste enseguida a mi cabeza y no pude ni olvidarme de lo que tenías puesto`,
      'Por la madrugada de Navidad tan hermosa que me hiciste pasar, de bajonearme un poco porque no quisieron salir, a volver y encontrarme que seguían ahí y compartir, además de unos jaggers, las primeras charlitas donde empezaba a detectar la linda persona que sos',
      `SI PERDÓN, perdón porque te escribí el primer mensaje hace solo ${horasMensaje} HS y respondiendo una historia DE UN LIBRO, pero gracias por animarte a seguirme la charla y permitir que nos vayamos acercando de una manera tan natural`
],
    },
  },

  // ── SPREAD 4 ── Texto + Foto 4
  {
    left: {
      type: 'text',
      title: 'Por que me sigo acordando de todo p2',
      paragraphs: [
      'Obviamente no voy a dejar pasar la divertida e inolvidable noche en Roca, que tuvo risas, cosas bizarras, pero sobre todo la posibilidad de tomarnos un momentito a solas para lo que iba a ser nuestro primer beso',
      'Apenitas unos días después, llegó el día de compartir por primera vez algo solos, un almuerzo improvisado, donde mientras te esperaba que bajaras del estudio, por dentro me moría de nervios, pero a medida que fuimos charlando me diste tanta tranquilidad, como lo hacés al día de hoy, y me permitís mostrarme tal como soy',
      'Un día que también recuerdo mucho es el día que tuve el valor de preguntarte en el auto qué idea tenías vos para nosotros, para ver si estábamos alineados... después que me costó tanto decirlo, la tranquilidad y felicidad que me dio que tengas ideales y visiones muy parecidas a las mías no lo puedo explicar',
],
    },
    right: {
      type: 'photo',
      src: `${base}photos/foto4.jpeg`,
      file: 'foto4.jpg',
      caption: '-',
    },
  },

  // ── SPREAD 5 ── Foto 5 + Propuesta
  {
    left: {
      type: 'photo',
      src:  `${base}photos/foto5.jpeg`,
      file: 'foto5.jpg',
      caption: '-',
    },
    right: {
      type: 'proposal',
      title: '¿Querés ser mi novia?',
      paragraphs: [
      'Podría llenar varias hojas más de momentos que me encantaron con vos, porque cada juntada que tuvimos fue única y siempre me dejó algo lindo',
      'Pero mi idea de esto es que estos recuerdos sean apenitas una mínima parte de los miles y miles que quiero tener con vos',
      'Esto no es negro o blanco, si es necesario, yo te voy a esperar lo que necesites, pero si algo tenés que saber, Camila, es que yo me muero de ganas de llenarte de amor, acompañarte y cuidarte por muchísimo, pero muchísimo tiempo más'
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
const noStyle       = reactive({ left: '0px', top: '52px' })

const currentDate = new Date().toLocaleDateString('es-AR', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

const celebrationMessages = [
  '🌸 ¡Te quiero muchisimo mi conejitaaaaaaaaa!',
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
  window.scrollTo(0, 0)
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

// Tap en la página móvil para avanzar (excepto en la página de propuesta)
function handlePageClick() {
  const page = allPages.value[currentPage.value]
  if (page?.type === 'proposal') return  // no interferir con los botones de propuesta
  if (currentPage.value < allPages.value.length - 1) {
    mobileNext()
  }
}

// ── Handlers ─────────────────────────────────────────────────
function handleYes() {
  answered.value   = 'yes'
  celebIndex.value = Math.floor(Math.random() * celebrationMessages.length)
  launchConfetti()
}

function moveNoButton() {
  // El contenedor .proposal-actions tiene min-height:130px y ~220px de ancho.
  // Mantenemos el botón dentro de esos límites (top entre 52-90, left entre 0-120).
  const left = Math.floor(Math.random() * 120)
  const top  = Math.floor(52 + Math.random() * 50)
  noStyle.left = left + 'px'
  noStyle.top  = top  + 'px'
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

<style>
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
  overflow:visible;;
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
.cover-subtitle { font-size:11px; color:var(--soft-gray); font-style:italic; letter-spacing:.05em; white-space:pre-line; }

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
  position:relative; min-height:180px;
}
.btn-yes {
  background:transparent; color:var(--charcoal); border:1px solid var(--border);
  padding:10px 20px;
  font-family:'DM Mono',monospace; font-size:11px; letter-spacing:.08em;
  cursor:pointer; min-width:105px;
  transition:color .2s, border-color .2s, background .2s;
  border-radius: 0;
}
.btn-yes:hover:not(.clicked) { color:var(--charcoal); border-color:var(--rose); background:rgba(196,117,106,.06); transform:none; }
.btn-yes.clicked { background:rgba(196,117,106,.06); border-color:var(--rose); color:var(--charcoal); }
.btn-no {
  background:transparent; color:var(--soft-gray);
  border:1px solid var(--border); padding:10px 18px;
  padding:10px 20px; min-width:105px;
  font-family:'DM Mono',monospace; font-size:11px; letter-spacing:.08em;
  cursor:pointer; transition:left .2s ease, top .2s ease;
  position:absolute; letter-spacing:.05em;
  white-space:nowrap;
  border-radius: 2px;
}
.btn-no:hover { color:var(--rose); border-color:var(--rose); }
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