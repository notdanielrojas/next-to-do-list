# Next To-Do List

Este proyecto es una aplicación de lista de tareas **full stack** desarrollada con [Next.js](https://nextjs.org), que integra tanto el frontend como el backend en una sola base de código. Permite a los usuarios gestionar sus tareas diarias de manera sencilla y eficiente, con funcionalidades avanzadas como autenticación de usuarios y notificaciones interactivas.

## Características

- Añadir, editar y eliminar tareas.
- Marcar tareas como completadas o pendientes.
- Autenticación de usuarios para proteger y personalizar las tareas.
- Notificaciones interactivas usando [SweetAlert](https://sweetalert2.github.io/).
- Interfaz intuitiva y responsiva.
- Persistencia de datos local o en servidor (según la configuración).

## Tecnologías utilizadas

- [Next.js](https://nextjs.org) para el desarrollo full stack.
- [React](https://react.dev) para la construcción de la interfaz de usuario.
- [TypeScript](https://www.typescriptlang.org/) para tipado estático.
- [Node.js](https://nodejs.org) y [Express](https://expressjs.com) para el backend y la API.
- [SweetAlert](https://sweetalert2.github.io/) para notificaciones y alertas.
- [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support) o [Tailwind CSS](https://tailwindcss.com/) para los estilos (según configuración).

## Instalación y uso

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/next-to-do-list.git
    cd next-to-do-list
    ```

2. Instala las dependencias:
    ```bash
    npm install
    # o
    yarn install
    ```

3. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    # o
    yarn dev
    ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Estructura del proyecto

- `app/`: Contiene las páginas y componentes principales.
- `components/`: Componentes reutilizables de la interfaz.
- `styles/`: Archivos de estilos.
- `api/`: Endpoints del backend con Node.js y Express.
- `README.md`: Documentación del proyecto.

