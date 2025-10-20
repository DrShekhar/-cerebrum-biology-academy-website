# Microservices Migration Plan for Cerebrum Biology Academy

**From Monolith to 10,000+ User Scalable Architecture**

## Executive Summary

This document outlines a comprehensive migration strategy from the current Next.js monolithic architecture to a microservices-based system capable of handling 10,000+ concurrent users with high availability and performance.

## Current State Analysis

### Monolithic Architecture Overview

- **Framework:** Next.js 15.5.3 with App Router
- **Database:** Single PostgreSQL instance with Prisma ORM
- **API Routes:** 50+ routes in `/src/app/api/`
- **Current Capacity:** ~100 concurrent users
- **Deployment:** Single Vercel instance

### Identified Pain Points

1. Single point of failure
2. Resource contention between services
3. Scaling limitations
4. Deployment coupling
5. Technology stack constraints

---

## Migration Strategy Overview

### Phase-Based Approach

- **Phase 1:** Service Extraction (Weeks 1-4)
- **Phase 2:** Infrastructure Setup (Weeks 5-8)
- **Phase 3:** Data Migration (Weeks 9-12)
- **Phase 4:** Service Integration (Weeks 13-16)
- **Phase 5:** Testing & Optimization (Weeks 17-20)
- **Phase 6:** Production Migration (Weeks 21-24)

### Service Decomposition Strategy

Using Domain-Driven Design (DDD) principles to identify bounded contexts.

---

## Service Architecture Design

### 1. User Management Service

**Domain:** Authentication, Authorization, Profile Management

```yaml
Technology Stack:
  - Runtime: Node.js 20+ with Express/Fastify
  - Database: PostgreSQL (dedicated instance)
  - Cache: Redis cluster
  - Authentication: JWT with refresh tokens
  - Rate Limiting: Redis-based

API Endpoints:
  - POST /auth/login
  - POST /auth/register
  - POST /auth/refresh
  - GET /users/profile
  - PUT /users/profile
  - DELETE /users/account

Database Tables:
  - users
  - sessions
  - auth_logs
  - user_profiles

Scaling Configuration:
  - Horizontal: 3-5 replicas
  - CPU: 1-2 cores per instance
  - Memory: 2-4GB per instance
  - Auto-scaling: CPU > 70%
```

### 2. Course Management Service

**Domain:** Courses, Curriculum, Content Management

```yaml
Technology Stack:
  - Runtime: Node.js 20+ with Express
  - Database: PostgreSQL + Redis
  - File Storage: AWS S3/Cloudflare R2
  - CDN: CloudFlare
  - Search: Elasticsearch

API Endpoints:
  - GET /courses
  - GET /courses/:id
  - POST /courses (admin)
  - PUT /courses/:id (admin)
  - GET /courses/search
  - GET /curriculum/:grade

Database Tables:
  - courses
  - lessons
  - curriculum
  - content_files

Scaling Configuration:
  - Horizontal: 2-4 replicas
  - CPU: 1-2 cores per instance
  - Memory: 2-3GB per instance
  - Read replicas: 2 instances
```

### 3. Enrollment Service

**Domain:** Student Enrollments, Progress Tracking

```yaml
Technology Stack:
  - Runtime: Node.js 20+ with Express
  - Database: PostgreSQL with read replicas
  - Cache: Redis
  - Event Bus: RabbitMQ/Apache Kafka
  - Monitoring: Prometheus + Grafana

API Endpoints:
  - POST /enrollments
  - GET /enrollments/student/:id
  - PUT /enrollments/:id/progress
  - GET /enrollments/:id/status
  - DELETE /enrollments/:id

Database Tables:
  - enrollments
  - enrollment_progress
  - course_completions

Event Integration:
  - Enrollment Created → Payment Service
  - Progress Updated → Analytics Service
  - Completion → Notification Service

Scaling Configuration:
  - Horizontal: 3-6 replicas
  - CPU: 2 cores per instance
  - Memory: 3-4GB per instance
  - Database connections: 20 per instance
```

### 4. Payment Service

**Domain:** Payment Processing, Billing, Subscriptions

```yaml
Technology Stack:
  - Runtime: Node.js 20+ with Express
  - Database: PostgreSQL (encrypted)
  - Payment Gateway: Razorpay + Stripe
  - Queue: Redis Bull Queue
  - Security: Vault for secrets management

API Endpoints:
  - POST /payments/create-order
  - POST /payments/verify
  - GET /payments/history/:userId
  - POST /subscriptions/create
  - PUT /subscriptions/:id/cancel
  - GET /billing/invoice/:id

Database Tables:
  - payments
  - subscriptions
  - billing_history
  - payment_methods

Security Features:
  - PCI DSS compliance
  - Data encryption at rest
  - Audit logging
  - Webhook signature validation

Scaling Configuration:
  - Horizontal: 2-3 replicas
  - CPU: 2 cores per instance
  - Memory: 4GB per instance
  - High availability: 99.9% uptime
```

### 5. Analytics Service

**Domain:** User Analytics, Performance Metrics, Reporting

```yaml
Technology Stack:
  - Runtime: Node.js 20+ with Express
  - Database: PostgreSQL + InfluxDB
  - Cache: Redis
  - Data Processing: Apache Kafka + Kafka Streams
  - Visualization: Grafana dashboards

API Endpoints:
  - POST /analytics/events
  - GET /analytics/dashboard/:userId
  - GET /analytics/reports/performance
  - GET /analytics/metrics/engagement
  - POST /analytics/track-activity

Database Tables:
  - analytics_events
  - user_activities
  - performance_metrics
  - aggregated_reports

Real-time Features:
  - Live activity tracking
  - Real-time dashboard updates
  - Performance monitoring
  - Alert system

Scaling Configuration:
  - Horizontal: 2-4 replicas
  - CPU: 2-3 cores per instance
  - Memory: 4-6GB per instance
  - Event processing: 10,000+ events/sec
```

### 6. Communication Service

**Domain:** WhatsApp, Email, SMS, Notifications

```yaml
Technology Stack:
  - Runtime: Node.js 20+ with Express
  - Database: PostgreSQL + MongoDB
  - Message Queue: RabbitMQ
  - External APIs: WhatsApp Business API, SendGrid, Twilio
  - Templates: Handlebars template engine

API Endpoints:
  - POST /notifications/send
  - POST /whatsapp/send-message
  - POST /email/send
  - GET /notifications/:userId
  - PUT /notifications/preferences
  - GET /communication/logs

Database Tables:
  - communication_logs
  - notification_preferences
  - message_templates
  - delivery_status

Integration Features:
  - Template management
  - Delivery tracking
  - Bounce handling
  - Opt-out management

Scaling Configuration:
  - Horizontal: 2-3 replicas
  - CPU: 1-2 cores per instance
  - Memory: 2-3GB per instance
  - Message throughput: 1,000+ messages/min
```

### 7. Assessment Service

**Domain:** Questions, Tests, Evaluations, Scoring

```yaml
Technology Stack:
  - Runtime: Node.js 20+ with Express
  - Database: PostgreSQL + Redis
  - File Storage: AWS S3 (for images)
  - AI Integration: OpenAI API for auto-evaluation
  - Cache: Redis for question pools

API Endpoints:
  - GET /questions/random
  - POST /assessments/submit
  - GET /assessments/results/:id
  - POST /questions/create (admin)
  - GET /leaderboard/:category

Database Tables:
  - questions
  - test_attempts
  - student_responses
  - assessment_results

AI Features:
  - Automatic question generation
  - Answer evaluation
  - Difficulty adjustment
  - Performance prediction

Scaling Configuration:
  - Horizontal: 3-5 replicas
  - CPU: 2-3 cores per instance
  - Memory: 3-4GB per instance
  - Question pool: 50,000+ questions
```

---

## Infrastructure Architecture

### Container Orchestration

**Kubernetes Configuration:**

```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: cerebrum-production
  labels:
    environment: production
    project: cerebrum-biology-academy

---
# user-service-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  namespace: cerebrum-production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
        - name: user-service
          image: cerebrum/user-service:v1.0.0
          ports:
            - containerPort: 3000
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: database-secrets
                  key: user-db-url
            - name: REDIS_URL
              valueFrom:
                secretKeyRef:
                  name: cache-secrets
                  key: redis-url
          resources:
            requests:
              cpu: '500m'
              memory: '1Gi'
            limits:
              cpu: '2'
              memory: '4Gi'
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 60
            periodSeconds: 30

---
# user-service-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: user-service
  namespace: cerebrum-production
spec:
  selector:
    app: user-service
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP

---
# user-service-hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: user-service-hpa
  namespace: cerebrum-production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: user-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

### API Gateway Configuration

**Kong Gateway Setup:**

```yaml
# kong-gateway.yaml
apiVersion: configuration.konghq.com/v1
kind: KongIngress
metadata:
  name: cerebrum-api-gateway
proxy:
  connect_timeout: 10000
  read_timeout: 10000
  write_timeout: 10000
route:
  strip_path: true

---
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: rate-limiting-global
config:
  minute: 1000
  hour: 10000
  policy: redis
  redis_host: redis-cluster
  redis_port: 6379
plugin: rate-limiting

---
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: jwt-auth
config:
  secret_is_base64: false
  key_claim_name: iss
plugin: jwt

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: cerebrum-api-ingress
  annotations:
    konghq.com/plugins: rate-limiting-global,jwt-auth
    konghq.com/strip-path: 'true'
spec:
  rules:
    - host: api.cerebrumbiologyacademy.com
      http:
        paths:
          - path: /auth
            pathType: Prefix
            backend:
              service:
                name: user-service
                port:
                  number: 80
          - path: /courses
            pathType: Prefix
            backend:
              service:
                name: course-service
                port:
                  number: 80
          - path: /enrollments
            pathType: Prefix
            backend:
              service:
                name: enrollment-service
                port:
                  number: 80
          - path: /payments
            pathType: Prefix
            backend:
              service:
                name: payment-service
                port:
                  number: 80
          - path: /analytics
            pathType: Prefix
            backend:
              service:
                name: analytics-service
                port:
                  number: 80
          - path: /notifications
            pathType: Prefix
            backend:
              service:
                name: communication-service
                port:
                  number: 80
          - path: /assessments
            pathType: Prefix
            backend:
              service:
                name: assessment-service
                port:
                  number: 80
```

### Database Architecture

**Multi-Database Strategy:**

```yaml
# Database Configuration per Service
services:
  user-service:
    database:
      primary: user-db-primary.cerebrum.com:5432
      replicas:
        - user-db-replica-1.cerebrum.com:5432
        - user-db-replica-2.cerebrum.com:5432
      schema: user_management
      max_connections: 50

  course-service:
    database:
      primary: course-db-primary.cerebrum.com:5432
      replicas:
        - course-db-replica-1.cerebrum.com:5432
      schema: course_management
      max_connections: 30

  enrollment-service:
    database:
      primary: enrollment-db-primary.cerebrum.com:5432
      replicas:
        - enrollment-db-replica-1.cerebrum.com:5432
        - enrollment-db-replica-2.cerebrum.com:5432
      schema: enrollment_management
      max_connections: 80

  payment-service:
    database:
      primary: payment-db-primary.cerebrum.com:5432
      backup: payment-db-backup.cerebrum.com:5432
      schema: payment_processing
      max_connections: 40
      encryption: true
      audit_logging: true

  analytics-service:
    database:
      primary: analytics-db-primary.cerebrum.com:5432
      time_series: influxdb.cerebrum.com:8086
      schema: analytics_data
      max_connections: 60
      retention_policy: 2_years

  communication-service:
    database:
      primary: comm-db-primary.cerebrum.com:5432
      document_store: mongodb.cerebrum.com:27017
      schema: communication_data
      max_connections: 30

  assessment-service:
    database:
      primary: assessment-db-primary.cerebrum.com:5432
      replicas:
        - assessment-db-replica-1.cerebrum.com:5432
      schema: assessment_data
      max_connections: 70
```

---

## Migration Timeline

### Phase 1: Service Extraction (Weeks 1-4)

**Week 1: User Management Service**

```bash
# Day 1-2: Service Setup
mkdir services/user-service
cd services/user-service
npm init -y
npm install express prisma @prisma/client bcryptjs jsonwebtoken

# Day 3-4: Database Migration
npx prisma init
# Configure user-related tables
npx prisma migrate dev --name init_user_service

# Day 5-7: API Implementation
# Implement authentication endpoints
# Set up JWT middleware
# Add rate limiting and security measures
```

**Week 2: Course Management Service**

```bash
# Extract course-related APIs
# Set up course database schema
# Implement CRUD operations
# Add search functionality with Elasticsearch
```

**Week 3: Enrollment Service**

```bash
# Extract enrollment logic
# Set up event-driven architecture
# Implement progress tracking
# Add enrollment analytics
```

**Week 4: Payment Service**

```bash
# Extract payment processing
# Implement secure payment handling
# Set up webhook processing
# Add subscription management
```

### Phase 2: Infrastructure Setup (Weeks 5-8)

**Week 5: Containerization**

```dockerfile
# Example Dockerfile for user-service
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM base AS build
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

**Week 6: Kubernetes Setup**

```bash
# Set up Kubernetes cluster
kubectl create namespace cerebrum-production

# Deploy services
kubectl apply -f k8s/user-service/
kubectl apply -f k8s/course-service/
kubectl apply -f k8s/enrollment-service/
kubectl apply -f k8s/payment-service/
```

**Week 7: Service Discovery & API Gateway**

```bash
# Deploy Kong API Gateway
helm install kong kong/kong --namespace cerebrum-production

# Configure service routing
kubectl apply -f k8s/gateway/
```

**Week 8: Monitoring & Logging**

```bash
# Deploy Prometheus & Grafana
helm install monitoring prometheus-community/kube-prometheus-stack

# Set up centralized logging
helm install loki grafana/loki-stack
```

### Phase 3: Data Migration (Weeks 9-12)

**Week 9-10: Database Partitioning**

```sql
-- Partition large tables by date
CREATE TABLE analytics_events_2024_01 PARTITION OF analytics_events
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

-- Create read replicas
CREATE PUBLICATION user_data_pub FOR TABLE users, user_profiles;
```

**Week 11-12: Data Synchronization**

```bash
# Set up data replication
pg_dump --verbose --clean --no-acl --no-owner \
  --exclude-table-data=analytics_events \
  monolith_db | psql -d user_service_db

# Implement change data capture
# Set up event sourcing for critical data
```

### Phase 4: Service Integration (Weeks 13-16)

**Week 13-14: Event-Driven Communication**

```javascript
// Event publishing example
class EnrollmentService {
  async createEnrollment(enrollmentData) {
    const enrollment = await this.repository.create(enrollmentData)

    // Publish event
    await this.eventBus.publish('enrollment.created', {
      enrollmentId: enrollment.id,
      userId: enrollment.userId,
      courseId: enrollment.courseId,
      timestamp: new Date(),
    })

    return enrollment
  }
}

// Event handling example
class PaymentService {
  constructor() {
    this.eventBus.subscribe('enrollment.created', this.handleEnrollmentCreated.bind(this))
  }

  async handleEnrollmentCreated(event) {
    // Create payment order
    await this.createPaymentOrder(event.enrollmentId, event.userId)
  }
}
```

**Week 15-16: Circuit Breakers & Resilience**

```javascript
// Circuit breaker implementation
const CircuitBreaker = require('opossum')

const options = {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000,
}

const breakerForUserService = new CircuitBreaker(callUserService, options)
breakerForUserService.fallback(() => 'User service unavailable')
```

### Phase 5: Testing & Optimization (Weeks 17-20)

**Week 17-18: Performance Testing**

```bash
# Load testing with Artillery
npm install -g artillery
artillery run load-test.yml

# Stress testing individual services
ab -n 10000 -c 100 http://user-service/health
```

**Week 19-20: Security Testing**

```bash
# Security scanning
npm audit --audit-level high
docker scan cerebrum/user-service:latest

# Penetration testing
nmap -sS -A api.cerebrumbiologyacademy.com
```

### Phase 6: Production Migration (Weeks 21-24)

**Week 21-22: Gradual Migration**

```bash
# Blue-green deployment strategy
# Route 10% traffic to microservices
# Monitor performance and errors
# Gradually increase traffic percentage
```

**Week 23-24: Full Migration**

```bash
# Route 100% traffic to microservices
# Decommission monolithic components
# Cleanup and optimization
```

---

## Service Communication Patterns

### 1. Synchronous Communication (REST APIs)

**API Gateway as Single Entry Point:**

```javascript
// Gateway routing configuration
const routes = {
  '/api/auth/*': 'user-service',
  '/api/courses/*': 'course-service',
  '/api/enrollments/*': 'enrollment-service',
  '/api/payments/*': 'payment-service',
  '/api/analytics/*': 'analytics-service',
  '/api/notifications/*': 'communication-service',
  '/api/assessments/*': 'assessment-service',
}

// Service-to-service communication
class EnrollmentService {
  constructor() {
    this.userServiceClient = new UserServiceClient()
    this.courseServiceClient = new CourseServiceClient()
    this.paymentServiceClient = new PaymentServiceClient()
  }

  async createEnrollment(enrollmentData) {
    // Validate user exists
    const user = await this.userServiceClient.getUser(enrollmentData.userId)
    if (!user) throw new Error('User not found')

    // Validate course exists and is available
    const course = await this.courseServiceClient.getCourse(enrollmentData.courseId)
    if (!course || !course.isActive) throw new Error('Course not available')

    // Create enrollment
    const enrollment = await this.repository.create(enrollmentData)

    // Initiate payment process
    await this.paymentServiceClient.createPaymentOrder({
      enrollmentId: enrollment.id,
      amount: course.totalFees,
      userId: user.id,
    })

    return enrollment
  }
}
```

### 2. Asynchronous Communication (Event-Driven)

**Event Bus with RabbitMQ:**

```javascript
// Event publisher
class EventPublisher {
  constructor() {
    this.connection = amqp.connect(process.env.RABBITMQ_URL)
    this.channel = null
    this.init()
  }

  async init() {
    this.channel = await this.connection.createChannel()
    await this.channel.assertExchange('cerebrum_events', 'topic', { durable: true })
  }

  async publish(eventType, data) {
    const message = {
      id: uuidv4(),
      type: eventType,
      data,
      timestamp: new Date(),
      source: process.env.SERVICE_NAME,
    }

    await this.channel.publish('cerebrum_events', eventType, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    })
  }
}

// Event subscriber
class EventSubscriber {
  constructor() {
    this.connection = amqp.connect(process.env.RABBITMQ_URL)
    this.channel = null
    this.handlers = new Map()
    this.init()
  }

  async init() {
    this.channel = await this.connection.createChannel()
    await this.channel.assertExchange('cerebrum_events', 'topic', { durable: true })

    const queue = await this.channel.assertQueue(`${process.env.SERVICE_NAME}_events`, {
      durable: true,
    })

    this.channel.consume(queue.queue, this.handleMessage.bind(this), { noAck: false })
  }

  subscribe(eventType, handler) {
    this.handlers.set(eventType, handler)
    this.channel.bindQueue(`${process.env.SERVICE_NAME}_events`, 'cerebrum_events', eventType)
  }

  async handleMessage(msg) {
    try {
      const event = JSON.parse(msg.content.toString())
      const handler = this.handlers.get(event.type)

      if (handler) {
        await handler(event.data)
        this.channel.ack(msg)
      } else {
        console.warn(`No handler for event type: ${event.type}`)
        this.channel.ack(msg)
      }
    } catch (error) {
      console.error('Error handling message:', error)
      this.channel.nack(msg, false, false) // Dead letter queue
    }
  }
}
```

### 3. Data Consistency Patterns

**Saga Pattern for Distributed Transactions:**

```javascript
// Enrollment saga
class EnrollmentSaga {
  constructor() {
    this.steps = [
      { service: 'user-service', action: 'validateUser', compensate: null },
      { service: 'course-service', action: 'reserveSeat', compensate: 'releaseSeat' },
      { service: 'enrollment-service', action: 'createEnrollment', compensate: 'deleteEnrollment' },
      {
        service: 'payment-service',
        action: 'createPaymentOrder',
        compensate: 'cancelPaymentOrder',
      },
      { service: 'communication-service', action: 'sendConfirmation', compensate: null },
    ]
  }

  async execute(enrollmentData) {
    const sagaId = uuidv4()
    const executedSteps = []

    try {
      for (const step of this.steps) {
        const result = await this.executeStep(step, enrollmentData, sagaId)
        executedSteps.push({ step, result })
      }

      return { success: true, sagaId, results: executedSteps }
    } catch (error) {
      // Compensate in reverse order
      await this.compensate(executedSteps.reverse())
      throw error
    }
  }

  async compensate(executedSteps) {
    for (const { step, result } of executedSteps) {
      if (step.compensate) {
        try {
          await this.executeCompensation(step, result)
        } catch (compensationError) {
          console.error('Compensation failed:', compensationError)
          // Log for manual intervention
        }
      }
    }
  }
}
```

---

## Deployment Strategy

### 1. Container Registry Setup

**Docker Registry Configuration:**

```bash
# Build and push images
docker build -t cerebrum/user-service:v1.0.0 ./services/user-service
docker push cerebrum/user-service:v1.0.0

# Multi-architecture builds
docker buildx build --platform linux/amd64,linux/arm64 \
  -t cerebrum/user-service:v1.0.0 ./services/user-service --push
```

### 2. Infrastructure as Code

**Terraform Configuration:**

```hcl
# terraform/main.tf
provider "aws" {
  region = "ap-south-1"
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "cerebrum-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["ap-south-1a", "ap-south-1b", "ap-south-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  enable_vpn_gateway = true
}

module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name    = "cerebrum-cluster"
  cluster_version = "1.28"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  node_groups = {
    main = {
      desired_capacity = 6
      max_capacity     = 20
      min_capacity     = 3

      instance_types = ["t3.large", "t3.xlarge"]

      k8s_labels = {
        Environment = "production"
        Application = "cerebrum"
      }
    }
  }
}

module "rds" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "cerebrum-primary-db"

  engine            = "postgres"
  engine_version    = "15.4"
  instance_class    = "db.r6g.xlarge"
  allocated_storage = 500
  storage_type      = "gp3"

  db_name  = "cerebrum"
  username = "cerebrum_admin"
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.database.id]
  db_subnet_group_name   = module.vpc.database_subnet_group

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "Mon:04:00-Mon:05:00"

  monitoring_interval = 60
  monitoring_role_name = "RDSEnhancedMonitoringRole"

  create_monitoring_role = true

  tags = {
    Environment = "production"
    Application = "cerebrum"
  }
}

module "elasticache" {
  source = "terraform-aws-modules/elasticache/aws"

  cluster_id           = "cerebrum-redis"
  engine               = "redis"
  node_type            = "cache.r6g.large"
  num_cache_nodes      = 3
  parameter_group_name = "default.redis7"
  port                 = 6379

  subnet_group_name = module.vpc.elasticache_subnet_group_name
  security_group_ids = [aws_security_group.redis.id]

  at_rest_encryption_enabled = true
  transit_encryption_enabled = true

  tags = {
    Environment = "production"
    Application = "cerebrum"
  }
}
```

### 3. CI/CD Pipeline

**GitHub Actions Workflow:**

```yaml
# .github/workflows/deploy.yml
name: Deploy Microservices

on:
  push:
    branches: [main]
    paths:
      - 'services/**'

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: cerebrum

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      user-service: ${{ steps.changes.outputs.user-service }}
      course-service: ${{ steps.changes.outputs.course-service }}
      enrollment-service: ${{ steps.changes.outputs.enrollment-service }}
      payment-service: ${{ steps.changes.outputs.payment-service }}
      analytics-service: ${{ steps.changes.outputs.analytics-service }}
      communication-service: ${{ steps.changes.outputs.communication-service }}
      assessment-service: ${{ steps.changes.outputs.assessment-service }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v2
        id: changes
        with:
          filters: |
            user-service:
              - 'services/user-service/**'
            course-service:
              - 'services/course-service/**'
            enrollment-service:
              - 'services/enrollment-service/**'
            payment-service:
              - 'services/payment-service/**'
            analytics-service:
              - 'services/analytics-service/**'
            communication-service:
              - 'services/communication-service/**'
            assessment-service:
              - 'services/assessment-service/**'

  build-and-deploy:
    needs: detect-changes
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service:
          - name: user-service
            changed: ${{ needs.detect-changes.outputs.user-service }}
          - name: course-service
            changed: ${{ needs.detect-changes.outputs.course-service }}
          - name: enrollment-service
            changed: ${{ needs.detect-changes.outputs.enrollment-service }}
          - name: payment-service
            changed: ${{ needs.detect-changes.outputs.payment-service }}
          - name: analytics-service
            changed: ${{ needs.detect-changes.outputs.analytics-service }}
          - name: communication-service
            changed: ${{ needs.detect-changes.outputs.communication-service }}
          - name: assessment-service
            changed: ${{ needs.detect-changes.outputs.assessment-service }}

    if: matrix.service.changed == 'true'

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: services/${{ matrix.service.name }}/package-lock.json

      - name: Install dependencies
        run: |
          cd services/${{ matrix.service.name }}
          npm ci

      - name: Run tests
        run: |
          cd services/${{ matrix.service.name }}
          npm test

      - name: Build application
        run: |
          cd services/${{ matrix.service.name }}
          npm run build

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: services/${{ matrix.service.name }}
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/${{ matrix.service.name }}:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Configure kubectl
        run: |
          echo "${{ secrets.KUBE_CONFIG }}" | base64 -d > kubeconfig
          export KUBECONFIG=kubeconfig

      - name: Deploy to Kubernetes
        run: |
          export KUBECONFIG=kubeconfig
          cd k8s/${{ matrix.service.name }}

          # Update image tag
          sed -i 's|image: .*|image: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/${{ matrix.service.name }}:${{ github.sha }}|' deployment.yaml

          # Apply configurations
          kubectl apply -f .

          # Wait for rollout
          kubectl rollout status deployment/${{ matrix.service.name }} -n cerebrum-production --timeout=300s

      - name: Run integration tests
        run: |
          cd tests/integration
          npm ci
          npm test -- --service=${{ matrix.service.name }}
```

---

## Monitoring and Observability

### 1. Metrics Collection

**Prometheus Configuration:**

```yaml
# prometheus-config.yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - 'cerebrum_rules.yml'

scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)

alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager:9093

---
# cerebrum_rules.yml
groups:
  - name: cerebrum_alerts
    rules:
      - alert: HighErrorRate
        expr: (rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])) * 100 > 5
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: 'High error rate detected'
          description: 'Service {{ $labels.service }} has error rate of {{ $value }}%'

      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.5
        for: 3m
        labels:
          severity: warning
        annotations:
          summary: 'High latency detected'
          description: '95th percentile latency is {{ $value }}s'

      - alert: DatabaseConnectionsHigh
        expr: pg_stat_activity_count > 80
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: 'High database connections'
          description: 'Database has {{ $value }} active connections'
```

### 2. Distributed Tracing

**Jaeger Integration:**

```javascript
// tracing.js
const { NodeSDK } = require('@opentelemetry/sdk-node')
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node')
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger')

const jaegerExporter = new JaegerExporter({
  endpoint: process.env.JAEGER_ENDPOINT || 'http://jaeger:14268/api/traces',
})

const sdk = new NodeSDK({
  traceExporter: jaegerExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: process.env.SERVICE_NAME,
})

sdk.start()

// Service implementation with tracing
const opentelemetry = require('@opentelemetry/api')

class UserService {
  async getUser(userId) {
    const span = opentelemetry.trace.getActiveSpan()
    span?.setAttributes({
      'user.id': userId,
      operation: 'get_user',
    })

    try {
      const user = await this.repository.findById(userId)
      span?.setStatus({ code: opentelemetry.SpanStatusCode.OK })
      return user
    } catch (error) {
      span?.recordException(error)
      span?.setStatus({
        code: opentelemetry.SpanStatusCode.ERROR,
        message: error.message,
      })
      throw error
    }
  }
}
```

### 3. Centralized Logging

**ELK Stack Configuration:**

```yaml
# filebeat.yml
filebeat.inputs:
  - type: container
    paths:
      - /var/log/containers/*-cerebrum-*.log
    processors:
      - add_kubernetes_metadata:
          host: ${NODE_NAME}
          matchers:
            - logs_path:
                logs_path: '/var/log/containers/'

output.elasticsearch:
  hosts: ['elasticsearch:9200']
  index: 'cerebrum-logs-%{+yyyy.MM.dd}'

setup.template.settings:
  index.number_of_shards: 3
  index.number_of_replicas: 1

---
# logstash.conf
input {
beats {
port => 5044
}
}

filter {
if [kubernetes][container][name] =~ /cerebrum/ {
grok {
match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} \[%{DATA:service}\] %{GREEDYDATA:message}" }
}

date {
match => [ "timestamp", "ISO8601" ]
}

if [level] == "ERROR" {
mutate {
add_tag => [ "error" ]
}
}
}
}

output {
elasticsearch {
hosts => ["elasticsearch:9200"]
index => "cerebrum-logs-%{+YYYY.MM.dd}"
}
}
```

---

## Performance Targets & SLAs

### Service Level Objectives (SLOs)

| Service               | Availability | Response Time (95th) | Error Rate | Throughput  |
| --------------------- | ------------ | -------------------- | ---------- | ----------- |
| User Service          | 99.9%        | < 100ms              | < 0.1%     | 1,000 req/s |
| Course Service        | 99.5%        | < 200ms              | < 0.5%     | 500 req/s   |
| Enrollment Service    | 99.9%        | < 150ms              | < 0.1%     | 2,000 req/s |
| Payment Service       | 99.95%       | < 300ms              | < 0.05%    | 100 req/s   |
| Analytics Service     | 99.0%        | < 500ms              | < 1.0%     | 5,000 req/s |
| Communication Service | 99.5%        | < 1s                 | < 0.5%     | 1,000 req/s |
| Assessment Service    | 99.5%        | < 200ms              | < 0.5%     | 3,000 req/s |

### Resource Allocation

**Per Service Resource Requirements:**

```yaml
# Resource allocation for 10,000+ concurrent users
resources:
  user-service:
    instances: 3-10 (auto-scaling)
    cpu: 2 cores per instance
    memory: 4GB per instance
    storage: 50GB SSD

  course-service:
    instances: 2-6 (auto-scaling)
    cpu: 1-2 cores per instance
    memory: 3GB per instance
    storage: 100GB SSD (for content)

  enrollment-service:
    instances: 3-12 (auto-scaling)
    cpu: 2-3 cores per instance
    memory: 4-6GB per instance
    storage: 30GB SSD

  payment-service:
    instances: 2-5 (auto-scaling)
    cpu: 2 cores per instance
    memory: 4GB per instance
    storage: 20GB SSD (encrypted)

  analytics-service:
    instances: 2-8 (auto-scaling)
    cpu: 3-4 cores per instance
    memory: 6-8GB per instance
    storage: 200GB SSD

  communication-service:
    instances: 2-4 (auto-scaling)
    cpu: 1-2 cores per instance
    memory: 3GB per instance
    storage: 30GB SSD

  assessment-service:
    instances: 3-10 (auto-scaling)
    cpu: 2-3 cores per instance
    memory: 4-5GB per instance
    storage: 50GB SSD

# Total infrastructure requirements
total_requirements:
  cpu_cores: 45-120 (dynamic)
  memory: 100-300GB (dynamic)
  storage: 2TB SSD
  network: 10Gbps
  estimated_cost: $2,000-6,000/month (AWS/GCP)
```

---

## Risk Mitigation

### 1. Technical Risks

**Database Split Complexity:**

- **Risk:** Data consistency issues during migration
- **Mitigation:** Implement saga pattern, use database change logs, extensive testing
- **Rollback Plan:** Keep monolithic database as backup during migration

**Service Dependencies:**

- **Risk:** Cascade failures between services
- **Mitigation:** Circuit breakers, retry mechanisms, fallback responses
- **Monitoring:** Real-time dependency health checks

**Network Latency:**

- **Risk:** Increased latency due to service-to-service calls
- **Mitigation:** Optimize service boundaries, implement caching, use async patterns
- **Performance Testing:** Load testing with realistic network conditions

### 2. Operational Risks

**Deployment Complexity:**

- **Risk:** Failed deployments affecting multiple services
- **Mitigation:** Blue-green deployments, canary releases, automated rollbacks
- **Monitoring:** Deployment success metrics and alerts

**Monitoring Gaps:**

- **Risk:** Reduced visibility compared to monolith
- **Mitigation:** Comprehensive observability stack, distributed tracing
- **Training:** Team education on distributed systems monitoring

**Scaling Challenges:**

- **Risk:** Unpredictable load patterns
- **Mitigation:** Horizontal pod autoscaling, predictive scaling, load testing
- **Capacity Planning:** Regular capacity reviews and stress testing

### 3. Business Risks

**Feature Development Speed:**

- **Risk:** Slower feature delivery initially
- **Mitigation:** Service templates, shared libraries, developer tooling
- **Training:** Team upskilling on microservices patterns

**Increased Infrastructure Costs:**

- **Risk:** Higher operational costs
- **Mitigation:** Right-sizing instances, reserved capacity, cost monitoring
- **Optimization:** Regular cost reviews and optimization

---

## Success Metrics

### Migration Success Criteria

**Technical Metrics:**

- All services achieve target SLOs within 30 days
- Database query performance improves by 50%
- System can handle 10,000+ concurrent users
- API response times under target thresholds
- Zero data loss during migration

**Business Metrics:**

- No increase in student churn during migration
- Maintain 99.9% uptime during business hours
- Support team tickets reduced by 30%
- Feature delivery speed returns to pre-migration levels within 60 days

**Operational Metrics:**

- Mean time to detection (MTTD) < 2 minutes
- Mean time to recovery (MTTR) < 15 minutes
- Deployment frequency increases to daily
- Change failure rate < 5%

---

## Conclusion

This microservices migration plan provides a comprehensive roadmap for transforming Cerebrum Biology Academy from a monolithic architecture to a scalable, resilient system capable of serving 10,000+ concurrent users. The phased approach minimizes risk while ensuring business continuity and improved performance.

**Key Benefits:**

- **Scalability:** Independent scaling of services based on demand
- **Reliability:** Fault isolation and improved system resilience
- **Performance:** Optimized resource allocation and reduced bottlenecks
- **Development Velocity:** Parallel development and deployment cycles
- **Technology Flexibility:** Service-specific technology choices

**Next Steps:**

1. Begin Phase 1 with User Management Service extraction
2. Set up development and staging environments
3. Train development team on microservices patterns
4. Establish monitoring and alerting infrastructure
5. Start gradual migration following the outlined timeline

The migration will position Cerebrum Biology Academy for continued growth and technical excellence in the competitive EdTech market.
