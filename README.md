# Full Stack App — React + Spring Boot + PostgreSQL

Aplicación Full Stack desarrollada como prueba técnica. Incluye consumo de API externa (Chuck Norris) y CRUD completo de usuarios.

## Arquitectura

```
├── backend/          # Spring Boot + Java 21
│   ├── controller/   # Capa de presentación (REST)
│   ├── service/      # Lógica de negocio
│   ├── repository/   # Acceso a datos (JPA)
│   ├── model/        # Entidades
│   ├── dto/          # Objetos de transferencia
│   ├── exception/    # Manejo de errores
│   └── config/       # Configuración (CORS, RestTemplate)
├── frontend/         # React + JavaScript
│   ├── components/   # Componentes React
│   └── services/     # Llamadas a la API
├── docker-compose.yml              # Swarm (full stack)
├── docker-compose.backend.yml      # Solo backend
└── docker-compose.frontend.yml     # Solo frontend
```

## Despliegue con Docker Swarm (completo)

```bash
# 1. Construir imágenes
docker build -t fullstack-backend:latest ./backend
docker build -t fullstack-frontend:latest ./frontend

# 2. Inicializar Swarm
docker swarm init

# 3. Desplegar el stack completo
docker stack deploy -c docker-compose.yml app_stack

# 4. Ver servicios
docker service ls

# 5. Ver logs
docker service logs app_stack_backend
```

## 🔧 Levantar por separado

### Solo Backend + DB
```bash
docker compose -f docker-compose.backend.yml up --build
```
Disponible en: http://localhost:8081

### Solo Frontend
```bash
docker compose -f docker-compose.frontend.yml up --build
```
Disponible en: http://localhost:3000

## Desarrollo local (sin Docker)

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 📡 Endpoints

### Usuarios
| Método | Endpoint        | Descripción        |
|--------|-----------------|--------------------|
| GET    | /users          | Listar usuarios    |
| GET    | /users/{id}     | Obtener por ID     |
| POST   | /users          | Crear usuario      |
| PUT    | /users/{id}     | Actualizar usuario |
| DELETE | /users/{id}     | Eliminar usuario   |

### API Externa
| Método | Endpoint        | Descripción              |
|--------|-----------------|--------------------------|
| GET    | /external/joke  | Obtener chiste aleatorio |

## Swagger UI
Disponible en: http://localhost:8081/swagger-ui.html

## Variables de entorno

Copiar `.env.example` a `.env` y ajustar valores:

```bash
cp .env.example .env
```

| Variable             | Default     | Descripción              |
|----------------------|-------------|--------------------------|
| DB_NAME              | appdb       | Nombre de la base        |
| DB_USER              | postgres    | Usuario PostgreSQL        |
| DB_PASSWORD          | postgres    | Contraseña PostgreSQL     |
| REACT_APP_API_URL    | http://localhost:8081 | URL del backend |

## Checklist

- [x] React (JavaScript) en el frontend
- [x] Spring Boot (Java 21) en el backend
- [x] PostgreSQL como base de datos
- [x] CRUD completo de usuarios
- [x] Consumo de API externa (Chuck Norris)
- [x] Separación de módulos (CRUD ≠ API externa)
- [x] Dockerfile para frontend y backend
- [x] docker-compose.yml para Docker Swarm
- [x] docker-compose.frontend.yml
- [x] docker-compose.backend.yml
- [x] NGINX como reverse proxy
- [x] Health checks
- [x] Swagger / OpenAPI
- [x] Manejo de errores HTTP
- [x] Validaciones
- [x] Variables de entorno
- [x] Réplicas en Swarm (2 backend, 2 frontend)
