# Load Balancing Configuration for 10,000+ Concurrent Users

**High-Performance Load Balancing Strategy for Cerebrum Biology Academy**

## Overview

This document provides comprehensive load balancing configurations designed to handle 10,000+ concurrent users across multiple layers of the application stack, from CDN to database read replicas.

## Multi-Layer Load Balancing Architecture

```
Internet → CDN → Global Load Balancer → Regional Load Balancers → Application Load Balancers → Services
```

### Layer 1: CDN (Content Delivery Network)

- **CloudFlare Enterprise**
- **Geographic Distribution:** 200+ edge locations
- **Cache Strategy:** Static assets + API responses
- **DDoS Protection:** Enterprise-grade protection

### Layer 2: Global Load Balancer

- **DNS-based routing**
- **Geographic routing**
- **Health-based failover**

### Layer 3: Regional Load Balancers

- **AWS Application Load Balancer (ALB)**
- **Multi-AZ deployment**
- **Auto Scaling Groups integration**

### Layer 4: Application Load Balancers

- **NGINX/Kong API Gateway**
- **Service mesh (Istio)**
- **Container-level load balancing**

---

## NGINX Configuration for High Concurrency

### Main NGINX Configuration

```nginx
# /etc/nginx/nginx.conf
user nginx;
worker_processes auto;
worker_rlimit_nofile 65535;
error_log /var/log/nginx/error.log crit;
pid /var/run/nginx.pid;

events {
    worker_connections 4096;
    use epoll;
    multi_accept on;
    accept_mutex off;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging Configuration
    log_format main_ext '$remote_addr - $remote_user [$time_local] "$request" '
                        '$status $body_bytes_sent "$http_referer" '
                        '"$http_user_agent" "$http_x_forwarded_for" '
                        '"$host" sn="$server_name" '
                        'rt=$request_time '
                        'ua="$upstream_addr" us="$upstream_status" '
                        'ut="$upstream_response_time" ul="$upstream_response_length" '
                        'cs=$upstream_cache_status';

    access_log /var/log/nginx/access.log main_ext;

    # Performance Optimizations
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    keepalive_requests 1000;
    types_hash_max_size 2048;
    server_tokens off;

    # Buffer Settings for High Load
    client_body_buffer_size 128k;
    client_max_body_size 50m;
    client_header_buffer_size 1k;
    large_client_header_buffers 4 4k;
    output_buffers 1 32k;
    postpone_output 1460;

    # Timeout Settings
    client_header_timeout 3m;
    client_body_timeout 3m;
    send_timeout 3m;

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Rate Limiting Zones
    limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;
    limit_req_zone $binary_remote_addr zone=auth:10m rate=10r/m;
    limit_req_zone $binary_remote_addr zone=payment:10m rate=5r/m;
    limit_conn_zone $binary_remote_addr zone=conn:10m;

    # Upstream Configuration for Microservices
    upstream user_service {
        least_conn;
        server user-service-1:3000 max_fails=3 fail_timeout=30s weight=3;
        server user-service-2:3000 max_fails=3 fail_timeout=30s weight=3;
        server user-service-3:3000 max_fails=3 fail_timeout=30s weight=3;
        server user-service-4:3000 max_fails=3 fail_timeout=30s weight=2 backup;
        keepalive 32;
    }

    upstream course_service {
        least_conn;
        server course-service-1:3000 max_fails=3 fail_timeout=30s weight=3;
        server course-service-2:3000 max_fails=3 fail_timeout=30s weight=3;
        server course-service-3:3000 max_fails=3 fail_timeout=30s weight=2 backup;
        keepalive 32;
    }

    upstream enrollment_service {
        least_conn;
        server enrollment-service-1:3000 max_fails=2 fail_timeout=20s weight=4;
        server enrollment-service-2:3000 max_fails=2 fail_timeout=20s weight=4;
        server enrollment-service-3:3000 max_fails=2 fail_timeout=20s weight=4;
        server enrollment-service-4:3000 max_fails=2 fail_timeout=20s weight=4;
        server enrollment-service-5:3000 max_fails=2 fail_timeout=20s weight=3;
        server enrollment-service-6:3000 max_fails=2 fail_timeout=20s weight=2 backup;
        keepalive 64;
    }

    upstream payment_service {
        ip_hash; # Session affinity for payment processing
        server payment-service-1:3000 max_fails=1 fail_timeout=10s weight=3;
        server payment-service-2:3000 max_fails=1 fail_timeout=10s weight=3;
        server payment-service-3:3000 max_fails=1 fail_timeout=10s weight=2 backup;
        keepalive 16;
    }

    upstream analytics_service {
        least_conn;
        server analytics-service-1:3000 max_fails=3 fail_timeout=30s weight=3;
        server analytics-service-2:3000 max_fails=3 fail_timeout=30s weight=3;
        server analytics-service-3:3000 max_fails=3 fail_timeout=30s weight=3;
        server analytics-service-4:3000 max_fails=3 fail_timeout=30s weight=3;
        keepalive 32;
    }

    upstream communication_service {
        least_conn;
        server comm-service-1:3000 max_fails=3 fail_timeout=30s weight=3;
        server comm-service-2:3000 max_fails=3 fail_timeout=30s weight=3;
        server comm-service-3:3000 max_fails=3 fail_timeout=30s weight=2 backup;
        keepalive 16;
    }

    upstream assessment_service {
        least_conn;
        server assess-service-1:3000 max_fails=2 fail_timeout=20s weight=4;
        server assess-service-2:3000 max_fails=2 fail_timeout=20s weight=4;
        server assess-service-3:3000 max_fails=2 fail_timeout=20s weight=4;
        server assess-service-4:3000 max_fails=2 fail_timeout=20s weight=4;
        server assess-service-5:3000 max_fails=2 fail_timeout=20s weight=3;
        keepalive 48;
    }

    # Database Read Replicas
    upstream db_read_replicas {
        least_conn;
        server db-read-1.cerebrum.com:5432 max_fails=2 fail_timeout=15s weight=3;
        server db-read-2.cerebrum.com:5432 max_fails=2 fail_timeout=15s weight=3;
        server db-read-3.cerebrum.com:5432 max_fails=2 fail_timeout=15s weight=2;
    }

    # Cache Configuration
    proxy_cache_path /var/cache/nginx/api levels=1:2 keys_zone=api_cache:100m max_size=1g inactive=60m use_temp_path=off;
    proxy_cache_path /var/cache/nginx/static levels=1:2 keys_zone=static_cache:50m max_size=2g inactive=7d use_temp_path=off;

    # Include server configurations
    include /etc/nginx/conf.d/*.conf;
}
```

### API Server Configuration

```nginx
# /etc/nginx/conf.d/api.conf
server {
    listen 80;
    listen 443 ssl http2;
    server_name api.cerebrumbiologyacademy.com;

    # SSL Configuration
    ssl_certificate /etc/ssl/certs/cerebrum.crt;
    ssl_certificate_key /etc/ssl/private/cerebrum.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'" always;

    # Connection limits
    limit_conn conn 50;

    # Health Check Endpoint (bypass rate limiting)
    location = /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    # User Service Routes
    location /api/auth/ {
        limit_req zone=auth burst=5 nodelay;

        proxy_pass http://user_service;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 5s;
        proxy_send_timeout 10s;
        proxy_read_timeout 10s;

        # Caching for GET requests
        proxy_cache api_cache;
        proxy_cache_methods GET HEAD;
        proxy_cache_valid 200 302 5m;
        proxy_cache_valid 404 1m;
        proxy_cache_key "$scheme$request_method$host$request_uri";
        proxy_cache_bypass $http_cache_control;
        add_header X-Cache-Status $upstream_cache_status;
    }

    location /api/users/ {
        limit_req zone=api burst=20 nodelay;

        proxy_pass http://user_service;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 3s;
        proxy_send_timeout 8s;
        proxy_read_timeout 8s;

        # Caching
        proxy_cache api_cache;
        proxy_cache_methods GET HEAD;
        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 404 2m;
        proxy_cache_key "$scheme$request_method$host$request_uri$http_authorization";
        add_header X-Cache-Status $upstream_cache_status;
    }

    # Course Service Routes
    location /api/courses/ {
        limit_req zone=api burst=30 nodelay;

        proxy_pass http://course_service;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 3s;
        proxy_send_timeout 10s;
        proxy_read_timeout 10s;

        # Aggressive caching for course content
        proxy_cache api_cache;
        proxy_cache_methods GET HEAD;
        proxy_cache_valid 200 302 30m;
        proxy_cache_valid 404 5m;
        proxy_cache_key "$scheme$request_method$host$request_uri";
        add_header X-Cache-Status $upstream_cache_status;
    }

    # Enrollment Service Routes (High Traffic)
    location /api/enrollments/ {
        limit_req zone=api burst=50 nodelay;

        proxy_pass http://enrollment_service;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Optimized timeouts for high volume
        proxy_connect_timeout 2s;
        proxy_send_timeout 5s;
        proxy_read_timeout 5s;

        # Short-term caching
        proxy_cache api_cache;
        proxy_cache_methods GET HEAD;
        proxy_cache_valid 200 302 2m;
        proxy_cache_valid 404 30s;
        proxy_cache_key "$scheme$request_method$host$request_uri$http_authorization";
        add_header X-Cache-Status $upstream_cache_status;
    }

    # Payment Service Routes (Critical)
    location /api/payments/ {
        limit_req zone=payment burst=3 nodelay;

        proxy_pass http://payment_service;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Extended timeouts for payment processing
        proxy_connect_timeout 5s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;

        # No caching for payment endpoints
        proxy_cache off;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Analytics Service Routes
    location /api/analytics/ {
        limit_req zone=api burst=100 nodelay;

        proxy_pass http://analytics_service;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Optimized for high-volume analytics
        proxy_connect_timeout 2s;
        proxy_send_timeout 3s;
        proxy_read_timeout 3s;

        # Minimal caching for real-time data
        proxy_cache api_cache;
        proxy_cache_methods GET HEAD;
        proxy_cache_valid 200 302 30s;
        proxy_cache_valid 404 10s;
        proxy_cache_key "$scheme$request_method$host$request_uri$http_authorization";
        add_header X-Cache-Status $upstream_cache_status;
    }

    # Communication Service Routes
    location /api/notifications/ {
        limit_req zone=api burst=25 nodelay;

        proxy_pass http://communication_service;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Standard timeouts
        proxy_connect_timeout 3s;
        proxy_send_timeout 10s;
        proxy_read_timeout 10s;

        # Limited caching
        proxy_cache api_cache;
        proxy_cache_methods GET HEAD;
        proxy_cache_valid 200 302 5m;
        proxy_cache_valid 404 1m;
        proxy_cache_key "$scheme$request_method$host$request_uri$http_authorization";
        add_header X-Cache-Status $upstream_cache_status;
    }

    # Assessment Service Routes (High Traffic)
    location /api/assessments/ {
        limit_req zone=api burst=60 nodelay;

        proxy_pass http://assessment_service;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Optimized for assessment traffic
        proxy_connect_timeout 2s;
        proxy_send_timeout 8s;
        proxy_read_timeout 8s;

        # Smart caching based on content type
        proxy_cache api_cache;
        proxy_cache_methods GET HEAD;
        proxy_cache_valid 200 302 15m;
        proxy_cache_valid 404 2m;
        proxy_cache_key "$scheme$request_method$host$request_uri$http_authorization";
        add_header X-Cache-Status $upstream_cache_status;
    }

    # WebSocket Support for Real-time Features
    location /socket.io/ {
        proxy_pass http://communication_service;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket-specific timeouts
        proxy_connect_timeout 7s;
        proxy_send_timeout 7s;
        proxy_read_timeout 86400s; # 24 hours for persistent connections
    }

    # Error handling
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }

    # Custom error responses
    error_page 429 /429.html;
    location = /429.html {
        root /usr/share/nginx/html;
        internal;
    }
}

# Static Assets Server
server {
    listen 80;
    listen 443 ssl http2;
    server_name static.cerebrumbiologyacademy.com;

    # SSL Configuration (same as API server)
    ssl_certificate /etc/ssl/certs/cerebrum.crt;
    ssl_certificate_key /etc/ssl/private/cerebrum.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    # Static file serving with aggressive caching
    location /static/ {
        alias /var/www/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary Accept-Encoding;

        # Compression for static files
        gzip_static on;

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;

        try_files $uri $uri/ =404;
    }

    # Image optimization and serving
    location ~* \.(jpg|jpeg|png|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
        add_header Vary Accept-Encoding;

        # Optional: Image resizing with nginx-image-filter
        # image_filter resize 800 600;
        # image_filter_jpeg_quality 85;

        try_files $uri =404;
    }

    # CSS and JS files
    location ~* \.(css|js)$ {
        expires 7d;
        add_header Cache-Control "public";
        add_header Vary Accept-Encoding;

        gzip_static on;

        try_files $uri =404;
    }
}
```

---

## AWS Application Load Balancer Configuration

### ALB with Auto Scaling Groups

```yaml
# alb-config.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Application Load Balancer for Cerebrum Biology Academy'

Parameters:
  VPCId:
    Type: AWS::EC2::VPC::Id
    Description: VPC ID for the load balancer

  PublicSubnets:
    Type: List<AWS::EC2::Subnet::Id>
    Description: Public subnets for the load balancer

  PrivateSubnets:
    Type: List<AWS::EC2::Subnet::Id>
    Description: Private subnets for the target groups

Resources:
  # Security Group for ALB
  ALBSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Security group for Application Load Balancer
      VpcId: !Ref VPCId
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0
      SecurityGroupEgress:
        - IpProtocol: -1
          CidrIp: 0.0.0.0/0

  # Application Load Balancer
  ApplicationLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Name: cerebrum-alb
      Scheme: internet-facing
      Type: application
      IpAddressType: ipv4
      Subnets: !Ref PublicSubnets
      SecurityGroups:
        - !Ref ALBSecurityGroup
      LoadBalancerAttributes:
        - Key: idle_timeout.timeout_seconds
          Value: '60'
        - Key: routing.http2.enabled
          Value: 'true'
        - Key: access_logs.s3.enabled
          Value: 'true'
        - Key: access_logs.s3.bucket
          Value: cerebrum-alb-logs
        - Key: deletion_protection.enabled
          Value: 'false'

  # Target Groups for each microservice
  UserServiceTargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      Name: user-service-tg
      Port: 3000
      Protocol: HTTP
      VpcId: !Ref VPCId
      TargetType: instance
      HealthCheckPath: /health
      HealthCheckProtocol: HTTP
      HealthCheckPort: 3000
      HealthCheckIntervalSeconds: 30
      HealthCheckTimeoutSeconds: 5
      HealthyThresholdCount: 2
      UnhealthyThresholdCount: 3
      TargetGroupAttributes:
        - Key: deregistration_delay.timeout_seconds
          Value: '30'
        - Key: stickiness.enabled
          Value: 'false'
        - Key: load_balancing.algorithm.type
          Value: least_outstanding_requests

  EnrollmentServiceTargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      Name: enrollment-service-tg
      Port: 3000
      Protocol: HTTP
      VpcId: !Ref VPCId
      TargetType: instance
      HealthCheckPath: /health
      HealthCheckProtocol: HTTP
      HealthCheckPort: 3000
      HealthCheckIntervalSeconds: 15
      HealthCheckTimeoutSeconds: 3
      HealthyThresholdCount: 2
      UnhealthyThresholdCount: 2
      TargetGroupAttributes:
        - Key: deregistration_delay.timeout_seconds
          Value: '15'
        - Key: stickiness.enabled
          Value: 'false'
        - Key: load_balancing.algorithm.type
          Value: least_outstanding_requests

  PaymentServiceTargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      Name: payment-service-tg
      Port: 3000
      Protocol: HTTP
      VpcId: !Ref VPCId
      TargetType: instance
      HealthCheckPath: /health
      HealthCheckProtocol: HTTP
      HealthCheckPort: 3000
      HealthCheckIntervalSeconds: 10
      HealthCheckTimeoutSeconds: 3
      HealthyThresholdCount: 2
      UnhealthyThresholdCount: 2
      TargetGroupAttributes:
        - Key: deregistration_delay.timeout_seconds
          Value: '60'
        - Key: stickiness.enabled
          Value: 'true'
        - Key: stickiness.type
          Value: lb_cookie
        - Key: stickiness.lb_cookie.duration_seconds
          Value: '3600'

  # HTTPS Listener
  HTTPSListener:
    Type: AWS::ElasticLoadBalancingV2::Listener
    Properties:
      LoadBalancerArn: !Ref ApplicationLoadBalancer
      Port: 443
      Protocol: HTTPS
      SslPolicy: ELBSecurityPolicy-TLS-1-2-2017-01
      Certificates:
        - CertificateArn: !Ref SSLCertificate
      DefaultActions:
        - Type: fixed-response
          FixedResponseConfig:
            StatusCode: 404
            ContentType: text/plain
            MessageBody: Not Found

  # HTTP to HTTPS Redirect
  HTTPListener:
    Type: AWS::ElasticLoadBalancingV2::Listener
    Properties:
      LoadBalancerArn: !Ref ApplicationLoadBalancer
      Port: 80
      Protocol: HTTP
      DefaultActions:
        - Type: redirect
          RedirectConfig:
            Protocol: HTTPS
            Port: 443
            StatusCode: HTTP_301

  # Listener Rules for routing
  UserServiceRule:
    Type: AWS::ElasticLoadBalancingV2::ListenerRule
    Properties:
      ListenerArn: !Ref HTTPSListener
      Priority: 100
      Conditions:
        - Field: path-pattern
          Values:
            - '/api/auth/*'
            - '/api/users/*'
      Actions:
        - Type: forward
          TargetGroupArn: !Ref UserServiceTargetGroup

  EnrollmentServiceRule:
    Type: AWS::ElasticLoadBalancingV2::ListenerRule
    Properties:
      ListenerArn: !Ref HTTPSListener
      Priority: 200
      Conditions:
        - Field: path-pattern
          Values:
            - '/api/enrollments/*'
      Actions:
        - Type: forward
          TargetGroupArn: !Ref EnrollmentServiceTargetGroup

  PaymentServiceRule:
    Type: AWS::ElasticLoadBalancingV2::ListenerRule
    Properties:
      ListenerArn: !Ref HTTPSListener
      Priority: 300
      Conditions:
        - Field: path-pattern
          Values:
            - '/api/payments/*'
      Actions:
        - Type: forward
          TargetGroupArn: !Ref PaymentServiceTargetGroup

Outputs:
  LoadBalancerDNS:
    Description: DNS name of the load balancer
    Value: !GetAtt ApplicationLoadBalancer.DNSName
    Export:
      Name: !Sub '${AWS::StackName}-ALB-DNS'
```

---

## Kong API Gateway Configuration

### Kong Gateway for Service Mesh

```yaml
# kong-gateway-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: kong-config
  namespace: cerebrum-production
data:
  kong.conf: |
    # Kong Configuration for High Performance

    # Network and Performance
    nginx_worker_processes = auto
    nginx_worker_connections = 4096
    proxy_listen = 0.0.0.0:8000
    admin_listen = 0.0.0.0:8001

    # Database
    database = postgres
    pg_host = postgres-service
    pg_port = 5432
    pg_database = kong
    pg_user = kong
    pg_password = kong_password
    pg_max_concurrent_queries = 50

    # Caching
    mem_cache_size = 256m

    # Logging
    log_level = notice
    proxy_access_log = /tmp/access.log
    proxy_error_log = /tmp/error.log

    # Performance Tuning
    upstream_keepalive_pool_size = 60
    upstream_keepalive_max_requests = 100
    upstream_keepalive_idle_timeout = 60

    # Rate Limiting
    nginx_http_lua_shared_dict = prometheus_metrics 5m
    nginx_http_lua_shared_dict = kong_db_cache 128m
    nginx_http_lua_shared_dict = kong_db_cache_miss 12m
    nginx_http_lua_shared_dict = kong_locks 100k
    nginx_http_lua_shared_dict = kong_cluster_events 5m
    nginx_http_lua_shared_dict = kong_rate_limiting_counters 12m
    nginx_http_lua_shared_dict = kong_core_db_cache 128m
    nginx_http_lua_shared_dict = kong_core_db_cache_miss 12m

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kong-gateway
  namespace: cerebrum-production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: kong-gateway
  template:
    metadata:
      labels:
        app: kong-gateway
    spec:
      containers:
        - name: kong
          image: kong:3.4-alpine
          ports:
            - containerPort: 8000
              name: proxy
            - containerPort: 8001
              name: admin
            - containerPort: 8443
              name: proxy-ssl
            - containerPort: 8444
              name: admin-ssl
          env:
            - name: KONG_DATABASE
              value: postgres
            - name: KONG_PG_HOST
              value: postgres-service
            - name: KONG_PG_DATABASE
              value: kong
            - name: KONG_PG_USER
              value: kong
            - name: KONG_PG_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: kong-postgres
                  key: password
            - name: KONG_PROXY_ACCESS_LOG
              value: /dev/stdout
            - name: KONG_ADMIN_ACCESS_LOG
              value: /dev/stdout
            - name: KONG_PROXY_ERROR_LOG
              value: /dev/stderr
            - name: KONG_ADMIN_ERROR_LOG
              value: /dev/stderr
            - name: KONG_ADMIN_LISTEN
              value: 0.0.0.0:8001
          volumeMounts:
            - name: kong-config
              mountPath: /etc/kong
          resources:
            requests:
              cpu: '500m'
              memory: '1Gi'
            limits:
              cpu: '2'
              memory: '4Gi'
          livenessProbe:
            httpGet:
              path: /status
              port: 8001
            initialDelaySeconds: 60
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /status
              port: 8001
            initialDelaySeconds: 30
            periodSeconds: 5
      volumes:
        - name: kong-config
          configMap:
            name: kong-config

---
# Kong Service Configuration
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: rate-limiting-user-service
config:
  minute: 60
  hour: 1000
  policy: redis
  redis_host: redis-service
  redis_port: 6379
  redis_database: 1
  redis_timeout: 2000
  hide_client_headers: false
plugin: rate-limiting

---
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: rate-limiting-enrollment-service
config:
  minute: 120
  hour: 2000
  policy: redis
  redis_host: redis-service
  redis_port: 6379
  redis_database: 2
  redis_timeout: 2000
  hide_client_headers: false
plugin: rate-limiting

---
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: rate-limiting-payment-service
config:
  minute: 10
  hour: 100
  policy: redis
  redis_host: redis-service
  redis_port: 6379
  redis_database: 3
  redis_timeout: 2000
  hide_client_headers: false
plugin: rate-limiting

---
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: prometheus-metrics
config:
  per_consumer: true
  status_code_metrics: true
  latency_metrics: true
  bandwidth_metrics: true
  upstream_health_metrics: true
plugin: prometheus

---
# Kong Services
apiVersion: configuration.konghq.com/v1
kind: KongIngress
metadata:
  name: user-service-ingress
proxy:
  connect_timeout: 5000
  read_timeout: 10000
  write_timeout: 10000
upstream:
  algorithm: least-connections
  healthchecks:
    active:
      type: http
      http_path: /health
      healthy:
        interval: 10
        successes: 3
      unhealthy:
        interval: 10
        http_failures: 3
        timeouts: 3

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kong-ingress
  annotations:
    konghq.com/plugins: rate-limiting-user-service,prometheus-metrics
    konghq.com/override: user-service-ingress
spec:
  ingressClassName: kong
  rules:
    - host: api.cerebrumbiologyacademy.com
      http:
        paths:
          - path: /api/auth
            pathType: Prefix
            backend:
              service:
                name: user-service
                port:
                  number: 3000
          - path: /api/users
            pathType: Prefix
            backend:
              service:
                name: user-service
                port:
                  number: 3000
          - path: /api/enrollments
            pathType: Prefix
            backend:
              service:
                name: enrollment-service
                port:
                  number: 3000
          - path: /api/payments
            pathType: Prefix
            backend:
              service:
                name: payment-service
                port:
                  number: 3000
```

---

## Database Load Balancing

### PostgreSQL Read Replica Configuration

```bash
# PostgreSQL Master Configuration (postgresql.conf)
# /etc/postgresql/15/main/postgresql.conf

# Replication Settings
wal_level = replica
max_wal_senders = 10
max_replication_slots = 10
wal_keep_size = 1GB
wal_sender_timeout = 60s

# Performance Settings for High Load
max_connections = 200
shared_buffers = 4GB
effective_cache_size = 12GB
work_mem = 256MB
maintenance_work_mem = 1GB
checkpoint_completion_target = 0.9
wal_buffers = 64MB
default_statistics_target = 100

# Connection Pooling
listen_addresses = '*'
port = 5432

# Logging for Monitoring
log_destination = 'stderr'
logging_collector = on
log_directory = '/var/log/postgresql'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_min_duration_statement = 1000
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '
log_checkpoints = on
log_connections = on
log_disconnections = on
log_lock_waits = on
log_temp_files = 0
```

### PgBouncer Configuration for Connection Pooling

```ini
# /etc/pgbouncer/pgbouncer.ini
[databases]
cerebrum_user_db = host=user-db-primary.cerebrum.com port=5432 dbname=cerebrum_users
cerebrum_course_db = host=course-db-primary.cerebrum.com port=5432 dbname=cerebrum_courses
cerebrum_enrollment_db = host=enrollment-db-primary.cerebrum.com port=5432 dbname=cerebrum_enrollments
cerebrum_payment_db = host=payment-db-primary.cerebrum.com port=5432 dbname=cerebrum_payments
cerebrum_analytics_db = host=analytics-db-primary.cerebrum.com port=5432 dbname=cerebrum_analytics

# Read replicas
cerebrum_user_db_read = host=user-db-replica-1.cerebrum.com port=5432 dbname=cerebrum_users
cerebrum_course_db_read = host=course-db-replica-1.cerebrum.com port=5432 dbname=cerebrum_courses
cerebrum_enrollment_db_read = host=enrollment-db-replica-1.cerebrum.com port=5432 dbname=cerebrum_enrollments

[pgbouncer]
# Connection settings
listen_addr = 0.0.0.0
listen_port = 6432
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt

# Pool settings for high concurrency
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 50
min_pool_size = 10
reserve_pool_size = 10
reserve_pool_timeout = 5
max_db_connections = 100
max_user_connections = 100

# Performance tuning
server_reset_query = DISCARD ALL
server_check_delay = 30
server_check_query = SELECT 1
server_lifetime = 3600
server_idle_timeout = 600
client_idle_timeout = 0

# Logging
log_connections = 1
log_disconnections = 1
log_pooler_errors = 1
syslog = 1
syslog_facility = local0
syslog_ident = pgbouncer

# Buffer settings
listen_backlog = 128
sbuf_loopcnt = 5
so_reuseport = 1
tcp_keepalive = 1
tcp_keepcnt = 3
tcp_keepidle = 600
tcp_keepintvl = 30
```

### HAProxy for Database Load Balancing

```bash
# /etc/haproxy/haproxy.cfg
global
    daemon
    user haproxy
    group haproxy
    pidfile /var/run/haproxy.pid
    maxconn 4096
    log stdout local0 info

    # SSL Configuration
    ssl-default-bind-ciphers ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:RSA+AESGCM:RSA+AES:!aNULL:!MD5:!DSS
    ssl-default-bind-options no-sslv3 no-tlsv10 no-tlsv11

defaults
    mode tcp
    log global
    option tcplog
    option dontlognull
    retries 3
    timeout connect 5000ms
    timeout client 50000ms
    timeout server 50000ms
    timeout check 3000ms

# Statistics interface
listen stats
    bind *:8404
    mode http
    stats enable
    stats uri /stats
    stats refresh 30s
    stats admin if TRUE

# PostgreSQL Master (Write Operations)
frontend postgresql_write
    bind *:5432
    mode tcp
    default_backend pg_master

backend pg_master
    mode tcp
    balance first
    option tcp-check
    tcp-check connect
    tcp-check send-binary 00000020 # PostgreSQL startup message length
    tcp-check send-binary 00030000 # Protocol version 3.0
    tcp-check send-binary 7573657200 # username 'user'
    tcp-check send-binary 00
    tcp-check expect binary 52 # Authentication OK

    server pg-master-1 user-db-primary.cerebrum.com:5432 check inter 5s rise 2 fall 3
    server pg-master-2 user-db-primary.cerebrum.com:5432 check inter 5s rise 2 fall 3 backup

# PostgreSQL Read Replicas (Read Operations)
frontend postgresql_read
    bind *:5433
    mode tcp
    default_backend pg_replicas

backend pg_replicas
    mode tcp
    balance leastconn
    option tcp-check
    tcp-check connect
    tcp-check send-binary 00000020
    tcp-check send-binary 00030000
    tcp-check send-binary 7573657200
    tcp-check send-binary 00
    tcp-check expect binary 52

    server pg-replica-1 user-db-replica-1.cerebrum.com:5432 check inter 10s rise 2 fall 3 weight 100
    server pg-replica-2 user-db-replica-2.cerebrum.com:5432 check inter 10s rise 2 fall 3 weight 100
    server pg-replica-3 user-db-replica-3.cerebrum.com:5432 check inter 10s rise 2 fall 3 weight 80

# Redis Cluster Load Balancing
frontend redis_frontend
    bind *:6379
    mode tcp
    default_backend redis_cluster

backend redis_cluster
    mode tcp
    balance roundrobin
    option tcp-check
    tcp-check send PING\r\n
    tcp-check expect string +PONG

    server redis-1 redis-1.cerebrum.com:6379 check inter 5s rise 2 fall 3
    server redis-2 redis-2.cerebrum.com:6379 check inter 5s rise 2 fall 3
    server redis-3 redis-3.cerebrum.com:6379 check inter 5s rise 2 fall 3
```

---

## Auto Scaling Configuration

### Kubernetes Horizontal Pod Autoscaler (HPA)

```yaml
# hpa-configurations.yaml
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
  maxReplicas: 15
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
    - type: Pods
      pods:
        metric:
          name: http_requests_per_second
        target:
          type: AverageValue
          averageValue: '100'
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
        - type: Percent
          value: 50
          periodSeconds: 60
        - type: Pods
          value: 2
          periodSeconds: 60
      selectPolicy: Max

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: enrollment-service-hpa
  namespace: cerebrum-production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: enrollment-service
  minReplicas: 5
  maxReplicas: 25
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 65
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 75
    - type: Pods
      pods:
        metric:
          name: enrollment_requests_per_second
        target:
          type: AverageValue
          averageValue: '150'
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 180
      policies:
        - type: Percent
          value: 15
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 30
      policies:
        - type: Percent
          value: 100
          periodSeconds: 30
        - type: Pods
          value: 5
          periodSeconds: 30
      selectPolicy: Max

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: assessment-service-hpa
  namespace: cerebrum-production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: assessment-service
  minReplicas: 4
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 75
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
    - type: Pods
      pods:
        metric:
          name: assessment_active_sessions
        target:
          type: AverageValue
          averageValue: '200'
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 20
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
        - type: Percent
          value: 75
          periodSeconds: 45
        - type: Pods
          value: 3
          periodSeconds: 45
      selectPolicy: Max
```

### AWS Auto Scaling Groups

```yaml
# auto-scaling-groups.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Auto Scaling Groups for Cerebrum Microservices'

Parameters:
  VPCId:
    Type: AWS::EC2::VPC::Id
  PrivateSubnets:
    Type: List<AWS::EC2::Subnet::Id>
  KeyPairName:
    Type: AWS::EC2::KeyPair::KeyName

Resources:
  # Launch Template for User Service
  UserServiceLaunchTemplate:
    Type: AWS::EC2::LaunchTemplate
    Properties:
      LaunchTemplateName: user-service-template
      LaunchTemplateData:
        ImageId: ami-0abcdef1234567890 # Replace with your AMI
        InstanceType: t3.medium
        KeyName: !Ref KeyPairName
        SecurityGroupIds:
          - !Ref UserServiceSecurityGroup
        IamInstanceProfile:
          Arn: !GetAtt EC2InstanceProfile.Arn
        UserData:
          Fn::Base64: !Sub |
            #!/bin/bash
            yum update -y
            yum install -y docker
            service docker start
            usermod -a -G docker ec2-user

            # Install CloudWatch agent
            wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
            rpm -U ./amazon-cloudwatch-agent.rpm

            # Run user service container
            docker run -d \
              --name user-service \
              --restart unless-stopped \
              -p 3000:3000 \
              -e NODE_ENV=production \
              -e DATABASE_URL=${UserServiceDBURL} \
              -e REDIS_URL=${RedisURL} \
              cerebrum/user-service:latest
        TagSpecifications:
          - ResourceType: instance
            Tags:
              - Key: Name
                Value: user-service-instance
              - Key: Service
                Value: user-service

  # Auto Scaling Group for User Service
  UserServiceAutoScalingGroup:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      AutoScalingGroupName: user-service-asg
      VPCZoneIdentifier: !Ref PrivateSubnets
      LaunchTemplate:
        LaunchTemplateId: !Ref UserServiceLaunchTemplate
        Version: !GetAtt UserServiceLaunchTemplate.LatestVersionNumber
      MinSize: 3
      MaxSize: 15
      DesiredCapacity: 5
      HealthCheckType: ELB
      HealthCheckGracePeriod: 300
      DefaultCooldown: 300
      TargetGroupARNs:
        - !Ref UserServiceTargetGroup
      Tags:
        - Key: Name
          Value: user-service-instance
          PropagateAtLaunch: true
        - Key: Service
          Value: user-service
          PropagateAtLaunch: true

  # Scaling Policies for User Service
  UserServiceScaleUpPolicy:
    Type: AWS::AutoScaling::ScalingPolicy
    Properties:
      AutoScalingGroupName: !Ref UserServiceAutoScalingGroup
      PolicyType: TargetTrackingScaling
      TargetTrackingConfiguration:
        PredefinedMetricSpecification:
          PredefinedMetricType: ASGAverageCPUUtilization
        TargetValue: 70.0
        ScaleOutCooldown: 300
        ScaleInCooldown: 600

  UserServiceScaleUpPolicyMemory:
    Type: AWS::AutoScaling::ScalingPolicy
    Properties:
      AutoScalingGroupName: !Ref UserServiceAutoScalingGroup
      PolicyType: TargetTrackingScaling
      TargetTrackingConfiguration:
        CustomizedMetricSpecification:
          MetricName: MemoryUtilization
          Namespace: CWAgent
          Dimensions:
            - Name: AutoScalingGroupName
              Value: !Ref UserServiceAutoScalingGroup
          Statistic: Average
        TargetValue: 80.0
        ScaleOutCooldown: 300
        ScaleInCooldown: 600

  # Launch Template for Enrollment Service (High Traffic)
  EnrollmentServiceLaunchTemplate:
    Type: AWS::EC2::LaunchTemplate
    Properties:
      LaunchTemplateName: enrollment-service-template
      LaunchTemplateData:
        ImageId: ami-0abcdef1234567890
        InstanceType: t3.large # Larger instance for high traffic
        KeyName: !Ref KeyPairName
        SecurityGroupIds:
          - !Ref EnrollmentServiceSecurityGroup
        IamInstanceProfile:
          Arn: !GetAtt EC2InstanceProfile.Arn
        UserData:
          Fn::Base64: !Sub |
            #!/bin/bash
            yum update -y
            yum install -y docker
            service docker start
            usermod -a -G docker ec2-user

            # Optimize for high traffic
            echo 'net.core.somaxconn = 65535' >> /etc/sysctl.conf
            echo 'net.ipv4.tcp_max_syn_backlog = 65535' >> /etc/sysctl.conf
            echo 'net.core.netdev_max_backlog = 5000' >> /etc/sysctl.conf
            sysctl -p

            # Run enrollment service with performance tuning
            docker run -d \
              --name enrollment-service \
              --restart unless-stopped \
              -p 3000:3000 \
              --memory=3g \
              --cpus=2 \
              -e NODE_ENV=production \
              -e UV_THREADPOOL_SIZE=128 \
              -e DATABASE_URL=${EnrollmentServiceDBURL} \
              -e REDIS_URL=${RedisURL} \
              cerebrum/enrollment-service:latest

  # Auto Scaling Group for Enrollment Service
  EnrollmentServiceAutoScalingGroup:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      AutoScalingGroupName: enrollment-service-asg
      VPCZoneIdentifier: !Ref PrivateSubnets
      LaunchTemplate:
        LaunchTemplateId: !Ref EnrollmentServiceLaunchTemplate
        Version: !GetAtt EnrollmentServiceLaunchTemplate.LatestVersionNumber
      MinSize: 5
      MaxSize: 25
      DesiredCapacity: 8
      HealthCheckType: ELB
      HealthCheckGracePeriod: 180 # Faster health checks
      DefaultCooldown: 180
      TargetGroupARNs:
        - !Ref EnrollmentServiceTargetGroup
      Tags:
        - Key: Name
          Value: enrollment-service-instance
          PropagateAtLaunch: true
        - Key: Service
          Value: enrollment-service
          PropagateAtLaunch: true

  # Aggressive scaling for enrollment service
  EnrollmentServiceScaleUpPolicy:
    Type: AWS::AutoScaling::ScalingPolicy
    Properties:
      AutoScalingGroupName: !Ref EnrollmentServiceAutoScalingGroup
      PolicyType: TargetTrackingScaling
      TargetTrackingConfiguration:
        PredefinedMetricSpecification:
          PredefinedMetricType: ASGAverageCPUUtilization
        TargetValue: 60.0 # Lower threshold for faster scaling
        ScaleOutCooldown: 120
        ScaleInCooldown: 300

  # Request-based scaling for enrollment service
  EnrollmentServiceRequestScalingPolicy:
    Type: AWS::AutoScaling::ScalingPolicy
    Properties:
      AutoScalingGroupName: !Ref EnrollmentServiceAutoScalingGroup
      PolicyType: TargetTrackingScaling
      TargetTrackingConfiguration:
        PredefinedMetricSpecification:
          PredefinedMetricType: ALBRequestCountPerTarget
          ResourceLabel: !Sub '${ApplicationLoadBalancer}/${EnrollmentServiceTargetGroup.TargetGroupFullName}'
        TargetValue: 1000.0 # 1000 requests per target
        ScaleOutCooldown: 120
        ScaleInCooldown: 300
```

---

## CloudFlare Configuration

### CloudFlare Load Balancing and DDoS Protection

```yaml
# cloudflare-config.yaml
# This would typically be configured via Terraform or CloudFlare API

resource "cloudflare_load_balancer_pool" "cerebrum_primary" {
  account_id = var.cloudflare_account_id
  name       = "cerebrum-primary-pool"

  origins {
    name    = "primary-alb"
    address = aws_lb.cerebrum_alb.dns_name
    enabled = true
    weight  = 1
  }

  description = "Primary load balancer pool"
  enabled     = true

  health_check {
    expected_body   = "healthy"
    expected_codes  = "200"
    method          = "GET"
    timeout         = 5
    path            = "/health"
    interval        = 60
    retries         = 2
    check_regions   = ["WNAM", "ENAM", "WEU", "EEU", "SEAS", "NEAS"]
    type            = "http"
    port            = 443
    follow_redirects = false
    allow_insecure  = false
  }

  load_shedding {
    default_percent = 0
    default_policy  = "random"
    session_percent = 0
    session_policy  = "hash"
  }
}

resource "cloudflare_load_balancer_pool" "cerebrum_fallback" {
  account_id = var.cloudflare_account_id
  name       = "cerebrum-fallback-pool"

  origins {
    name    = "fallback-server"
    address = "fallback.cerebrumbiologyacademy.com"
    enabled = true
    weight  = 1
  }

  description = "Fallback pool for maintenance"
  enabled     = true
}

resource "cloudflare_load_balancer" "cerebrum_lb" {
  zone_id          = var.cloudflare_zone_id
  name             = "api.cerebrumbiologyacademy.com"
  fallback_pool_id = cloudflare_load_balancer_pool.cerebrum_fallback.id
  default_pool_ids = [cloudflare_load_balancer_pool.cerebrum_primary.id]
  description      = "Load balancer for Cerebrum Biology Academy API"
  proxied          = true
  steering_policy  = "dynamic_latency"
  session_affinity = "cookie"

  adaptive_routing {
    failover_across_pools = true
  }

  location_strategy {
    prefer_ecs = "always"
    mode       = "resolver_ip"
  }

  pop_pools {
    pool     = cloudflare_load_balancer_pool.cerebrum_primary.id
    pop      = "LAX"
    priority = 1
  }

  pop_pools {
    pool     = cloudflare_load_balancer_pool.cerebrum_primary.id
    pop      = "SJC"
    priority = 1
  }

  region_pools {
    region = "WNAM"
    pool_ids = [cloudflare_load_balancer_pool.cerebrum_primary.id]
  }

  region_pools {
    region = "ENAM"
    pool_ids = [cloudflare_load_balancer_pool.cerebrum_primary.id]
  }
}

# Page Rules for caching optimization
resource "cloudflare_page_rule" "api_cache_rule" {
  zone_id  = var.cloudflare_zone_id
  target   = "api.cerebrumbiologyacademy.com/api/courses/*"
  priority = 1

  actions {
    cache_level = "cache_everything"
    edge_cache_ttl = 7200  # 2 hours
    browser_cache_ttl = 3600  # 1 hour
  }
}

resource "cloudflare_page_rule" "static_cache_rule" {
  zone_id  = var.cloudflare_zone_id
  target   = "static.cerebrumbiologyacademy.com/*"
  priority = 2

  actions {
    cache_level = "cache_everything"
    edge_cache_ttl = 2592000  # 30 days
    browser_cache_ttl = 86400  # 1 day
  }
}

# Rate limiting rules
resource "cloudflare_rate_limit" "api_rate_limit" {
  zone_id   = var.cloudflare_zone_id
  threshold = 200
  period    = 60

  match {
    request {
      url_pattern = "api.cerebrumbiologyacademy.com/api/*"
      schemes     = ["HTTP", "HTTPS"]
      methods     = ["GET", "POST", "PUT", "DELETE"]
    }

    response {
      statuses = [200, 201, 202, 301, 302, 401, 403]
    }
  }

  action {
    mode    = "challenge"
    timeout = 600

    response {
      content_type = "text/plain"
      body         = "Rate limit exceeded. Please try again later."
    }
  }
}

# DDoS protection rules
resource "cloudflare_firewall_rule" "ddos_protection" {
  zone_id     = var.cloudflare_zone_id
  description = "DDoS protection for API endpoints"
  filter_id   = cloudflare_filter.ddos_filter.id
  action      = "challenge"
  priority    = 1
}

resource "cloudflare_filter" "ddos_filter" {
  zone_id     = var.cloudflare_zone_id
  description = "Filter for potential DDoS attacks"
  expression  = "(http.request.uri.path contains \"/api/\" and cf.threat_score gt 10) or (rate(5m) gt 100)"
}
```

---

## Performance Monitoring for Load Balancers

### Prometheus Monitoring Configuration

```yaml
# prometheus-lb-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-lb-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
      evaluation_interval: 15s

    rule_files:
      - "/etc/prometheus/rules/*.yml"

    scrape_configs:
      - job_name: 'nginx-ingress'
        kubernetes_sd_configs:
          - role: pod
            namespaces:
              names:
                - ingress-nginx
        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
            action: keep
            regex: true
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
            action: replace
            target_label: __metrics_path__
            regex: (.+)
        metric_relabel_configs:
          - source_labels: [__name__]
            regex: 'nginx_ingress_controller_(request_duration_seconds|requests)'
            action: keep

      - job_name: 'kong-gateway'
        static_configs:
          - targets: ['kong-gateway:8001']
        metrics_path: /metrics
        scrape_interval: 10s

      - job_name: 'haproxy'
        static_configs:
          - targets: ['haproxy:8404']
        metrics_path: /stats
        params:
          stats: ['']
        scrape_interval: 15s

      - job_name: 'aws-load-balancer'
        ec2_sd_configs:
          - region: us-west-2
            port: 9100
        relabel_configs:
          - source_labels: [__meta_ec2_tag_Name]
            regex: '.*load-balancer.*'
            action: keep

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: load-balancer-rules
  namespace: monitoring
data:
  load-balancer-rules.yml: |
    groups:
      - name: load_balancer_alerts
        rules:
          - alert: LoadBalancerHighLatency
            expr: histogram_quantile(0.95, sum(rate(nginx_ingress_controller_request_duration_seconds_bucket[5m])) by (le)) > 0.5
            for: 2m
            labels:
              severity: warning
            annotations:
              summary: "Load balancer high latency"
              description: "95th percentile latency is {{ $value }}s"

          - alert: LoadBalancerHighErrorRate
            expr: (sum(rate(nginx_ingress_controller_requests{status=~"5.."}[5m])) / sum(rate(nginx_ingress_controller_requests[5m]))) * 100 > 5
            for: 2m
            labels:
              severity: critical
            annotations:
              summary: "Load balancer high error rate"
              description: "Error rate is {{ $value }}%"

          - alert: LoadBalancerBackendDown
            expr: up{job="nginx-ingress"} == 0
            for: 1m
            labels:
              severity: critical
            annotations:
              summary: "Load balancer backend is down"
              description: "Load balancer {{ $labels.instance }} is down"

          - alert: KongGatewayHighLatency
            expr: histogram_quantile(0.95, sum(rate(kong_latency_bucket[5m])) by (le)) > 1000
            for: 3m
            labels:
              severity: warning
            annotations:
              summary: "Kong Gateway high latency"
              description: "Kong 95th percentile latency is {{ $value }}ms"

          - alert: HAProxyBackendDown
            expr: haproxy_server_up == 0
            for: 1m
            labels:
              severity: critical
            annotations:
              summary: "HAProxy backend server down"
              description: "HAProxy backend {{ $labels.backend }}/{{ $labels.server }} is down"
```

---

## Load Testing Configuration

### Artillery Load Testing Scripts

```yaml
# load-test-config.yml
config:
  target: 'https://api.cerebrumbiologyacademy.com'
  phases:
    # Warm-up phase
    - duration: 120
      arrivalRate: 10
      name: 'Warm up'

    # Gradual ramp-up
    - duration: 300
      arrivalRate: 10
      rampTo: 100
      name: 'Gradual ramp-up'

    # Sustained load
    - duration: 600
      arrivalRate: 100
      name: 'Sustained load'

    # Peak load test
    - duration: 300
      arrivalRate: 100
      rampTo: 500
      name: 'Peak load'

    # Stress test
    - duration: 180
      arrivalRate: 500
      rampTo: 1000
      name: 'Stress test'

    # Cool down
    - duration: 120
      arrivalRate: 1000
      rampTo: 0
      name: 'Cool down'

  defaults:
    headers:
      Content-Type: 'application/json'
      User-Agent: 'Artillery Load Test'

  processor: './load-test-functions.js'

  environments:
    production:
      target: 'https://api.cerebrumbiologyacademy.com'
      phases:
        - duration: 300
          arrivalRate: 50
          rampTo: 200

    staging:
      target: 'https://staging-api.cerebrumbiologyacademy.com'
      phases:
        - duration: 180
          arrivalRate: 20
          rampTo: 100

scenarios:
  - name: 'User Authentication Flow'
    weight: 20
    flow:
      - post:
          url: '/api/auth/login'
          json:
            email: '{{ generateEmail() }}'
            password: 'testpassword123'
          capture:
            - json: '$.token'
              as: 'authToken'
      - get:
          url: '/api/users/profile'
          headers:
            Authorization: 'Bearer {{ authToken }}'

  - name: 'Course Browsing'
    weight: 30
    flow:
      - get:
          url: '/api/courses'
          qs:
            page: '{{ randomPage() }}'
            limit: 20
      - get:
          url: '/api/courses/{{ randomCourseId() }}'
      - get:
          url: '/api/courses/{{ randomCourseId() }}/lessons'

  - name: 'Enrollment Process'
    weight: 25
    flow:
      - post:
          url: '/api/auth/login'
          json:
            email: '{{ generateEmail() }}'
            password: 'testpassword123'
          capture:
            - json: '$.token'
              as: 'authToken'
      - post:
          url: '/api/enrollments'
          headers:
            Authorization: 'Bearer {{ authToken }}'
          json:
            courseId: '{{ randomCourseId() }}'
            paymentMethodId: 'pm_test_123'
      - get:
          url: '/api/enrollments/{{ enrollmentId }}'
          headers:
            Authorization: 'Bearer {{ authToken }}'

  - name: 'Assessment Taking'
    weight: 20
    flow:
      - post:
          url: '/api/auth/login'
          json:
            email: '{{ generateEmail() }}'
            password: 'testpassword123'
          capture:
            - json: '$.token'
              as: 'authToken'
      - get:
          url: '/api/assessments/questions/random'
          headers:
            Authorization: 'Bearer {{ authToken }}'
          qs:
            count: 10
            difficulty: 'medium'
      - post:
          url: '/api/assessments/submit'
          headers:
            Authorization: 'Bearer {{ authToken }}'
          json:
            answers: '{{ generateAnswers() }}'
            timeSpent: 300

  - name: 'Analytics Events'
    weight: 5
    flow:
      - post:
          url: '/api/analytics/events'
          json:
            eventType: 'page_view'
            eventName: 'course_view'
            properties:
              courseId: '{{ randomCourseId() }}'
              duration: '{{ randomDuration() }}'

# Custom function for load testing
functions:
  generateEmail: |
    function() {
      return `testuser${Math.floor(Math.random() * 10000)}@example.com`;
    }

  randomPage: |
    function() {
      return Math.floor(Math.random() * 10) + 1;
    }

  randomCourseId: |
    function() {
      const courseIds = ['course_1', 'course_2', 'course_3', 'course_4', 'course_5'];
      return courseIds[Math.floor(Math.random() * courseIds.length)];
    }

  generateAnswers: |
    function() {
      return Array.from({length: 10}, () => Math.floor(Math.random() * 4) + 1);
    }

  randomDuration: |
    function() {
      return Math.floor(Math.random() * 300) + 30;
    }
```

### Load Testing Script for Database

```bash
#!/bin/bash
# database-load-test.sh

echo "🔄 Starting database load testing..."

# PostgreSQL connection parameters
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="cerebrum"
DB_USER="postgres"
DB_PASSWORD="password"

# Test parameters
CONCURRENT_CONNECTIONS=100
TEST_DURATION=300  # 5 minutes
QUERIES_PER_CONNECTION=1000

# Create test queries file
cat > test_queries.sql << EOF
-- User queries (20% of load)
SELECT id, name, email FROM users WHERE id = random_int(1, 100000);
SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '1 day';
UPDATE users SET last_active_at = NOW() WHERE id = random_int(1, 100000);

-- Course queries (25% of load)
SELECT * FROM courses WHERE is_active = true ORDER BY popularity DESC LIMIT 20;
SELECT c.*, COUNT(e.id) as enrollment_count FROM courses c LEFT JOIN enrollments e ON c.id = e.course_id GROUP BY c.id;

-- Enrollment queries (30% of load)
SELECT e.*, u.name, c.name FROM enrollments e JOIN users u ON e.user_id = u.id JOIN courses c ON e.course_id = c.id WHERE e.status = 'active';
INSERT INTO enrollments (user_id, course_id, status, created_at) VALUES (random_int(1, 100000), random_int(1, 1000), 'active', NOW());
UPDATE enrollments SET progress = random_int(0, 100) WHERE id = random_int(1, 500000);

-- Analytics queries (15% of load)
INSERT INTO analytics_events (user_id, event_type, event_name, properties, created_at) VALUES (random_int(1, 100000), 'page_view', 'course_view', '{"course_id": "123"}', NOW());
SELECT event_type, COUNT(*) FROM analytics_events WHERE created_at > NOW() - INTERVAL '1 hour' GROUP BY event_type;

-- Assessment queries (10% of load)
SELECT * FROM questions WHERE difficulty = 'medium' ORDER BY RANDOM() LIMIT 10;
INSERT INTO test_attempts (user_id, score, total_marks, created_at) VALUES (random_int(1, 100000), random_int(60, 100), 100, NOW());
EOF

# Function to create random integer
function random_int() {
    echo $((RANDOM % ($2 - $1 + 1) + $1))
}

# Replace random_int function calls with actual random numbers
sed -i 's/random_int(\([0-9]*\), \([0-9]*\))/'"$((RANDOM % 100000 + 1))"'/g' test_queries.sql

echo "📊 Running pgbench with custom workload..."

# Initialize pgbench
pgbench -i -s 100 -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME

# Run the load test
pgbench \
  -h $DB_HOST \
  -p $DB_PORT \
  -U $DB_USER \
  -d $DB_NAME \
  -c $CONCURRENT_CONNECTIONS \
  -j 4 \
  -T $TEST_DURATION \
  -f test_queries.sql \
  --progress=10 \
  --report-latencies

echo "✅ Database load test completed"

# Cleanup
rm test_queries.sql
```

---

## Expected Performance Results

### Load Balancing Performance Targets

| Metric                    | Target          | Measurement Method     |
| ------------------------- | --------------- | ---------------------- |
| **Request Latency (P95)** | < 200ms         | NGINX/Kong metrics     |
| **Request Latency (P99)** | < 500ms         | NGINX/Kong metrics     |
| **Throughput**            | 10,000+ req/s   | Load balancer metrics  |
| **Error Rate**            | < 0.1%          | HTTP 5xx responses     |
| **Connection Pool**       | 95%+ efficiency | Connection reuse rate  |
| **SSL Handshake**         | < 50ms          | TLS negotiation time   |
| **Health Check Response** | < 5ms           | Upstream health checks |
| **Failover Time**         | < 30s           | Service recovery time  |

### Resource Utilization Targets

```yaml
# Expected resource usage at 10,000 concurrent users
load_balancer_resources:
  nginx_instances: 3-5
  cpu_per_instance: 2-4 cores
  memory_per_instance: 4-8 GB
  network_bandwidth: 10+ Gbps

  kong_gateway:
    instances: 3
    cpu_per_instance: 2 cores
    memory_per_instance: 4 GB

  haproxy_database:
    instances: 2
    cpu_per_instance: 1 core
    memory_per_instance: 2 GB

expected_performance:
  concurrent_connections: 10,000+
  new_connections_per_second: 1,000+
  requests_per_second: 50,000+
  ssl_transactions_per_second: 5,000+
  database_connections_pool: 500+
  cache_hit_rate: 90%+
```

---

## Conclusion

This comprehensive load balancing configuration provides multiple layers of traffic distribution and failover capabilities designed to handle 10,000+ concurrent users with high availability and performance. The configuration includes:

1. **Multi-layer architecture** with CDN, global LB, regional LB, and application LB
2. **Intelligent routing** based on health, geography, and load
3. **Auto-scaling** capabilities for dynamic capacity management
4. **Advanced monitoring** with real-time metrics and alerting
5. **DDoS protection** and rate limiting at multiple levels
6. **Database load balancing** with read replicas and connection pooling

**Implementation Priority:**

1. Start with NGINX configuration for immediate improvement
2. Deploy AWS ALB for cloud-native scaling
3. Implement Kong API Gateway for advanced features
4. Set up monitoring and alerting systems
5. Configure auto-scaling based on load patterns
6. Optimize based on real-world performance data

This load balancing strategy will ensure your platform can handle peak traffic loads while maintaining excellent user experience and system reliability.
