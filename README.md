# Portfolio MDev - Web & CMS

Este proyecto es un **Portafolio Web Dinámico** construido con **Node.js** y **Express**. Incluye un sistema de gestión de contenido (CMS) ligero que permite editar la información del sitio en tiempo real sin tocar el código, utilizando una base de datos JSON local.

## 🚀 Características

*   **Renderizado Dinámico (SSR):** Utiliza EJS para renderizar vistas HTML optimizadas para SEO.
*   **Panel de Administración:** Interfaz privada (`/login`) para editar textos, servicios, proyectos y perfil.
*   **Base de Datos Ligera:** Todo el contenido se almacena en un archivo `data.json`, facilitando copias de seguridad y migraciones.
*   **Diseño Responsivo:** Adaptado a móviles y escritorio.
*   **SEO Friendly:** Etiquetas meta dinámicas y estructura semántica.

---

## 🛠️ Estructura del Proyecto

```text
.
├── assets/             # Recursos estáticos (CSS, JS cliente, Imágenes)
├── src/
│   └── database.js     # Lógica de conexión a la BBDD JSON
├── views/              # Plantillas EJS (Frontend y Admin)
├── server.js           # Punto de entrada de la aplicación (Express Server)
├── data.json           # Base de datos principal (Contenido del sitio)
├── package.json        # Dependencias y scripts
└── README.md           # Documentación
```

---

## 💻 Instalación y Uso Local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/snake33madb2017/MDev.git
    cd MDev
    ```

2.  **Instalar dependencias:**
    Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
    ```bash
    npm install
    ```

3.  **Iniciar el servidor:**
    ```bash
    npm start
    ```

4.  **Acceder:**
    *   **Web Pública:** [http://localhost:3000](http://localhost:3000)
    *   **Panel Admin:** [http://localhost:3000/login](http://localhost:3000/login)

---

## 🔐 Credenciales por Defecto

Para acceder al panel de administración:

*   **Usuario:** `admin`
*   **Contraseña:** `admin123`

> **Nota:** Estas credenciales están definidas en `server.js`. Se recomienda cambiarlas o usar variables de entorno para producción.

---

## 🌐 Despliegue (Hosting / cPanel)

Este proyecto está preparado para desplegarse fácilmente en cualquier hosting que soporte Node.js (como cPanel con "Node.js App" o VPS).

Para instrucciones detalladas de despliegue en cPanel, consulta el archivo:
📄 [README_CPANEL.md](./README_CPANEL.md)

---

## 📝 Personalización

Todo el contenido textual se puede editar desde el panel `/admin`. Si necesitas modificar estilos o estructura:

*   **Estilos:** `assets/css/style.css` (o ruta similar en assets).
*   **Estructura HTML:** `views/index.ejs`.
*   **Lógica Backend:** `server.js`.

---

## 📄 Licencia

Este proyecto está bajo la licencia ISC.
