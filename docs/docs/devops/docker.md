---
sidebar_position: 1
---

# Docker

## Overview

Docker is a platform for building, shipping, and running applications in lightweight, isolated containers. A container packages the application binary together with its runtime, libraries, and configuration — eliminating the "works on my machine" problem.

---

## Core Concepts

| Concept | Description |
|---|---|
| **Image** | Immutable, layered template built from a Dockerfile |
| **Container** | Running instance of an image |
| **Dockerfile** | Instructions to build an image |
| **Registry** | Storage for images (Docker Hub, ECR, GHCR) |
| **Volume** | Persistent storage mounted into a container |
| **Network** | Virtual network connecting containers |

---

## Dockerfile Best Practices

```dockerfile
# Multi-stage build — keeps final image small
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline          # cache dependencies separately
COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
RUN groupadd -r appuser && useradd -r -g appuser appuser  # non-root user
COPY --from=build /app/target/app.jar app.jar
USER appuser
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Key rules:**
- Order layers from least to most frequently changing (dependencies before source code).
- Use multi-stage builds to exclude build tools from the final image.
- Always run as a non-root user.
- Use specific base image tags, not `latest`.
- Use `.dockerignore` to exclude `node_modules`, `.git`, `target`.

---

## Essential Commands

```bash
# Build
docker build -t myapp:1.0 .
docker build --no-cache -t myapp:1.0 .

# Run
docker run -d -p 8080:8080 --name myapp myapp:1.0
docker run -it ubuntu:22.04 bash          # interactive

# Inspect
docker ps                                  # running containers
docker ps -a                               # all containers
docker logs myapp -f                       # follow logs
docker exec -it myapp bash                 # shell into container
docker inspect myapp                       # full metadata JSON

# Images
docker images
docker pull nginx:alpine
docker push myrepo/myapp:1.0
docker rmi myapp:1.0

# Cleanup
docker system prune -a                     # remove all unused resources
docker volume prune
```

---

## Docker Compose

Compose orchestrates multi-container applications locally:

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/mydb
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      retries: 5

volumes:
  pgdata:
```

```bash
docker compose up -d
docker compose down -v          # stop and remove volumes
docker compose logs app -f
docker compose exec app bash
```

---

## Networking

Docker creates three default networks:

- `bridge` — default for containers on the same host; use service names as DNS hostnames in Compose.
- `host` — container shares the host network stack (Linux only).
- `none` — no networking.

---

## Volumes vs Bind Mounts

| | Volume | Bind Mount |
|---|---|---|
| Managed by Docker | Yes | No |
| Path | Docker-managed | Host path |
| Portability | High | Low |
| Best for | Production data | Development (live reload) |

---

## Best Practices

- Pin base image digests in production (`FROM node:20.11@sha256:...`).
- Scan images for vulnerabilities: `docker scout cves myapp:1.0`.
- Never store secrets in images — use Docker secrets or env vars at runtime.
- Keep images small — prefer `-alpine` or `-slim` variants.
- One process per container.

---

## Common Mistakes

- Running containers as root.
- Using `latest` tag — breaks reproducibility.
- Copying entire project into image (`COPY . .`) before caching dependencies.
- Not using health checks in Compose — `depends_on` without `condition: service_healthy` is unreliable.

---

## Interview Questions

**Q: What is the difference between CMD and ENTRYPOINT?**  
`ENTRYPOINT` defines the executable that always runs. `CMD` provides default arguments that can be overridden at `docker run`. Combined: `ENTRYPOINT ["java"]` + `CMD ["-jar", "app.jar"]`.

**Q: How do layers work in Docker images?**  
Each Dockerfile instruction creates a read-only layer. Layers are cached and shared between images. When a layer changes, all subsequent layers are invalidated. This is why dependency installation should come before copying source code.

**Q: How do containers differ from virtual machines?**  
VMs virtualise hardware (full OS per VM). Containers share the host kernel and isolate at the process level using Linux namespaces and cgroups. Containers start in milliseconds and use far less memory.

---

## Cheat Sheet

```
Build:   docker build -t name:tag .
Run:     docker run -d -p host:container --name name image
Exec:    docker exec -it name bash
Logs:    docker logs name -f
Stop:    docker stop name && docker rm name
Clean:   docker system prune -a

Compose: docker compose up -d | down | logs | exec
```
