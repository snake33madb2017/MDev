# Guía de Despliegue en cPanel (Node.js)

Este proyecto está preparado para funcionar en cPanel usando la función **"Setup Node.js App"**.

## 1. Preparación de Archivos
Asegúrate de tener los siguientes archivos listos para subir (puedes comprimirlos en un .zip):
- `server.js` (Archivo principal)
- `package.json` y `package-lock.json`
- `data.json` (Tu base de datos actual)
- Carpeta `src/` (Lógica de base de datos)
- Carpeta `views/` (Plantillas HTML/EJS)
- Carpeta `assets/` (Imágenes, CSS, JS del cliente)
- `public/` (Si existe)

**NO SUBIR:** La carpeta `node_modules` (se instalará en el servidor).

## 2. Configuración en cPanel

1. Inicia sesión en tu cPanel.
2. Busca la sección **"Software"** y haz clic en **"Setup Node.js App"**.
3. Haz clic en **"Create Application"**.
4. Configura lo siguiente:
   - **Node.js Version:** Recomiendo v14, v16 o v18 (la que sea estable en tu hosting).
   - **Application Mode:** `Production`.
   - **Application Root:** La carpeta donde subirás los archivos (ej: `public_html/portfolio` o `/portfolio`).
   - **Application URL:** La URL de tu web.
   - **Application Startup File:** Escribe `server.js` (muy importante).
5. Haz clic en **CREATE**.

## 3. Subir Archivos

1. Entra al **Administrador de Archivos** de cPanel.
2. Ve a la carpeta que creaste (ej: `portfolio`).
3. Sube tu `.zip` y descomprímelo allí. Asegúrate de que `server.js` esté en la raíz de esa carpeta.

## 4. Instalar Dependencias

1. Vuelve a la pantalla de **"Setup Node.js App"**.
2. Abajo verás un botón que dice **"Run NPM Install"**. Haz clic en él.
   - Esto instalará automáticamente `express`, `ejs`, etc.

## 5. Iniciar la App

1. Una vez instalado todo, haz clic en **"Restart"** o **"Start App"**.
2. ¡Listo! Tu web debería estar online.

## 6. Base de Datos (Separada)

Actualmente, el sistema usa `data.json` como base de datos portátil.
- **Ubicación:** Raíz del proyecto (`/data.json`).
- **Backup:** Para hacer una copia de seguridad, simplemente descarga ese archivo desde el Administrador de Archivos.
- **Migración:** El código está separado en `src/database.js`. Si en el futuro quieres usar MySQL, solo necesitas cambiar ese archivo para que conecte a la base de datos de cPanel, sin romper el resto de la web.
