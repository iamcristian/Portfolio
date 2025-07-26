---
title: The Complete Docker Guide - From Basics to Production
slug: en/docker-summarize
image:
  src: /covers/docker-summarize.webp
  alt: Docker containerization comprehensive guide
author: Cristian Arando
language: en
tags: [docker, development]
publishDate: "2025-07-25"
authorContact: crisarandosyse@gmail.com
readTime: 35 min
excerpt: A comprehensive guide to Docker covering everything from basic containerization concepts to advanced production deployments, Kubernetes orchestration, and best practices for fullstack developers.
---

## 1. Understanding Containerization

Containerization is a lightweight virtualization technology that packages applications and their dependencies into portable, isolated units called containers.

### Why Containerization Matters

**For Individual Developers:**
- **Consistency**: "It works on my machine" becomes "It works everywhere"
- **Isolation**: Dependencies don't conflict between projects
- **Portability**: Run anywhere Docker is installed
- **Quick Setup**: Onboard new developers instantly

**For Teams:**
- **Standardization**: Everyone uses the same environment
- **Scalability**: Easily scale applications horizontally
- **DevOps Integration**: Seamless CI/CD pipelines
- **Resource Efficiency**: Better resource utilization than VMs

### Containers vs Virtual Machines

```
Virtual Machines                    Containers
┌─────────────────────┐            ┌─────────────────────┐
│   App 1   │  App 2  │            │   App 1   │  App 2  │
├───────────┼─────────┤            ├───────────┼─────────┤
│   Libs    │  Libs   │            │   Libs    │  Libs   │
├───────────┼─────────┤            ├─────────────────────┤
│  Guest OS │Guest OS │            │    Docker Engine    │
├─────────────────────┤            ├─────────────────────┤
│     Hypervisor      │            │      Host OS        │
├─────────────────────┤            ├─────────────────────┤
│      Host OS        │            │     Infrastructure  │
└─────────────────────┘            └─────────────────────┘
```

**Key Differences:**
- **Containers**: Share host OS kernel, faster startup, less resource usage
- **VMs**: Complete OS isolation, slower startup, more resource intensive

## 2. Docker Fundamentals

Docker is a platform that uses OS-level virtualization to deliver software in containers.

### Core Docker Concepts

**Image**: Read-only template used to create containers. Like a blueprint or class.

**Container**: Running instance of an image. Like an object instantiated from a class.

**Dockerfile**: Text file containing instructions to build an image.

**Registry**: Service for storing and distributing images (Docker Hub, ECR, etc.).

**Volume**: Persistent data storage that survives container restarts.

**Network**: Communication layer between containers and external world.

### Docker Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Client                        │
│  (docker CLI, Docker Desktop, IDEs)                    │
└─────────────────────┬───────────────────────────────────┘
                      │ API calls
┌─────────────────────▼───────────────────────────────────┐
│                 Docker Daemon                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│  │  Images     │ │ Containers  │ │  Networks   │      │
│  └─────────────┘ └─────────────┘ └─────────────┘      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│  │  Volumes    │ │   Plugins   │ │   Registry  │      │
│  └─────────────┘ └─────────────┘ └─────────────┘      │
└─────────────────────────────────────────────────────────┘
```

## 3. Docker Installation and Setup

### Installation by Platform

#### Windows (Docker Desktop)
```powershell
# Download from https://desktop.docker.com/
# Or using chocolatey
choco install docker-desktop

# Verify installation
docker --version
docker-compose --version
```

#### macOS (Docker Desktop)
```bash
# Download from https://desktop.docker.com/
# Or using Homebrew
brew install --cask docker

# Verify installation
docker --version
docker-compose --version
```

#### Linux (Ubuntu/Debian)
```bash
# Update package index
sudo apt-get update

# Install dependencies
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add user to docker group (avoid sudo)
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker compose version
```

### Post-Installation Configuration

```bash
# Test Docker installation
docker run hello-world

# Configure Docker daemon (optional)
sudo systemctl enable docker
sudo systemctl start docker

# Configure resource limits (Docker Desktop)
# Settings → Resources → Advanced
# - CPU: 2-4 cores
# - Memory: 4-8 GB
# - Disk: 60+ GB
```

## 4. Basic Docker Commands

### Image Management

```bash
# List local images
docker images
docker image ls

# Search for images on Docker Hub
docker search nginx
docker search node

# Pull image from registry
docker pull nginx:latest
docker pull node:18-alpine

# Remove images
docker rmi image_name
docker image rm image_id

# Remove unused images
docker image prune
docker image prune -a  # Remove all unused images

# Show image details
docker inspect nginx:latest
docker history nginx:latest  # Show image layers
```

### Container Lifecycle

```bash
# Run container (creates and starts)
docker run nginx
docker run -d nginx                    # Detached mode
docker run -it ubuntu bash             # Interactive mode
docker run --name my-nginx nginx       # Custom name
docker run -p 8080:80 nginx           # Port mapping

# List containers
docker ps              # Running containers
docker ps -a           # All containers (including stopped)

# Start/stop containers
docker start container_name
docker stop container_name
docker restart container_name

# Remove containers
docker rm container_name
docker rm -f container_name    # Force remove running container

# Clean up stopped containers
docker container prune
```

### Container Interaction

```bash
# Execute commands in running container
docker exec container_name ls /app
docker exec -it container_name bash    # Interactive shell

# View container logs
docker logs container_name
docker logs -f container_name          # Follow logs
docker logs --tail 50 container_name   # Last 50 lines

# Copy files between host and container
docker cp file.txt container_name:/app/
docker cp container_name:/app/file.txt ./

# View container resource usage
docker stats
docker stats container_name

# View container processes
docker top container_name
```

## 5. Writing Dockerfiles

Dockerfiles are the blueprint for creating Docker images. Understanding how to write efficient Dockerfiles is crucial.

### Dockerfile Basics

```dockerfile
# Example: Node.js Application Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
```

### Dockerfile Instructions Reference

#### Essential Instructions

```dockerfile
# Base image
FROM ubuntu:20.04
FROM node:18-alpine AS builder

# Metadata
LABEL maintainer="your.email@example.com"
LABEL version="1.0"
LABEL description="My awesome application"

# Working directory
WORKDIR /app
WORKDIR /usr/src/app

# Copy files
COPY package.json .
COPY . .
COPY --from=builder /app/dist ./dist

# Add files (with URL support and auto-extraction)
ADD https://github.com/user/repo/archive/main.tar.gz /tmp/

# Run commands
RUN apt-get update && apt-get install -y curl
RUN npm install
RUN chmod +x script.sh

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL="postgresql://..."

# Arguments (build-time variables)
ARG VERSION=latest
ARG BUILD_DATE

# Expose ports
EXPOSE 3000
EXPOSE 8080 8443

# Volumes
VOLUME ["/data", "/logs"]

# User
USER 1001
USER nodejs

# Entry point (always executed)
ENTRYPOINT ["docker-entrypoint.sh"]

# Command (default command, can be overridden)
CMD ["npm", "start"]
CMD ["node", "server.js"]
```

### Multi-Stage Builds

Multi-stage builds optimize image size by separating build and runtime environments:

```dockerfile
# Frontend Build Example
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```dockerfile
# Backend Build Example
# Stage 1: Build
FROM golang:1.19-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main .

# Stage 2: Production
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
CMD ["./main"]
```

### Dockerfile Best Practices

#### 1. Layer Optimization

```dockerfile
# ❌ Bad: Creates multiple layers
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y vim
RUN apt-get clean

# ✅ Good: Single layer
RUN apt-get update && \
    apt-get install -y curl vim && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

#### 2. Dependency Management

```dockerfile
# ❌ Bad: Copy everything first
COPY . .
RUN npm install

# ✅ Good: Copy dependencies first (better caching)
COPY package*.json ./
RUN npm ci --only=production
COPY . .
```

#### 3. Security Best Practices

```dockerfile
# Use specific tags, not 'latest'
FROM node:18.17.0-alpine3.18

# Create and use non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Use COPY instead of ADD when possible
COPY package.json .

# Remove package managers after installation
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set proper permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

# Use HEALTHCHECK
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

### Common Dockerfile Patterns

#### Node.js Application

```dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Bundle app source
COPY . .

# Create user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN chown -R nextjs:nodejs /usr/src/app
USER nextjs

EXPOSE 3000

CMD [ "node", "server.js" ]
```

#### Python Application

```dockerfile
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /code

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /code/

# Create user
RUN adduser --disabled-password --gecos '' appuser
RUN chown -R appuser:appuser /code
USER appuser

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

#### Java (Spring Boot) Application

```dockerfile
FROM openjdk:17-jdk-slim AS builder

WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jre-slim

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

RUN addgroup --system spring && adduser --system spring --ingroup spring
USER spring:spring

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
```

## 6. Docker Compose

Docker Compose allows you to define and run multi-container Docker applications using YAML files.

### Docker Compose Basics

#### Installation

```bash
# Docker Compose v2 (bundled with Docker Desktop)
docker compose version

# Standalone installation (Linux)
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### Basic docker-compose.yml Structure

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - database

  database:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:

networks:
  default:
    name: myapp_network
```

### Common Docker Compose Patterns

#### Full-Stack Web Application

```yaml
version: '3.8'

services:
  # Frontend (React/Vue/Angular)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend

  # Backend (Node.js/Python/Java)
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@database:5432/myapp
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./backend:/app
    depends_on:
      - database
      - redis

  # Database
  database:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  # Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  # Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  redis_data:

networks:
  default:
    name: myapp_network
```

#### Microservices Architecture

```yaml
version: '3.8'

services:
  # API Gateway
  api-gateway:
    build: ./api-gateway
    ports:
      - "8080:8080"
    environment:
      - USER_SERVICE_URL=http://user-service:3000
      - ORDER_SERVICE_URL=http://order-service:3000
    depends_on:
      - user-service
      - order-service

  # User Service
  user-service:
    build: ./user-service
    environment:
      - DATABASE_URL=postgresql://user:password@user-db:5432/users
    depends_on:
      - user-db

  user-db:
    image: postgres:15
    environment:
      POSTGRES_DB: users
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - user_data:/var/lib/postgresql/data

  # Order Service
  order-service:
    build: ./order-service
    environment:
      - DATABASE_URL=mongodb://order-db:27017/orders
    depends_on:
      - order-db

  order-db:
    image: mongo:6
    volumes:
      - order_data:/data/db

  # Message Queue
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "15672:15672"  # Management UI
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: password

volumes:
  user_data:
  order_data:
```

### Docker Compose Commands

```bash
# Start services
docker compose up
docker compose up -d                    # Detached mode
docker compose up --build               # Force rebuild
docker compose up service_name          # Start specific service

# Stop services
docker compose down
docker compose down -v                  # Remove volumes
docker compose down --rmi all           # Remove images

# View services
docker compose ps
docker compose top
docker compose images

# Logs
docker compose logs
docker compose logs -f service_name     # Follow logs
docker compose logs --tail=50           # Last 50 lines

# Execute commands
docker compose exec service_name bash
docker compose run service_name command

# Scale services
docker compose up --scale web=3

# Build/rebuild
docker compose build
docker compose build service_name

# Pull latest images
docker compose pull
```

### Environment Variables and Configuration

#### .env File

```bash
# .env file
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/myapp
REDIS_URL=redis://localhost:6379
API_KEY=your_secret_api_key
PORT=3000
```

#### Using Environment Variables

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "${PORT:-3000}:3000"
    environment:
      - NODE_ENV=${NODE_ENV}
      - DATABASE_URL=${DATABASE_URL}
      - API_KEY=${API_KEY}
    env_file:
      - .env
      - .env.local

  database:
    image: postgres:15
    environment:
      POSTGRES_DB: ${DB_NAME:-myapp}
      POSTGRES_USER: ${DB_USER:-user}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
```

#### Multiple Environment Files

```bash
# Development
docker compose --env-file .env.dev up

# Production
docker compose --env-file .env.prod up

# Override files
docker compose -f docker-compose.yml -f docker-compose.override.yml up
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```

## 7. Docker Volumes and Data Management

Volumes provide persistent data storage for containers.

### Volume Types

#### Named Volumes

```bash
# Create named volume
docker volume create mydata

# Use in container
docker run -v mydata:/data nginx

# List volumes
docker volume ls

# Inspect volume
docker volume inspect mydata

# Remove volume
docker volume rm mydata
```

#### Bind Mounts

```bash
# Mount host directory to container
docker run -v /host/path:/container/path nginx
docker run -v $(pwd):/app node:18

# Read-only mount
docker run -v $(pwd):/app:ro nginx
```

#### tmpfs Mounts (Linux only)

```bash
# Mount tmpfs (memory-based)
docker run --tmpfs /tmp nginx
```

### Volume Management in Docker Compose

```yaml
version: '3.8'

services:
  web:
    build: .
    volumes:
      # Named volume
      - app_data:/app/data
      
      # Bind mount
      - ./src:/app/src
      
      # Anonymous volume
      - /app/node_modules
      
      # Read-only bind mount
      - ./config:/app/config:ro

  database:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro

volumes:
  app_data:
    driver: local
  postgres_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /path/to/data
```

### Data Backup and Restore

```bash
# Backup volume to tar file
docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /data .

# Restore from backup
docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /data

# Database backup example
docker exec database_container pg_dump -U user database > backup.sql

# Database restore example
docker exec -i database_container psql -U user database < backup.sql
```

## 8. Docker Networking

Docker provides several networking options for container communication.

### Network Types

#### Bridge Network (Default)

```bash
# Create custom bridge network
docker network create mynetwork

# Run container on specific network
docker run --network mynetwork nginx

# Connect running container to network
docker network connect mynetwork container_name
```

#### Host Network

```bash
# Use host networking (Linux only)
docker run --network host nginx
```

#### None Network

```bash
# No networking
docker run --network none alpine
```

### Custom Networks in Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    networks:
      - frontend-network
      - backend-network

  backend:
    build: ./backend
    networks:
      - backend-network
      - database-network

  database:
    image: postgres:15
    networks:
      - database-network

networks:
  frontend-network:
    driver: bridge
  backend-network:
    driver: bridge
  database-network:
    driver: bridge
    internal: true  # No external access
```

### Service Discovery

```yaml
version: '3.8'

services:
  web:
    build: .
    environment:
      # Use service name as hostname
      - DATABASE_HOST=database
      - REDIS_HOST=redis
    depends_on:
      - database
      - redis

  database:
    image: postgres:15
    # Accessible as 'database' hostname

  redis:
    image: redis:alpine
    # Accessible as 'redis' hostname
```

## 9. Docker Security Best Practices

Security should be a primary concern when containerizing applications.

### Image Security

#### Use Official Base Images

```dockerfile
# ✅ Use official images
FROM node:18-alpine
FROM python:3.11-slim
FROM openjdk:17-jre-slim

# ❌ Avoid unofficial images
FROM someuser/custom-node
```

#### Use Specific Tags

```dockerfile
# ✅ Specific versions
FROM node:18.17.0-alpine3.18
FROM postgres:15.4

# ❌ Avoid latest tag
FROM node:latest
FROM postgres:latest
```

#### Minimize Attack Surface

```dockerfile
# Use minimal base images
FROM alpine:3.18
FROM distroless/java:17
FROM scratch  # For Go binaries

# Remove unnecessary packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

### Runtime Security

#### Run as Non-Root User

```dockerfile
FROM node:18-alpine

# Create user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Or use numeric UID
USER 1001
```

#### Read-Only File System

```bash
# Run with read-only root filesystem
docker run --read-only -v /tmp:/tmp nginx

# Docker Compose
version: '3.8'
services:
  web:
    image: nginx
    read_only: true
    tmpfs:
      - /tmp
      - /var/cache/nginx
```

#### Resource Limits

```yaml
version: '3.8'

services:
  web:
    image: nginx
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### Network Security

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    networks:
      - frontend

  backend:
    build: ./backend
    networks:
      - frontend
      - backend

  database:
    image: postgres:15
    networks:
      - backend  # Not exposed to frontend

networks:
  frontend:
  backend:
    internal: true  # No external access
```

### Secrets Management

```yaml
version: '3.8'

services:
  web:
    image: myapp
    secrets:
      - db_password
      - api_key
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
  api_key:
    external: true
```

```bash
# Create secret
echo "my_secret_password" | docker secret create db_password -

# Use in service
docker service create \
  --name myapp \
  --secret db_password \
  myapp:latest
```

### Security Scanning

```bash
# Scan image for vulnerabilities
docker scan myapp:latest

# Use security scanning tools
trivy image myapp:latest
grype myapp:latest

# Scan during build
docker build --scan .
```

## 10. Production Best Practices

### Health Checks

```dockerfile
# Application health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Database health check
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD pg_isready -U user -d database || exit 1
```

```yaml
version: '3.8'

services:
  web:
    build: .
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Logging

```dockerfile
# Configure logging
ENV PYTHONUNBUFFERED=1
ENV NODE_ENV=production
```

```yaml
version: '3.8'

services:
  web:
    build: .
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Environment-Specific Configuration

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  web:
    image: myapp:${VERSION}
    restart: unless-stopped
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
    logging:
      driver: "fluentd"
      options:
        fluentd-address: "localhost:24224"
```

### Multi-Architecture Builds

```bash
# Create buildx builder
docker buildx create --name mybuilder --use

# Build for multiple architectures
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag myapp:latest \
  --push .
```

## 11. Docker Registry and Distribution

### Working with Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag myapp:latest username/myapp:latest
docker tag myapp:latest username/myapp:v1.0.0

# Push image
docker push username/myapp:latest
docker push username/myapp:v1.0.0

# Pull image
docker pull username/myapp:latest
```

### Private Registries

#### AWS ECR

```bash
# Login to ECR
aws ecr get-login-password --region region | docker login --username AWS --password-stdin account.dkr.ecr.region.amazonaws.com

# Tag and push
docker tag myapp:latest account.dkr.ecr.region.amazonaws.com/myapp:latest
docker push account.dkr.ecr.region.amazonaws.com/myapp:latest
```

#### Google Container Registry

```bash
# Configure Docker for GCR
gcloud auth configure-docker

# Tag and push
docker tag myapp:latest gcr.io/project-id/myapp:latest
docker push gcr.io/project-id/myapp:latest
```

#### Azure Container Registry

```bash
# Login to ACR
az acr login --name myregistry

# Tag and push
docker tag myapp:latest myregistry.azurecr.io/myapp:latest
docker push myregistry.azurecr.io/myapp:latest
```

### Self-Hosted Registry

```yaml
version: '3.8'

services:
  registry:
    image: registry:2
    ports:
      - "5000:5000"
    environment:
      REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: /data
    volumes:
      - registry_data:/data

volumes:
  registry_data:
```

## 12. Introduction to Kubernetes

Kubernetes orchestrates containerized applications across clusters of machines.

### Why Kubernetes?

**Container Orchestration:**
- Automated deployment and scaling
- Service discovery and load balancing
- Rolling updates and rollbacks
- Self-healing and fault tolerance

**Production-Ready Features:**
- Secrets and configuration management
- Storage orchestration
- Batch execution
- Resource allocation and limits

### Kubernetes Architecture

```
Master Node(s)                     Worker Nodes
┌─────────────────────┐            ┌─────────────────────┐
│   API Server        │◄──────────►│      kubelet        │
├─────────────────────┤            ├─────────────────────┤
│   etcd              │            │   Container Runtime │
├─────────────────────┤            │   (Docker/containerd)│
│   Scheduler         │            ├─────────────────────┤
├─────────────────────┤            │      Pods           │
│   Controller        │            │   ┌───┐ ┌───┐ ┌───┐ │
│   Manager           │            │   │ C │ │ C │ │ C │ │
└─────────────────────┘            │   └───┘ └───┘ └───┘ │
                                   └─────────────────────┘
```

### Core Kubernetes Objects

#### Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
```

#### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
```

#### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
```

#### ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_url: "postgresql://localhost:5432/myapp"
  debug: "true"
  config.json: |
    {
      "api_url": "https://api.example.com",
      "timeout": 30
    }
```

#### Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  username: YWRtaW4=  # base64 encoded
  password: MWYyZDFlMmU2N2Rm  # base64 encoded
```

### Complete Application Example

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: database_url
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secret
              key: password
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  selector:
    app: web-app
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

### Basic kubectl Commands

```bash
# Cluster information
kubectl cluster-info
kubectl get nodes

# Deploy applications
kubectl apply -f deployment.yaml
kubectl apply -f https://raw.githubusercontent.com/user/repo/main/k8s/

# Get resources
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get all

# Describe resources
kubectl describe pod pod-name
kubectl describe deployment deployment-name

# Logs
kubectl logs pod-name
kubectl logs -f deployment/app-name

# Execute commands
kubectl exec -it pod-name -- bash
kubectl exec -it pod-name -- sh

# Port forwarding
kubectl port-forward pod/pod-name 8080:80
kubectl port-forward service/service-name 8080:80

# Scale deployments
kubectl scale deployment app-name --replicas=5

# Delete resources
kubectl delete pod pod-name
kubectl delete -f deployment.yaml
kubectl delete deployment,service app-name
```

### Local Kubernetes Development

#### Minikube

```bash
# Install and start Minikube
minikube start
minikube status

# Use Minikube Docker daemon
eval $(minikube docker-env)

# Build image in Minikube
docker build -t myapp:latest .

# Deploy to Minikube
kubectl apply -f deployment.yaml

# Access service
minikube service web-service
```

#### Kind (Kubernetes in Docker)

```bash
# Install Kind
# Download from https://kind.sigs.k8s.io/

# Create cluster
kind create cluster --name my-cluster

# Load Docker image to Kind
kind load docker-image myapp:latest --name my-cluster

# Deploy application
kubectl apply -f deployment.yaml
```

#### Docker Desktop Kubernetes

```bash
# Enable Kubernetes in Docker Desktop settings
# Then use kubectl normally
kubectl apply -f deployment.yaml
```

## 13. Advanced Docker Techniques

### Docker BuildKit

```bash
# Enable BuildKit
export DOCKER_BUILDKIT=1

# Or permanently in daemon.json
{
  "features": {
    "buildkit": true
  }
}
```

```dockerfile
# syntax=docker/dockerfile:1
FROM node:18-alpine

# BuildKit features
RUN --mount=type=cache,target=/root/.npm \
    npm install

# Secret mounts
RUN --mount=type=secret,id=mypassword \
    cat /run/secrets/mypassword
```

### Image Optimization

```dockerfile
# Multi-stage build with BuildKit cache
# syntax=docker/dockerfile:1

FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER nextjs
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Custom Networks and DNS

```bash
# Create custom network with specific subnet
docker network create --driver bridge \
  --subnet=172.20.0.0/16 \
  --ip-range=172.20.240.0/20 \
  mynetwork

# Run container with custom IP
docker run --network mynetwork --ip 172.20.240.10 nginx

# Custom DNS
docker run --dns=8.8.8.8 --dns=8.8.4.4 nginx
```

### Performance Monitoring

```bash
# Container resource usage
docker stats
docker stats --no-stream

# System-wide information
docker system df
docker system info

# Events monitoring
docker events
docker events --filter container=myapp
```

## 14. CI/CD with Docker

### Docker in GitHub Actions

```yaml
# .github/workflows/docker.yml
name: Docker Build and Push

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3

    - name: Login to Docker Hub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}

    - name: Build and push
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: |
          myapp:latest
          myapp:${{ github.sha }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
```

### GitLab CI/CD

```yaml
# .gitlab-ci.yml
variables:
  DOCKER_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

stages:
  - build
  - test
  - deploy

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE

test:
  stage: test
  image: $DOCKER_IMAGE
  script:
    - npm test

deploy:
  stage: deploy
  script:
    - docker run -d --name myapp -p 80:3000 $DOCKER_IMAGE
  only:
    - main
```

### Jenkins Pipeline

```groovy
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "myapp:${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Build') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside {
                        sh 'npm test'
                    }
                }
            }
        }
        
        stage('Push') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
                        docker.image(DOCKER_IMAGE).push()
                        docker.image(DOCKER_IMAGE).push('latest')
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                    docker stop myapp || true
                    docker rm myapp || true
                    docker run -d --name myapp -p 80:3000 ${DOCKER_IMAGE}
                '''
            }
        }
    }
    
    post {
        always {
            sh 'docker system prune -f'
        }
    }
}
```

## 15. Troubleshooting and Debugging

### Common Issues and Solutions

#### Container Won't Start

```bash
# Check container logs
docker logs container_name
docker logs --details container_name

# Check container configuration
docker inspect container_name

# Debug with interactive shell
docker run -it --entrypoint sh image_name

# Override entrypoint
docker run -it --entrypoint bash image_name
```

#### Permission Issues

```bash
# Check file ownership in container
docker exec container_name ls -la /app

# Fix ownership
docker exec container_name chown -R user:group /app

# Run as specific user
docker run --user 1000:1000 image_name
```

#### Network Connectivity

```bash
# Test network connectivity
docker exec container_name ping google.com
docker exec container_name nslookup database

# Check network configuration
docker network ls
docker network inspect network_name

# Check port mapping
docker port container_name
```

#### Resource Issues

```bash
# Check resource usage
docker stats
docker system df

# Clean up resources
docker system prune
docker volume prune
docker image prune -a

# Check available space
df -h
```

### Debugging Tools

```dockerfile
# Add debugging tools to image
RUN apk add --no-cache curl netcat-openbsd tcpdump

# Debug network issues
RUN apk add --no-cache bind-tools

# Debug with strace
RUN apk add --no-cache strace
```

### Production Debugging

```bash
# Access running container
kubectl exec -it pod-name -- bash

# Copy files from container
kubectl cp pod-name:/app/logs ./logs

# Check resource usage
kubectl top pods
kubectl top nodes

# Check events
kubectl get events --sort-by=.metadata.creationTimestamp
```

## 16. Docker Security in Production

### Container Security Scanning

```bash
# Trivy security scanner
trivy image myapp:latest

# Grype vulnerability scanner
grype myapp:latest

# Docker Scout (built-in)
docker scout quickview
docker scout cves myapp:latest
```

### Security Best Practices Checklist

**Image Security:**
- [ ] Use official base images
- [ ] Use specific image tags
- [ ] Regular security scanning
- [ ] Minimal base images
- [ ] No secrets in images

**Runtime Security:**
- [ ] Run as non-root user
- [ ] Read-only file systems
- [ ] Resource limits
- [ ] Network segmentation
- [ ] Secrets management

**Configuration Security:**
- [ ] Secure registry access
- [ ] TLS encryption
- [ ] Access controls
- [ ] Audit logging
- [ ] Regular updates

### Container Runtime Security

```yaml
# Pod Security Standards
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
  - name: app
    image: myapp:latest
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
```

This comprehensive Docker guide covers everything from basic concepts to advanced production practices. Whether you're a junior developer starting with containers or a senior developer implementing microservices architecture, this guide provides the practical knowledge needed for successful Docker adoption in any development environment.
