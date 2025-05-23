# Backend Izifile 📁

API REST del sistema **Izifile** desarrollada en Node.js con Express, conectada a MongoDB y estructurada para facilitar la gestión documental y autenticación de usuarios con roles definidos.
Demo oficial: https://github.com/lucsducks/backendIzifile


---

## 📦 Tecnologías utilizadas

- Node.js v18+
- Express.js
- MongoDB (6.x)
- Mongoose
- Docker + Docker Compose
- Nodemailer (SMTP Brevo)
- Dotenv

---

## 🚀 Opciones de despliegue

### ✅ Opción 1: Usando Docker (recomendada)

**Requisitos:**

- Tener Docker y Docker Compose instalados.

**Pasos:**

1. Clonar el repositorio:

```
   git clone https://github.com/lucsducks/backendIzifile
   cd backendIzifile
```

2. Clonar el archivo de entorno:
   cp .env.template .env

3. Rellenar los siguientes campos del archivo `.env`:

```
PORT=3500
MONGODB_CNN=mongodb://mongo:27017/izifile
SECRETORPRIVATEKEY=tu_clave_jwt
SECRET_SENDIBLUE=clave_api_de_brevo
EMAIL_BREVO=correo_verificado_en_brevo
```

> Los dos últimos valores se obtienen desde la plataforma Brevo (antes Sendinblue): https://www.brevo.com

4. Levantar el entorno:

```
   docker compose up --build
```

5. Acceder al backend en:
   http://localhost:3500

---

### ⚙️ Opción 2: Instalación local (sin Docker)

**Requisitos:**

- Node.js v18+
- MongoDB instalado localmente

**Pasos:**

1. Clonar el repositorio:
   git clone https://github.com/lucsducks/backendIzifile
   cd backendIzifile

2. Clonar el archivo de entorno:
   cp .env.template .env

3. Rellenar los siguientes campos del archivo `.env`:

```
PORT=3500
MONGODB_CNN=mongodb://localhost:27017/izifile
SECRETORPRIVATEKEY=tu_clave_jwt
SECRET_SENDIBLUE=clave_api_de_brevo
EMAIL_BREVO=correo_verificado_en_brevo
```

4. Instalar dependencias:
   npm install

5. Ejecutar el servidor:
   npm start

---

## 📫 Contacto

Para soporte o contribuciones, puedes contactar a través de GitHub: https://github.com/lucsducks
