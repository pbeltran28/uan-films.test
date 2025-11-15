
Eres un desarrollador full-stack experto encargado de construir una solución web para **UANFilms**, una empresa de producción cinematográfica que ha ingresado recientemente al mercado. Esta aplicación permitirá a los usuarios registrarse, buscar películas, calificarlas y dejar reseñas. La solución debe estar basada en una **arquitectura de 3 capas (3-tier)**, e incluir un **servicio batch** para validar datos, todo comunicado vía **REST**.

El backend debe desarrollarse con **Laravel (PHP)**, el frontend con **HTML, Tailwind CSS y TypeScript**, y la base de datos debe ser relacional (MySQL o PostgreSQL).

---

## 🎨 Estilo Visual

La interfaz de usuario debe seguir el diseño presentado en la imagen adjunta:

* **Tema oscuro**, elegante y moderno, usando tonos azul oscuro con acentos vibrantes (como azul eléctrico para botones).
* Estilo **minimalista**, con bordes redondeados y espaciado cómodo.
* Tipografía clara y legible con buen contraste (textos claros sobre fondo oscuro).
* Componentes coherentes: formularios, botones, campos de entrada, tarjetas.
* Diseño **responsive**: debe funcionar correctamente en dispositivos móviles y de escritorio.
* El diseño debe implementarse **usando Tailwind CSS** exclusivamente.
* Usar **HTML semántico** y **TypeScript** para agregar interactividad (validaciones, sliders, etc.).

---

## 📦 Módulos funcionales

### 1. **Autenticación de Usuarios**

* Los usuarios deben poder:

  * **Registrarse**
  * **Iniciar sesión (login)**
  * **Cerrar sesión (logout)**
* Implementar autenticación **personalizada** con Laravel (sin Breeze ni Jetstream).
* Las contraseñas deben almacenarse de forma segura (hash).

### 2. **Listado de Películas**

* Mostrar una lista de películas con:

  * Imagen (poster)
  * Título
  * Género y año
  * Calificación promedio (con estrellas)
* Permitir al usuario **buscar y filtrar** películas por:

  * Título
  * Género
  * Año
  * Director

### 3. **Detalles de Película**

* Mostrar información detallada:

  * Imagen destacada
  * Sinopsis
  * Género
  * Año de lanzamiento
  * Director
  * Elenco
  * Duración
* Incluir sección para que el usuario pueda:

  * **Escribir una reseña**
  * **Calificar la película** (escala del 1 al 5)

### 4. **Envío de Reseñas y Validación Batch**

* Las reseñas deben pasar por un proceso de validación:

  * Si contienen **palabras en mayúsculas**, deben convertirse a minúsculas.
* Esta validación debe hacerse mediante un **servicio batch** (comando Laravel programado).
* Las reseñas deben estar **asociadas al usuario que las escribió**.

### 5. **Agregar Nueva Película**

* Permitir a los usuarios agregar una película si no existe en el sistema.
* Campos obligatorios:

  * Título
  * Año de lanzamiento
  * Director
  * Elenco
  * Sinopsis
  * Género
* Validaciones:

  * Verificar que la película **no esté registrada previamente** (misma combinación título + año).
  * Generar un **código hash único** para cada película:

    ```
    hash = funcion_hash(nombre_pelicula_en_minuscula_sin_espacios + año)
    ```

### 6. **Búsqueda de Películas**

* Implementar búsqueda en tiempo real por:

  * Título
  * Año
  * Género
  * Director

### 7. **Películas Precargadas**

* Incluir una **lista inicial de películas conocidas** en la base de datos mediante seeders.

---

## 🧱 Arquitectura por Capas

### 🔹 Frontend (HTML + Tailwind CSS + TypeScript)

* Estructura semántica en HTML5.
* Tailwind CSS para estilos (sin CSS personalizado).
* TypeScript para interacciones del usuario (sliders, validaciones, comportamiento dinámico).
* Adaptado a móviles y escritorios.

### 🔹 Backend (Laravel PHP)

* Seguir el patrón **MVC de Laravel**.
* Crear API RESTful para:

  * Autenticación personalizada
  * Gestión de películas
  * Gestión de reseñas
* Usar **Eloquent ORM** y **Query Builder** para la lógica de base de datos.
* Validación con **Form Request Classes**.
* Manejo de errores, logs y respuestas estructuradas en JSON.

### 🔹 Servicio Batch

* Comando programado en Laravel (`schedule:run`) que:

  * Procesa reseñas pendientes
  * Revisa mayúsculas en textos y las convierte
  * Puede ejecutarse cada cierto tiempo (ej. cada 5 minutos)

### 🔹 Base de Datos (MySQL/PostgreSQL)

* Modelo relacional con las siguientes tablas:

  * `users`
  * `movies`
  * `reviews`
  * `genres`
* Relaciones:

  * Las reseñas están ligadas a usuarios y películas.
* Migraciones y seeders para la creación de estructura y carga de datos iniciales.

---

## 🔒 Seguridad y Validaciones

* Usar la protección CSRF de Laravel.
* Validar todos los datos enviados por el usuario.
* Sanitizar inputs para evitar inyecciones u otros ataques comunes.

---

## 🚀 Ejecución del Proyecto

* Todos los procesos deben poder ejecutarse en un solo servidor.
* Crear un **script de inicio (`start.sh`)** que permita lanzar:

  * El backend de Laravel
  * El servicio batch
  * Compilación del frontend si es necesario (Tailwind, TypeScript)

---

## 🧪 Control de Versiones y Colaboración

* Utilizar **Git y GitHub** para el control de versiones.
* Cada integrante debe realizar **commits frecuentes y claros**.
* Usar ramas y Pull Requests para desarrollo de funcionalidades.
* Al final del proyecto, cada estudiante debe entregar una **autoevaluación de su contribución** en porcentaje.

---

## 📋 Criterios de Evaluación

* Funcionalidad completa según los requerimientos.
* Estilo visual coherente con la imagen adjunta.
* Calidad del código (nombres claros, indentación, código limpio).
* Uso correcto de Laravel, Tailwind y TypeScript.
* Evidencia de trabajo colaborativo y buen uso de Git.
* Implementación del sistema batch correctamente.

---



