# Task Manager API - Backend (NestJS + PostgreSQL + Docker)

API RESTful desarrollada en **NestJS**, con base de datos **PostgreSQL**, usando **arquitectura Hexagonal**.  

---

## 🚀 Descripción general

Esta API permite **gestionar usuarios y tareas**, incluyendo operaciones para:
- Crear usuarios.
- Crear tareas asociadas a un usuario.
- Listar tareas por usuario (con filtro por estado).
- Actualizar el estado de una tarea.
- Eliminar tareas.

La aplicación se diseñó aplicando **principios SOLID** y un enfoque modular, facilitando la mantenibilidad, escalabilidad y testeo.

---

## 🧱 Tecnologías utilizadas

| Componente | Tecnología |
|-------------|-------------|
| Lenguaje | TypeScript |
| Framework | NestJS 10 |
| ORM | TypeORM |
| Base de datos | PostgreSQL |
| Testing | Jest |
| Contenedores | Docker + Docker Compose |
| Documentación | Swagger (OpenAPI) |
| Validación | class-validator |

---

## ⚙️ Instrucciones de instalación y ejecución

### 1️⃣ Clonar el proyecto
```bash
git clone https://github.com/jefer15/task-manager.git
cd task-manager
```

### 2️⃣ Variables de entorno
Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```env
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=task_manager
PORT=3000
```

### 3️⃣ Ejecutar con Docker
```bash
docker-compose up --build -d
```
- API disponible en: `http://localhost:3000`
- Swagger: `http://localhost:3000/api/docs`

### 4️⃣ Ejecutar tests unitarios
```bash
npm install
npm run test
```

---

## 🧠 Arquitectura Hexagonal

El proyecto se diseñó con arquitectura **Hexagonal**, dividiendo cada módulo en 4 capas principales:

```
Controller → Use Case → Repository Interface → Repository Implementation → Database
```

### 🔹 Capas

| Capa | Descripción |
|------|--------------|
| **Domain** | Define entidades y contratos (interfaces de repositorios). |
| **Application** | Casos de uso y DTOs, contiene la lógica del negocio. |
| **Infrastructure** | Implementaciones concretas (TypeORM, persistencia). |
| **Presentation** | Controladores HTTP. |

### 🔹 Beneficios
- Separación clara de responsabilidades.  
- Independencia de frameworks o persistencia.  
- Alta capacidad de testeo mediante inyección de dependencias.  

---

## 🧩 Estructura del proyecto

```
src/
├── modules/
│   ├── user/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── presentation/
│   └── task/
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── presentation/
├── config/
├── app.module.ts
└── main.ts

```

---

## 📚 Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/users` | Crear usuario |
| POST | `/tasks` | Crear tarea asociada a usuario |
| GET | `/tasks/user/:userId?status=PENDING` | Listar tareas de un usuario |
| PATCH | `/tasks/:id/status` | Actualizar estado de tarea |
| DELETE | `/tasks/:id` | Eliminar tarea |

---

## 🧾 Ejemplos de requests / responses

### ➕ Crear usuario
**POST** `/users`
```json
{
  "email": "jefer@mail.com",
  "name": "Jefer"
}
```
**Response**
```json
{
  "id": "f5e3e982-f0a3-4d3e-b6f3-253b0e07f3f1",
  "email": "jefer@mail.com",
  "name": "Jefer",
  "createdAt": "2025-10-13T03:15:00.000Z"
}
```

---

### ➕ Crear tarea
**POST** `/tasks`
```json
{
  "title": "Completar documentación Swagger",
  "description": "Agregar decoradores en controladores y DTOs",
  "userId": "f5e3e982-f0a3-4d3e-b6f3-253b0e07f3f1"
}
```
**Response**
```json
{
  "id": "b86df9c0-9c09-4a9f-a31d-427ecde87f2c",
  "title": "Completar documentación Swagger",
  "status": "PENDING",
  "createdAt": "2025-10-13T03:17:00.000Z"
}
```

---

### 🔄 Actualizar estado de tarea
**PATCH** `/tasks/:id/status`
```json
{
  "status": "DONE"
}
```
**Response**
```json
{
  "affected": 1
}
```

---

### ❌ Eliminar tarea
**DELETE** `/tasks/:id`
**Response**
```json
{
  "affected": 1
}
```

---

## 🧪 Pruebas unitarias

Los tests se realizaron con **Jest**, utilizando mocks para simular las dependencias.

### Ejecutar pruebas
```bash
npm run test
```

**Resultado esperado:**
```
Test Suites: 4 passed, 4 total
Tests:       9 passed, 9 total
```

### Áreas cubiertas
- Casos de uso (`CreateUserUseCase`, `CreateTaskUseCase`).
- Controladores (`TaskController`).
- Validación de flujos y errores esperados.

---

## 🧰 Comandos útiles

```bash
# Levantar contenedores
docker-compose up --build -d

# Ver logs de la app
docker-compose logs -f app

# Detener y limpiar
docker-compose down -v

# Ejecutar tests
npm run test
```

---

## 🧱 Decisiones técnicas

- **Arquitectura Hexagonal:** garantiza separación total entre dominio y frameworks.  
- **Principios SOLID:** facilita extensión y mantenibilidad.  
- **Swagger:** documentación accesible y estandarizada para el evaluador.  
- **Docker Compose:** simplifica la ejecución del entorno completo.  
- **Soft Delete:** mantiene historial de tareas eliminadas.  
- **TypeORM:** ORM maduro, compatible con PostgreSQL y migraciones futuras.  
- **Jest:** pruebas rápidas y aisladas sin necesidad de base de datos.
---