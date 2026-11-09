# MS-Oportunidades

Microservicio de **pipeline comercial y licitaciones** del proyecto **CRM Empresa–Gobierno (B2G)**, construido con arquitectura de microservicios (7 servicios, uno por grupo). MS-Oportunidades es el núcleo comercial del sistema.

## ¿Qué hace?

- Gestiona oportunidades de licitación: registrar, consultar, filtrar y editar, vinculadas a una institución (validada contra **MS-Instituciones**).
- Muestra el pipeline en un **tablero Kanban** con las etapas: `detección → oferta → presentada → evaluación → adjudicada / perdida`.
- Valida las transiciones de etapa **en el backend**; una oportunidad cerrada no se reabre ni se edita.
- Al adjudicar, publica el evento `oportunidad.adjudicada` en **RabbitMQ** (lo consumen MS-Contratos y MS-Notificaciones-Alertas).
- Expone una API REST que consulta **MS-Reportes**.
- Valida **JWT** y aplica control de acceso básico por rol.

## Stack tecnológico

| Componente | Tecnología |
| --- | --- |
| Backend | Node.js + Express (API REST, JSON) |
| Base de datos | PostgreSQL (propia del servicio) |
| Mensajería | RabbitMQ (compartido a nivel de proyecto) |
| Autenticación | JWT emitido por el servicio de autenticación centralizado |
| Frontend | React (tablero Kanban) |
| Documentación de la API | Swagger / OpenAPI |
| Despliegue | Docker y Docker Compose |

## Estructura del repositorio

```
ms-oportunidades/
├── backend/
│   ├── src/
│   │   ├── config/         # Conexión a la BD, variables de entorno, RabbitMQ
│   │   ├── routes/         # Definición de los endpoints
│   │   ├── controllers/    # Reciben la petición y devuelven la respuesta
│   │   ├── services/       # Reglas de negocio (p. ej. transiciones de etapa)
│   │   ├── repositories/   # Consultas SQL a PostgreSQL
│   │   ├── middlewares/    # Validación de JWT y control de roles
│   │   └── events/         # Evento oportunidad.adjudicada y publicación (outbox)
│   └── tests/              # Pruebas del backend
├── frontend/               # Aplicación React con el tablero Kanban
├── .vscode/                # Configuración compartida de VS Code
├── docker-compose.yml      # Servicios: db (PostgreSQL) y RabbitMQ (api se agrega después)
├── .env.example            # Plantilla de variables de entorno (sin valores reales)
├── .gitignore
├── .node-version           # Versión de Node.js del equipo (26.13.0)
├── LICENSE                 # MIT
└── README.md
```

> Algunos archivos (`.env.example`, `.node-version`, `.gitignore`, `.vscode/`) se incorporan en los primeros commits del proyecto.

## Requisitos

- Node.js **26.13.0** (LTS), instalado con fnm
- Git
- Docker Desktop (con WSL2 en Windows)
- Visual Studio Code (extensiones recomendadas: Prettier, ESLint, Docker, REST Client)

## Puesta en marcha

1. Clonar el repositorio y entrar a la carpeta.
2. Crear el archivo `.env` a partir de la plantilla (nunca se sube a GitHub):
   ```powershell
   Copy-Item .env.example .env
   ```
3. Levantar la infraestructura:
   ```powershell
   docker compose up -d
   docker compose ps
   ```
4. Panel de RabbitMQ: http://localhost:15672

## Flujo de trabajo en Git

- `main` es la rama estable: no se trabaja directamente sobre ella.
- Cada tarea o historia de usuario va en su propia rama, por ejemplo `feature/HU-01-crear-oportunidad`.
- Los cambios se integran a `main` mediante *pull request* revisado por un compañero.

## Equipo de trabajo

| Integrante | GitHub | Rol |
| --- | --- | --- |
| Jose Luis Quintero | [@Rekkuza11](https://github.com/Rekkuza11) | Líder funcional |
| Yojan Emanuel Muñoz | [@trashmzg](https://github.com/trashmzg) | Desarrollador (HU-02: pipeline) |
| Isaac Steban Mora | [@IsaacMora1153](https://github.com/IsaacMora1153) | Desarrollador (HU-01: gestión de oportunidades) |

## Licencia

Distribuido bajo licencia MIT. Ver el archivo [LICENSE](LICENSE).
