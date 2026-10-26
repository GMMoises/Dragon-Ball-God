# Dragon Ball Universe — Consumo de API pública

Proyecto de la guía **Frontend Consumo de API**. Portal responsive desarrollado con HTML5, CSS3 y JavaScript sin frameworks.

## Funcionalidades
- Búsqueda de personajes por nombre.
- Consumo de la API pública de Dragon Ball usando `fetch()` y `async/await`.
- Consulta de información e imágenes del personaje.
- Botón **Transformar** para recorrer las transformaciones disponibles en la API, con animación CSS.
- Navegación por formas y manejo básico de errores.

## API utilizada
https://dragonball-api.com/ — endpoints `/api/characters?name=Goku` y `/api/characters/{id}`.

## Cómo ejecutar
Abrir `index.html` usando **Live Server** en Visual Studio Code, con conexión a Internet. Buscar por ejemplo Goku, Vegeta o Gohan. Las transformaciones dependen de los datos disponibles para cada personaje.

## Estructura
- `index.html`: estructura de la interfaz.
- `styles.css`: diseño responsive y animaciones.
- `script.js`: peticiones a la API e interacción.

## Evidencia sugerida
Capturas de la búsqueda, de una transformación, del código JavaScript y del repositorio de GitHub.
