/*
 * @author MDev - snake33madb
 * @copyright 2025 MDev
 * @license Todos los derechos reservados
 */

// Esperamos a que el documento se cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    console.log("¡La web está cargada y lista!");

    // Efecto suave al hacer scroll (opcional ya que CSS scroll-behavior hace la mayor parte)
    // Aquí podemos añadir lógica futura

    // Animación de aparición simple al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Mostrar dirección del servidor en el pie de página
    const footerText = document.querySelector('.st-copyright-text');
    if (footerText) {
        footerText.innerHTML += ` <br><span style="font-size: 0.8em; opacity: 0.7;">(Visto desde: ${window.location.host})</span>`;
    }
});
