/*
 * @author MDev - snake33madb
 * @copyright 2025 MDev
 * @license Todos los derechos reservados
 */

const fs = require('fs');
const path = require('path');

// Apuntar al data.json en la raíz del proyecto
const DATA_FILE = path.join(__dirname, '../data.json');

const database = {
    // Leer datos
    read: () => {
        try {
            if (!fs.existsSync(DATA_FILE)) {
                return {}; // Retornar vacío si no existe
            }
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error("Error leyendo base de datos:", err);
            return {};
        }
    },

    // Guardar datos
    write: (data) => {
        try {
            fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));
            return true;
        } catch (err) {
            console.error("Error escribiendo en base de datos:", err);
            throw err;
        }
    },

    // Helper para parsear JSON seguro (usado en los formularios administrativos)
    safeJSONParse: (jsonString, fallback) => {
        try {
            return jsonString ? JSON.parse(jsonString) : fallback;
        } catch (e) {
            console.error("Error de parseo JSON:", e);
            return fallback;
        }
    }
};

module.exports = database;
