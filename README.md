# 💌 Propuesta de Noviazgo

Proyecto Vue 3 + Vite. Login falso corporativo que redirige a una propuesta especial.

## Arrancar el proyecto

```bash
npm install
npm run dev
```

## Personalización rápida

### 1. Credenciales del login
En `src/views/LoginView.vue`, líneas ~90:
```js
const SECRET_USER = 'amor'       // ← cambiá esto
const SECRET_PASS = '2025'       // ← cambiá esto
```

### 2. Nombres
En `src/views/ProposalView.vue`, líneas ~70:
```js
const recipientName = ref('Mi amor')       // ← nombre de quien recibe
const senderName = ref('Tu programador')   // ← tu nombre
```

### 3. Fotos
Poné tus fotos en la carpeta `public/photos/`:
```
public/
  photos/
    foto1.jpg
    foto2.jpg
    foto3.jpg
    foto4.jpg
    foto5.jpg
```

### 4. Mensaje de la propuesta
En `ProposalView.vue`, buscá el comentario `✏️ EDITÁ este mensaje` y cambiá el texto.

### 5. Captions de las fotos
En `ProposalView.vue`, cada `.photo-caption` tiene un texto que podés personalizar.

## Deploy gratuito (recomendado: Vercel)

1. Subí el proyecto a GitHub
2. Entrá a vercel.com → New Project → importá el repo
3. Vercel detecta Vue/Vite automáticamente → Deploy
4. ¡Listo! Obtenés una URL pública del tipo `tu-proyecto.vercel.app`

## Estructura del proyecto

```
src/
├── router/
│   └── index.js          ← rutas + guard de autenticación
├── views/
│   ├── LoginView.vue      ← login corporativo falso
│   └── ProposalView.vue   ← collage + propuesta
├── App.vue
└── main.js
public/
  photos/                  ← poné tus fotos acá
index.html
```
