# Informe General del Sitio Web: Portfolio MDev

**Fecha del análisis:** 15/12/2025
**Tecnología:** Node.js, Express, EJS (SSR), JSON Database.
**Tipo de sitio:** Single Page Portfolio

---

## 1. SEO (Posicionamiento en Buscadores)
**Estado Actual: Bueno, con margen de mejora.**

### ✅ Puntos Fuertes
*   **Meta Tags Básicos:** Cuenta con `description` y `keywords` bien definidos, enfocados en palabras clave relevantes ("Desarrollador WordPress", "Consultor TI", "Galicia").
*   **Jerarquía de Encabezados:** Existe un único `<h1>` en la sección Hero, lo cual es fundamental para Google.
*   **Responsividad:** Etiqueta `viewport` configurada correctamente para móviles.
*   **URL Semánticas:** Al ser una One Page, usa anclas (`#about`, `#services`) que son limpias.

### ⚠️ A Mejorar
*   **Open Graph (Redes Sociales):** **(Corregido ✅)** Se han añadido las etiquetas `og:image`, `og:title`, `og:description`, `og:url` y `og:type`. **Nota:** Es necesario reemplazar `https://tu-dominio.com` por la URL real en `views/index.ejs` e `index.html`.
*   **Sitemap & Robots:** No existe un archivo `sitemap.xml` ni `robots.txt` en la carpeta pública. Son vitales para ayudar a Google a rastrear el sitio.
*   **Datos Estructurados (Schema.org):** No hay JSON-LD para definir que eres una "Persona" o "ProfessionalService". Esto ayudaría a aparecer en resultados enriquecidos.

---

## 2. Accesibilidad (A11y)
**Estado Actual: Aceptable, requiere ajustes.**

### ✅ Puntos Fuertes
*   **Idioma:** Definido correctamente (`lang="es"`).
*   **Navegación por Teclado:** Los enlaces del menú son estándar (`<a>`), por lo que deberían ser navegables.

### ⚠️ A Mejorar
*   **Etiquetas en Formularios:** El formulario de contacto usa `placeholder` pero no tiene etiquetas `<label>` visibles o asociadas con `for="id"`. Los lectores de pantalla para ciegos pueden tener problemas aquí.
*   **Contraste de Texto:** Se detectaron textos gris claro (`#a0a0b0`) sobre fondo oscuro. Hay que asegurar que el ratio de contraste sea al menos 4.5:1.
*   **Atributos ALT:** Asegurar que todas las imágenes (especialmente en la sección proyectos si se añaden capturas) tengan un texto alternativo (`alt`) descriptivo.

---

## 3. Rendimiento (WPO)
**Estado Actual: Medio.**

### ✅ Puntos Fuertes
*   **Carga de Scripts:** Los archivos JavaScript (`main.js`, plugins) se cargan al final del `<body>`, evitando bloquear el renderizado inicial.
*   **Preconexión de Fuentes:** Se usa `<link rel="preconnect">` para Google Fonts, acelerando la carga de tipografías.

### ⚠️ A Mejorar
*   **Librerías Antiguas:** Se está usando **jQuery 1.12.4**, una versión muy antigua y con vulnerabilidades conocidas. Se recomienda actualizar a la 3.x o eliminar jQuery si es posible.
*   **CSS Fragmentado:** Se cargan 7 archivos CSS distintos. En HTTP/1.1 esto son 7 peticiones extra. Sería ideal unificarlos en un solo `bundle.css` minificado.
*   **Plugins Pesados:** Se cargan `slick.js`, `lightgallery.js`, `wow.min.js`, `particles.js`. Si no se usan intensivamente, consumen recursos innecesarios.

---

## 4. Estrategia SEM y Conversión
**Estado Actual: Preparado.**

### ✅ Puntos Fuertes
*   **Llamadas a la Acción (CTA):** Botón "Solicitar Presupuesto" visible en la sección "Sobre Mí".
*   **Contacto Directo:** Teléfono y Email visibles en la cabecera y footer, facilitando el contacto rápido sin formulario.
*   **Formulario Funcional:** Integración con FormSubmit.co lista para recibir leads.

### 💡 Recomendaciones para Campañas (Ads)
*   **Páginas de Gracias:** Actualmente el formulario redirige al inicio (`localhot:3000`). Para medir conversiones en Google Ads, sería ideal crear una página `/gracias` y redirigir allí tras el envío.
*   **Trackers:** Faltan los scripts de Google Analytics 4 (GA4) y el píxel de conversión si planeas hacer publicidad.

---

## Resumen de Tareas Prioritarias
1.  **Seguridad:** Actualizar jQuery.
2.  **SEO:** ~~Añadir etiquetas Open Graph~~ (Hecho) y JSON-LD (Pendiente).
3.  **Accesibilidad:** Añadir `<label>` ocultos a los inputs del formulario.
