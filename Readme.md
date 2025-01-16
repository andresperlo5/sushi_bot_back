# Proyecto:  Chatbot para pedir Sushi

## Descripción General
Este proyecto consiste en un sistema completo diseñado para gestionar pedidos de sushi mediante un bot automatizado. Los usuarios pueden registrarse, iniciar sesión y realizar pedidos de manera sencilla. El sistema incluye autenticación de usuarios con roles diferenciados (administrador y usuario), protección de rutas mediante tokens JWT y almacenamiento temporal de credenciales en el navegador. Además, los administradores pueden gestionar los pedidos y los usuarios pueden visualizar el estado de sus órdenes.

El sistema está compuesto por dos partes principales:

1. **Backend:** Implementado con Node.js y Express, incluye la lógica de autenticación, generación de tokens JWT y verificación de roles.
2. **Frontend:** Una aplicación React que permite a los usuarios registrarse, iniciar sesión y acceder a diferentes vistas según su rol.

## Backend

### Tecnologías Utilizadas
- Node.js
- Express
- JsonWebToken (JWT)
- Cors
- Morgan
- Dotenv
- Argon2
- Moongoose

### Funcionalidades Principales
- Registro de usuarios.
- Inicio de sesión con generación de token JWT.
- Verificación de roles para proteger rutas específicas.
- Conexión a base de datos (ejemplo: MongoDB ).

### Instalación
1. Clona este repositorio.
2. Navega al directorio del backend:
   ```bash
   cd sushi_bot_back
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Configura las variables de entorno creando un archivo `.env` con los siguientes valores:
   ```env
   PORT=3001
   JWT_SECRET=tu_secreto
   DB_CONNECTION=tu_url_de_base_de_datos
   ```
5. Inicia el servidor:
   ```bash
   npm start
   ```
   El servidor estará disponible en `http://localhost:3001`.

### Estructura de Carpetas
```
backend/
|-- controllers/
|-- db/
|-- middlewares/
|-- models/
|-- routes/
|-- utils/
|-- index.js
|-- package.json
|-- .env
|-- vercel.json
|-- .gitignore
```

---
