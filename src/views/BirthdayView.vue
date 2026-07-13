<template>
  <div class="birthday-page">

    <!-- Petals background -->
    <div class="petals-bg">
      <span v-for="p in petals" :key="p.id" class="petal" :style="p.style">❀</span>
    </div>

    <!-- Balloons -->
    <div class="balloons-bg">
      <div v-for="b in balloons" :key="b.id" class="balloon" :style="b.style">
        <div class="balloon-body"></div>
        <div class="balloon-knot"></div>
        <div class="balloon-string"></div>
      </div>
    </div>

    <!-- Header -->
    <header class="birthday-header" :class="{ 'visible': revealed }">
      <p class="header-eyebrow">{{ currentDate }}</p>
      <h1 class="header-title">
        Feliz cumpleaños,<br/><em>{{ recipientName }}</em>
      </h1>
      <div class="header-divider">✦</div>
    </header>

    <!-- Cards -->
    <main class="cards-wrapper" :class="{ 'visible': revealed }">

      <!-- ✏️ CARTA PRINCIPAL -->
      <div class="birthday-card" style="--card-delay: 0s">
        <div class="card-tag">Carta</div>
        <p class="dedication-text">
          <!-- ✏️ Escribí tu carta acá -->
          Cami, si estas leyendo esto, probablemente ya te lo dije, pero MUY FELIZ CUMPLEAÑOS AMOR DE MI VIDA, no sabes lo feliz y contento que me pone que hayas querido que tu cumple nos encuentre juntos, disfrutando de nuestro primer viaje y locamente enamorados. Me pongo a pensar e hice algo de trampa, porque la cumpleañera sos vos, pero el que hoy y cada día desde que te conozco está recibiendo de los mejores regalos de su vida por tenerte a vos, soy yo.
        </p>
        <p class="dedication-text">
          No se que estaré haciendo yo en el momento que leas esto, porque me surgen muchas ideas de en qué momento avisarte que la pagina tiene una actualizacion, creo que lo que mas me cierra es que sea mientras yo desaparezco un poco bien tempranito, mientras intentó conseguirle un rico y calentito desayuno a la mujer maravillosa que alegra cada una de mis mañanas con sus hermosos mensajitos que me hacen iniciar tan bien mis días, ojalá, pueda conseguirlo y devolverte un poquito de ese sentimiento que tanto me acompaña.  
        </p>
        <p class="dedication-text">
            Tengo que confesarte que a veces pienso que estoy viviendo dentro de la mejor película romántica jamás creada, porque es increíble que todo lo que me generas y haces sentir sea tan real que me hace dudar de si estamos en una ficción. Sos un sin fin de hacerme experimentar cosas tan pero tan lindas que no me saldría ni soñar ni imaginarme a alguien capaz de dar un amor tan real y lleno de emociones como el que me haces llegar.         </p>
        <p class="dedication-text">
            Bueno, no se que me pasa pero esto supuestamente era una carta de cumpleaños y en vez de desearte cosas a vos, no puedo parar de pensar y escribir todo el amor, felicidad, tranquilidad, atracción, confianza, cariño, aprendizaje, ternura, conexión, sensibilidad, seguridad, deseo, dulzura, energía, motivación, paz y cercanía (me faltaron miles de cosas mas) que siento que vos me das y por el cual te voy a estar agradecido la vida entera, por el que vos, una grandísima persona, se haya fijado en mí y me este eligiendo para tenerme a su lado.         </p>
        <p class="dedication-text">
            Simplemente espero que en mi rol de novio, poder hacerte llegar algo parecido a todo lo hermoso que vos me haces sentir a mi, que en este nuevo año que cumplis y en todos los que se vienen, poder seguir viviendolos junto a vos y llenandolos de nuevas experiencias. ESO ES HOY UNO DE MIS MAYORES DESEOS, ESO Y QUE SEAS SIEMPRE FELIZ, POR QUE VER ESA CARITA REIR Y OBSERVAR TU SONRISA ES LA MAYOR ALEGRIA QUE YO PUEDO TENER…. FELICES 26 MI CONEJITA, AMORCITO DE MI VIDA, HERMOSA, BONITAAAA, CAMILINDA, CAMIREINA.        </p>
        <p class="card-signature">—Porque esta sea la primera de muchísimas cartas de cumpleaños que te toque recibir, ojalá que en cada uno de los que te quede por vivir. TE AMO CON TODO MI CORAZON, CHANCHI ♥</p>
      <p class="dedication-text">
            pd: Espero que esta cartita sirva hasta que te pueda hacer encontrar con tus verdaderos regalitos, igual, a continuacion te dejo entre algunas pistas, detalles para que vayas sabiendo el porque de cada eleccion        </p>
    </div>

      <!-- ✏️ REGALO 1 -->
      <div class="birthday-card" style="--card-delay: 0.15s">
        <div class="card-tag">Regalitos</div>
        <h3 class="card-gift-title"><!-- ✏️ Nombre del regalo --></h3>
        <p class="dedication-text">
          El primer regalito está inspirado en cositas de vos que me gustan y que por ahí no tan seguido te digo, es muchísimo lo que me encanta notar lo inteligente, culta y el valor que le das a los estudios. Espero que puedas plasmar toda tu creatividad, ingenio y originalidad en este regalito, que tiene además, detallecitos de una casa de cierta saga que te gusta mucho. (vos seguite anotando en 2000 cursos, maestrías, doctorados que siempre vas a tener mi apoyo bonitaaa)
        </p>
        <p class="dedication-text">  
        El siguiente presente, es valga la redundancia, para que siempre me tengas presente. Me encantaría que podamos dormir juntitos cada una de todas las noches, por el momento, todavía no se puede, entonces por mientras te dejo un compañerito que valora mucho la familia y al que se que le tenes mucho aprecio, para que te acompañe y te ilumine en tus noches cuando yo no pueda. 
        </p>
        <p class="dedication-text">
       El tercero, es ese maldito que se hizo tardar en llegar y que gracias al correo que abrió en un feriado, no se retrasó. haber podido conseguirlo en un feriado que corresponde a un dia patrio va muy de la mano con el regalito, que representa algo muy argentino que te gusta mucho y te va dejar mostrar lo orgullosamente argentina que sos. (Ahora vas a poder guardar el componente de tus infusiones sabor naranja sin que yo me de cuenta que me estas dando)
        </p>
        <p class="dedication-text">
       y por último, algo que elegí sin saber de qué tipo te gusta y que cuando indirectamente te pedí algo de data, no me la pasaste, así que me la jugué un poquito. Acá no hay mucho que decir, lo compre porque me gusto y porque cuando te veo con pequeños detallecitos puestos, no hacen más que resaltar por completo tu hermosa belleza. (Con este no se puede jugar porque se rompe y segun vos, puede lastimarme así que CUIDADO)  
        </p>
      </div>

    </main>

    <footer class="birthday-footer">
      <span>Hecho con ♥♥♥</span>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// ✏️ PERSONALIZÁ
const recipientName = ref('Mi amorcito')

const revealed = ref(false)

const currentDate = new Date().toLocaleDateString('es-AR', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

// Pétalos
const petals = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  style: {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${7 + Math.random() * 8}s`,
    fontSize: `${10 + Math.random() * 14}px`,
    opacity: 0.12 + Math.random() * 0.28,
  }
}))

// Globos — colores de la paleta del sitio
const balloonColors = [
  'rgba(196,117,106,0.75)',   // rose
  'rgba(232,196,184,0.8)',    // blush
  'rgba(139,58,58,0.65)',     // deep rose
  'rgba(249,198,208,0.8)',    // pink suave
  'rgba(250,246,240,0.85)',   // cream
]

const balloons = Array.from({ length: 10 }, (_, i) => {
  const color = balloonColors[i % balloonColors.length]
  const size  = 36 + Math.random() * 28  // entre 36px y 64px
  return {
    id: i,
    style: {
      left:              `${5 + Math.random() * 90}%`,
      animationDelay:    `${Math.random() * 12}s`,
      animationDuration: `${10 + Math.random() * 10}s`,
      '--balloon-color': color,
      '--balloon-size':  size + 'px',
    }
  }
})

onMounted(() => {
  window.scrollTo(0, 0)
  setTimeout(() => { revealed.value = true }, 200)
})
</script>

<style scoped>
/* ── Page ───────────────────────────────────────────── */
.birthday-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--cream);
  position: relative;
  overflow-x: hidden;
  padding-bottom: 60px;
}

/* ── Petals ─────────────────────────────────────────── */
.petals-bg {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 0; overflow: hidden;
}
.petal {
  position: absolute; top: -20px;
  color: var(--rose);
  animation: floatDown linear infinite;
}
@keyframes floatDown {
  0%   { transform: translateY(-20px) rotate(0deg);   opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 0.8; }
  100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
}

/* ── Balloons ───────────────────────────────────────── */
.balloons-bg {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 0; overflow: hidden;
}

.balloon {
  position: absolute;
  bottom: -120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: floatUp linear infinite;
}

.balloon-body {
  width: var(--balloon-size);
  height: calc(var(--balloon-size) * 1.2);
  background: var(--balloon-color);
  border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
  position: relative;
  box-shadow: inset -4px -4px 8px rgba(0,0,0,0.08),
              inset 3px 3px 6px rgba(255,255,255,0.3);
}

/* Reflejo en el globo */
.balloon-body::before {
  content: '';
  position: absolute;
  top: 18%; left: 22%;
  width: 28%; height: 20%;
  background: rgba(255,255,255,0.35);
  border-radius: 50%;
  transform: rotate(-30deg);
}

.balloon-knot {
  width: 6px; height: 6px;
  background: var(--balloon-color);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  margin-top: -1px;
  opacity: 0.8;
}

.balloon-string {
  width: 1px;
  height: 50px;
  background: rgba(196,117,106,0.3);
  margin-top: 2px;
}

@keyframes floatUp {
  0%   { transform: translateY(0)      rotate(-2deg); opacity: 0; }
  5%   { opacity: 1; }
  50%  { transform: translateY(-50vh)  rotate(2deg);  }
  95%  { opacity: 0.6; }
  100% { transform: translateY(-115vh) rotate(-1deg); opacity: 0; }
}

/* ── Header ─────────────────────────────────────────── */
.birthday-header,
.cards-wrapper {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.9s ease, transform 0.9s ease;
  position: relative; z-index: 1; width: 100%;
}
.cards-wrapper { transition-delay: 0.3s; }

.birthday-header.visible,
.cards-wrapper.visible {
  opacity: 1; transform: translateY(0);
}

.birthday-header {
  text-align: center;
  padding: 56px 20px 36px;
}

.header-eyebrow {
  font-size: 11px; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--soft-gray);
  margin-bottom: 18px;
}

.header-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(36px, 7vw, 72px);
  font-weight: 300; color: var(--charcoal); line-height: 1.05;
}
.header-title em { color: var(--rose); font-style: italic; }

.header-divider {
  margin-top: 22px; color: var(--rose);
  font-size: 16px; letter-spacing: 0.5em;
}

/* ── Cards wrapper ──────────────────────────────────── */
.cards-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding: 0 24px;
  max-width: 680px;
  margin: 0 auto;
  width: 100%;
}

/* ── Card ───────────────────────────────────────────── */
.birthday-card {
  width: 100%;
  background: var(--warm-white);
  border: 1px solid var(--border);
  padding: 44px 48px;
  position: relative;
  animation: cardReveal 0.7s ease both;
  animation-delay: var(--card-delay, 0s);
}

/* Línea rosa arriba */
.birthday-card::before {
  content: '';
  position: absolute;
  top: -1px; left: 0;
  width: 50px; height: 3px;
  background: var(--rose);
}

/* Ornamento esquina */
.birthday-card::after {
  content: '✦';
  position: absolute;
  bottom: 16px; right: 18px;
  color: var(--blush); font-size: 11px;
}

@keyframes cardReveal {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Tag de la card */
.card-tag {
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--rose);
  margin-bottom: 20px;
}

/* Título del regalo */
.card-gift-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 300;
  color: var(--charcoal);
  margin-bottom: 16px;
  line-height: 1.2;
}

/* Texto de la dedicatoria */
.dedication-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px;
  line-height: 1.85;
  color: #5a5a5a;
  font-style: italic;
  margin-bottom: 12px;
}
.dedication-text:last-of-type { margin-bottom: 0; }

/* Firma */
.card-signature {
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--rose);
  font-style: italic;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid var(--border);
}

/* ── Footer ─────────────────────────────────────────── */
.birthday-footer {
  margin-top: 48px;
  font-size: 11px; letter-spacing: 0.1em;
  color: var(--soft-gray);
  position: relative; z-index: 1;
}

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 600px) {
  .birthday-card { padding: 32px 24px; }
}
</style>