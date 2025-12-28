/*
 * @author MDev - snake33madb
 * @copyright 2025 MDev
 * @license Todos los derechos reservados
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const db = require('./src/database'); // Importar módulo de base de datos

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config(); // Cargar variables de entorno

const app = express();

// IMPORTANTE PARA CPANEL: Usar el puerto que asigne el entorno o 3000 por defecto
const PORT = process.env.PORT || 3000;

// --- SEGURIDAD ---

// 1. Cabeceras de Seguridad HTTP (Helmet)
app.use(helmet({
    contentSecurityPolicy: false, // Desactivar CSP estricto si rompe scripts inline/externos (ajustar según necesidad)
}));

// 2. Limitador de Tasa General (DDoS / Brute Force)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limitar a 100 peticiones por IP por ventana
    message: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.'
});
app.use(limiter);

// 3. Limitador específico para Login (Fuerza Bruta)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // 5 intentos fallidos max
    message: 'Demasiados intentos de inicio de sesión. Intenta de nuevo en 15 minutos.'
});

// Middleware y Configuración
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Registro de Solicitudes (Logging)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Archivos Estáticos
app.use(express.static(path.join(__dirname, 'public')));
// Ruta de Assets (Compatibilidad)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Motor de Vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sesión para Autenticación de Administrador (SECURE)
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_fallback_dev_only',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Solo true en HTTPS
        httpOnly: true, // Prevenir XSS
        maxAge: 1000 * 60 * 60 * 24 // 1 día
    }
}));

// --- RUTAS ---

// 1. Página de Inicio (Pública)
app.get('/', (req, res) => {
    const data = db.read();

    // Contador de Visitas con IP (Únicos)
    if (!data.stats) {
        data.stats = { visits: 0, shares: 0, visited_ips: [] };
    }
    if (!data.stats.visited_ips) {
        data.stats.visited_ips = [];
    }

    // Obtener IP del cliente (considerando proxies como Cloudflare o Nginx)
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Verificar si la IP ya existe
    const ipExists = data.stats.visited_ips.some(entry => entry.ip === clientIp);

    if (!ipExists) {
        data.stats.visits = (data.stats.visits || 0) + 1;
        data.stats.visited_ips.push({
            ip: clientIp,
            date: new Date().toISOString()
        });
        db.write(data); // Guardar solo si es nueva visita
    }

    res.render('index', { data });
});

// 1.1 Página de Blog Individual
app.get('/blog/:id', (req, res) => {
    const data = db.read();
    const postId = req.params.id;
    const post = data.blog ? data.blog.find(p => p.id === postId) : null;

    if (post) {
        res.render('post', { post, data }); // Pasamos 'data' también para el footer/header si es necesario
    } else {
        // Si no existe, redirigir al inicio sección blog
        res.redirect('/#blog');
    }
});

// 2. Página de Inicio de Sesión (Admin)
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// 3. Lógica de Inicio de Sesión
app.post('/login', loginLimiter, (req, res) => {
    const { username, password } = req.body;
    // CREDENCIALES: admin / admin123
    if (username === 'admin' && password === 'admin123') {
        req.session.isAuthenticated = true;
        res.redirect('/admin');
    } else {
        res.render('login', { error: 'Credenciales incorrectas' });
    }
});

// 4. Panel de Administración (Protegido)
app.get('/admin', (req, res) => {
    if (!req.session.isAuthenticated) {
        return res.redirect('/login');
    }
    const data = db.read();
    res.render('admin', { data });
});

// 5. Guardar Cambios desde Admin
app.post('/admin/save', (req, res) => {
    if (!req.session.isAuthenticated) {
        return res.status(403).send('No autorizado');
    }

    try {
        const newData = db.read();

        // 1. Actualizar Hero (Cabecera)
        newData.hero.title = req.body.hero_title || newData.hero.title;
        newData.hero.subtitle = req.body.hero_subtitle || newData.hero.subtitle;

        // 2. Actualizar Sobre Mí (About)
        newData.about.title = req.body.about_title || newData.about.title;
        newData.about.subtitle = req.body.about_subtitle || newData.about.subtitle;
        newData.about.text = req.body.about_text || newData.about.text;

        // 3. Actualizar Contacto
        if (!newData.contact) newData.contact = {};
        newData.contact.email = req.body.contact_email || newData.contact.email;
        newData.contact.phone = req.body.contact_phone || newData.contact.phone;
        newData.contact.location = req.body.contact_location || newData.contact.location;
        newData.contact.text = req.body.contact_text || newData.contact.text;

        // 4. Actualizar Listas JSON usando el helper
        newData.services = db.safeJSONParse(req.body.services_json, newData.services);
        newData.experience = db.safeJSONParse(req.body.experience_json, newData.experience);
        newData.skills = db.safeJSONParse(req.body.skills_json, newData.skills);
        newData.projects = db.safeJSONParse(req.body.projects_json, newData.projects);
        newData.blog = db.safeJSONParse(req.body.blog_json, newData.blog);
        newData.social = db.safeJSONParse(req.body.social_json, newData.social);

        db.write(newData);
        res.redirect('/admin');
    } catch (err) {
        console.error("Error al guardar:", err);
        res.status(500).send("Error guardando datos");
    }
});


// Endpoint para descargar registro de IPs (Solo Admin)
app.get('/admin/download-ips', (req, res) => {
    if (!req.session.isAuthenticated) {
        return res.status(403).send('No autorizado');
    }

    const data = db.read();
    const visitedIps = data.stats && data.stats.visited_ips ? data.stats.visited_ips : [];

    // Generar contenido del archivo de texto
    let fileContent = "Registro de Visitas - IPs Unicas\n";
    fileContent += "=================================\n\n";
    fileContent += "IP\t\t\tFECHA\n";
    fileContent += "--\t\t\t-----\n";

    visitedIps.forEach(entry => {
        // Formatear si entry es objeto o string por compatibilidad
        const ip = entry.ip || entry;
        const date = entry.date || 'Desconocida';
        fileContent += `${ip}\t\t${date}\n`;
    });

    // Configurar cabeceras para la descarga
    res.setHeader('Content-disposition', 'attachment; filename=visitas_ips.txt');
    res.setHeader('Content-type', 'text/plain');
    res.write(fileContent);
    res.end();
});

// Endpoint para rastrear "Shares" (Compartidos)
app.post('/api/track-share', (req, res) => {
    try {
        const data = db.read();
        if (!data.stats) {
            data.stats = { visits: 0, shares: 0 };
        }
        data.stats.shares = (data.stats.shares || 0) + 1;
        db.write(data);
        res.json({ success: true, shares: data.stats.shares });
    } catch (err) {
        console.error("Error tracking share:", err);
        res.status(500).json({ success: false });
    }
});

// Iniciar Servidor
app.listen(PORT, () => {
    console.log(`CMS ejecutándose en http://localhost:${PORT}`);
});
