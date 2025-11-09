# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Cloud Playground** is a technology learning platform that reduces the barrier for developers to learn new technologies by automating environment setup and sample data preparation.

### Core Concept
- One-click activation of learning environments (auto-deploy K8s resources)
- Automatic initialization of sample data
- Interactive practice interface
- Track learning history and progress

### Target User
- Single-user local deployment tool
- Open-source project for self-installation
- Prerequisites: Docker Desktop with Kubernetes enabled, kubectl configured

---

## Technology Stack

### Backend (Spring Boot 3.x)
- **Language:** Java 17+
- **Framework:** Spring Boot, Spring Data JPA
- **Database:** H2 (embedded, for metadata and history)
- **K8s Integration:** Kubernetes Java Client (`io.kubernetes:client-java`)
- **Connection Pool:** HikariCP (dynamic database connections)
- **Real-time:** WebSocket

### Frontend (React 18)
- **Language:** TypeScript
- **UI Library:** Ant Design
- **Code Editor:** Monaco Editor (VS Code engine)
- **State Management:** Zustand
- **Data Fetching:** React Query
- **HTTP Client:** Axios

### Infrastructure
- **Container Platform:** Docker Desktop (with Kubernetes)
- **Orchestration:** Kubernetes (user-managed)

---

## Architecture

```
Browser (React)
  ↓ HTTP/WebSocket
Spring Boot Backend
  ↓ K8s API        ↓ JDBC
Kubernetes Cluster → Database Pods (PostgreSQL/MySQL/Redis/RabbitMQ)
```

### Key Components

**Backend:**
- `ThemeService` - Manages theme lifecycle (activate/deactivate)
- `ExerciseService` - Loads and executes exercises
- `KubernetesClient` - Interacts with K8s API
- `ExecutionEngine` - Executes SQL/Redis commands/Java code
- `ValidationService` - Validates exercise results

**Frontend:**
- Theme Market Page - Browse and activate themes
- Exercise Page - Interactive coding interface with Monaco Editor
- History Page - View past submissions

---

## Project Structure

```
cloud-playground/
├── backend/                    # Spring Boot application
│   ├── src/main/java/com/cloudplayground/
│   │   ├── config/            # Configuration classes
│   │   ├── controller/        # REST Controllers
│   │   ├── service/           # Business logic
│   │   ├── repository/        # JPA Repositories
│   │   ├── model/             # Entities and DTOs
│   │   ├── kubernetes/        # K8s client wrapper
│   │   └── executor/          # Code execution engines
│   ├── src/main/resources/
│   │   ├── application.yml    # App configuration
│   │   ├── schema.sql         # H2 database schema
│   │   └── themes/            # Theme configurations (YAML)
│   │       ├── postgresql/
│   │       ├── mysql/
│   │       ├── redis/
│   │       ├── rabbitmq/
│   │       └── java/
│   └── pom.xml
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── stores/            # Zustand state stores
│   │   ├── types/             # TypeScript type definitions
│   │   └── utils/             # Utility functions
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
│   ├── REQUIREMENTS.md        # Detailed requirements document
│   ├── API.md                 # API documentation
│   └── DEVELOPMENT.md         # Development guide
│
├── CLAUDE.md                  # This file
└── README.md                  # Project documentation
```

---

## Development Commands

### Backend (Spring Boot)

```bash
# Navigate to backend directory
cd backend

# Build the project
./mvnw clean install

# Run the application
./mvnw spring-boot:run

# Run tests
./mvnw test

# Package as JAR
./mvnw package
```

### Frontend (React)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

---

## Key Concepts

### Theme Lifecycle

```
NOT_ACTIVATED → ACTIVATING → RUNNING → STOPPING → STOPPED
```

**Activation Process:**
1. Validate K8s connection
2. Apply K8s resources (Deployment + Service)
3. Wait for Pod readiness
4. Get NodePort endpoint
5. Execute initialization scripts (if any)
6. Save theme status to local database

**Deactivation Process:**
1. Delete K8s resources
2. Optionally preserve PVC (data persistence)
3. Update theme status

### Theme Configuration (YAML)

Each theme is defined by a YAML file in `backend/src/main/resources/themes/{theme-id}/theme.yaml`:

```yaml
id: postgresql
name: PostgreSQL 数据库
version: 1.0.0
description: Learn PostgreSQL core features
category: database

kubernetes:
  deployment:
    image: postgres:15-alpine
    env:
      - name: POSTGRES_PASSWORD
        value: "learningpwd"
  service:
    type: NodePort

connection:
  url: "jdbc:postgresql://{host}:{port}/playground"
  username: postgres
  password: learningpwd

exercises:
  - id: pg-basic-001
    title: "Basic SELECT"
    type: sql-query
    setup_script: exercises/pg-basic-001/setup.sql
    validation:
      type: auto
      expected_result: exercises/pg-basic-001/expected.json
```

### Exercise Types

| Type | Applicable Themes | Validation |
|------|-------------------|------------|
| `sql-query` | PostgreSQL/MySQL | Auto (result set comparison) |
| `redis-command` | Redis | Auto (return value comparison) |
| `messaging` | RabbitMQ | Manual (observation) |
| `code-challenge` | Java | Auto (JUnit tests) |

### Database Schema (H2)

**Main Tables:**
- `theme_status` - Tracks theme activation status
- `exercise_completion` - Records completed exercises
- `exercise_history` - Stores submission history
- `user_config` - User preferences

---

## Development Guidelines

### Adding a New Theme

1. Create theme directory: `backend/src/main/resources/themes/{theme-id}/`
2. Define `theme.yaml` configuration
3. Create exercise directories with setup/solution SQL files
4. Add expected result JSON files for auto-validation
5. Test theme activation and exercise execution

### Adding a New Exercise Type

1. Create executor class in `backend/src/main/java/com/cloudplayground/executor/`
2. Implement `ExerciseExecutor` interface
3. Register executor in `ExecutorFactory`
4. Add corresponding frontend editor component

### K8s Resource Management

- Use namespace `cloud-playground` for all resources
- Apply resource limits (CPU/memory) to prevent exhaustion
- Use NodePort for service exposure (port range 30000-32767)
- Clean up resources on theme deactivation

### Security Considerations

- Use PreparedStatement for SQL to prevent injection
- Java code execution: MVP trusts user input (no sandbox)
- K8s credentials stored securely (use kubectl config)
- Validate all user inputs on backend

---

## MVP Scope (7 Weeks)

### Supported Themes
1. **PostgreSQL** - 5 exercises (basic queries, JOINs, subqueries, indexing, window functions)
2. **MySQL** - 5 exercises (similar to PostgreSQL)
3. **Redis** - 3-5 exercises (data structures, expiration)
4. **RabbitMQ** - 3 exercises (point-to-point, pub/sub, routing)
5. **Java** - 3 exercises (algorithms, collections, threading)

### Core Features
- Theme activation/deactivation
- Interactive code editor (Monaco)
- Exercise execution and result display
- Auto-validation for SQL/Redis exercises
- Exercise history tracking

### Out of Scope (Post-MVP)
- User authentication
- Plugin marketplace
- Custom theme creation UI
- Cloud deployment
- AI-powered hints

---

## Common Issues & Solutions

### K8s Connection Issues
- Verify kubectl context: `kubectl config current-context`
- Test connection: `kubectl get nodes`
- Check Docker Desktop K8s is enabled

### Port Conflicts
- NodePort range: 30000-32767
- Check if ports are available: `netstat -ano | findstr :30000`
- Modify port range in theme YAML if needed

### Pod Startup Failures
- Check logs: `kubectl logs -n cloud-playground <pod-name>`
- Verify image pull: `kubectl describe pod -n cloud-playground <pod-name>`
- Ensure sufficient resources available

### Database Connection Errors
- Verify Service NodePort: `kubectl get svc -n cloud-playground`
- Test connection manually before coding
- Check credentials in theme configuration

---

## Testing Strategy

### Backend Tests
- Unit tests for services (Mockito)
- Integration tests for K8s client
- Controller tests with MockMvc

### Frontend Tests
- Component tests (React Testing Library)
- Integration tests for key flows
- E2E tests (optional, Cypress/Playwright)

---

## Useful Commands

### Kubernetes

```bash
# List all resources in namespace
kubectl get all -n cloud-playground

# View pod logs
kubectl logs -n cloud-playground <pod-name> -f

# Delete all resources in namespace
kubectl delete all --all -n cloud-playground

# Port forward for debugging
kubectl port-forward -n cloud-playground svc/postgresql-svc 5432:5432

# Describe resource
kubectl describe pod -n cloud-playground <pod-name>
```

### Docker

```bash
# Check Docker Desktop status
docker info

# List running containers
docker ps

# View container logs
docker logs <container-id>
```

---

## References

- [Kubernetes Java Client](https://github.com/kubernetes-client/java)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Ant Design](https://ant.design/)

---

**Last Updated:** 2025-11-09
