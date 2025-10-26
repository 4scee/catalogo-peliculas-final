# 🎬 Catálogo de Películas

Una aplicación web completa para gestionar y explorar un **catálogo de películas**. Permite a los usuarios ver una lista de películas, ver detalles individuales, y realizar operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar) en las entradas de la base de datos.

## 🌟 Características

Este proyecto proporciona una interfaz intuitiva para:

1.  **Explorar el Catálogo:** Un `index` (página principal) con una breve descripción y una vista de catálogo accesible desde el menú superior.
2.  **Navegación Rápida:** Un **menú** de navegación en la parte superior para acceder al catálogo.
3.  **Detalles de la Película:** Al hacer clic en el nombre de una película en el catálogo, se accede a una vista detallada.
4.  **Gestión de Películas (CRUD):**
    * **Agregar Película:** Un botón en la vista de catálogo para añadir nuevas películas.
    * **Vista Detallada:** Incluye botones de **Editar**, **Eliminar** y **Regresar** al catálogo.
    * **Edición:** Una página para modificar el **nombre**, **sinopsis**, **imagen (URL)** y **año** de una película existente.
    * **Creación:** Una página para ingresar el **nombre**, **sinopsis**, **liga del cover/imagen** y **año** de una nueva película.
5.  **Confirmación de Eliminación:** Se solicita una **confirmación** al usuario antes de borrar permanentemente una película del catálogo.
6.  **Persistencia de Datos:** Todos los cambios (agregar, editar, eliminar) se guardan en una **base de datos relacional o no relacional**.

***

## 🚀 Tecnologías Utilizadas

* *(**IMPORTANTE:** Edita esta sección con las tecnologías reales que estás utilizando.)*
    * **Frontend:** HTML, CSS (Bootstrap), JavaScript (Vanilla JS o un framework como Vue.js).
    * **Backend:** Node.js con Express.js.
    * **Base de Datos:** MongoDB o PostgreSQL (o la que hayas elegido).
    * **ORM/ODM:** Mongoose (para MongoDB) o Sequelize (para SQL).

***

## ⚙️ Instalación y Configuración

Sigue estos pasos para tener una copia local en funcionamiento.

### Prerrequisitos

* [Ej. Node.js (versión 18+)]
* [Ej. Git]
* [Ej. Un servidor de base de datos o cuenta de MongoDB Atlas]

### Pasos

1.  **Clonar el Repositorio**
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd catalogo-peliculas
    ```
2.  **Instalar Dependencias**
    ```bash
    # Instala las dependencias de Node.js (servidor)
    npm install
    ```
3.  **Configurar Variables de Entorno**
    * Crea un archivo `.env` en la raíz del proyecto.
    * Define la cadena de conexión a tu base de datos y el puerto:

        ```
        # Ejemplo:
        DB_URI=mongodb://localhost:27017/peliculas_db
        PORT=3000
        ```
4.  **Ejecutar Migraciones (Si usas SQL)**
    ```bash
    # Si usas Sequelize u otro ORM
    npm run migrate 
    ```
5.  **Iniciar la Aplicación**
    ```bash
    npm start  
    ```

La aplicación estará disponible en `http://localhost:[PUERTO]`.

***

## 💻 Uso

### 1. Página Principal (`/`)
Muestra la bienvenida y una breve descripción.

### 2. Catálogo de Películas (`/catalogo`)
* Se accede desde el **menú superior**.
* Lista todas las películas.
* Contiene el botón **"Agregar Nueva Película"** (Punto 5).
* Haz clic en el **nombre de la película** para ir a la vista detallada (Punto 3).

### 3. Detalle de la Película (`/peliculas/:id`)
Muestra la información completa de la película.
* **Editar:** Botón para ir a la vista de edición (Punto 4, 7).
* **Eliminar:** Botón que solicita **confirmación** antes de borrar (Punto 4, 6).
* **Regresar:** Botón para volver al catálogo (Punto 4).

### 4. Agregar Película (`/peliculas/nueva`)
Formulario para introducir: Nombre, Sinopsis, Liga del Cover/Imagen (URL), y Año. Al guardar, se añade a la base de datos (Punto 8, 9).

### 5. Editar Película (`/peliculas/editar/:id`)
Formulario precargado con los datos actuales. Permite modificar: Nombre, Sinopsis, Imagen (URL), y Año. Al guardar, se actualiza la entrada en la base de datos (Punto 7, 9).

***

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes sugerencias, encuentras un error o quieres mejorar alguna característica, por favor:
1.  Haz un *fork* del repositorio.
2.  Crea una rama (`git checkout -b feature/nueva-caracteristica`).
3.  Haz *commit* de tus cambios (`git commit -m 'feat: Añadir nueva característica X'`).
4.  Haz *push* a la rama (`git push origin feature/nueva-caracteristica`).
5.  Abre un *Pull Request*.

## 📜 Licencia

Este proyecto está bajo la Licencia **MIT**.

---
**Desarrollado por:** [Ulises B]