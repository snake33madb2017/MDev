# Guía de Despliegue para tu Web

Tu proyecto es una aplicación **Node.js dinámica** (usa `server.js`, Express y base de datos local), por lo que **no puede alojarse en GitHub Pages**, ya que este servicio solo funciona para sitios estáticos (HTML/CSS puro).

Para hacerlo visible en internet, te recomiendo usar **Render** (tienen un plan gratuito compatible con tu proyecto).

## Pasos para Desplegar en Render (Gratis)

## Pasos para Desplegar en Render (Método Fácil - Blueprint)

1.  Ve a [https://render.com/](https://render.com/) y crea una cuenta.
2.  Ve a la sección **Blueprints** (arriba) y pulsa **New Blueprint Instance**.
3.  Conecta tu repositorio `snake33madb2017/mi-web-cv`.
4.  Render detectará automáticamente el archivo `render.yaml` que he creado y configurará todo por ti.
5.  Pulsa **Apply**.

¡Y listo! En unos minutos tu web estará online.


> **⚠️ IMPORTANTE SOBRE LOS DATOS:**
> Al usar el plan gratuito de Render (y la mayoría de servicios similares), el sistema de archivos es "efímero".
> Esto significa que si haces cambios desde el **Panel de Admin** de tu web (editar textos, etc.), esos cambios se guardan en el archivo `data.json` del servidor, **pero se perderán si el servidor se reinicia** (lo cual pasa automáticamente cada cierto tiempo en los planes gratuitos).
>
> **Solución recomendada:**
> Haz los cambios de contenido en tu ordenador (local), guarda, y haz `git push` para subirlos. Usa el Panel de Admin online solo para pruebas o si actualizas a un plan con "Persistent Disk" (Disco Persistente).
