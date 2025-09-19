#!/bin/bash

# Production Environment Setup Script for Vercel
# Automates the deployment of environment variables

set -e

echo "🚀 Setting up Production Environment Variables for Cerebrum Biology Academy"
echo "=========================================================================="

# Check if VERCEL_TOKEN is set
if [ -z "$VERCEL_TOKEN" ]; then
    if [ -f ".vercel-token" ]; then
        export VERCEL_TOKEN=$(grep VERCEL_TOKEN .vercel-token | cut -d'=' -f2)
        echo "✅ Using token from .vercel-token"
    else
        echo "❌ VERCEL_TOKEN not found. Please set it or create .vercel-token file"
        exit 1
    fi
fi

# Function to add environment variable
add_env_var() {
    local name=$1
    local value=$2
    local env=${3:-production}

    echo "📝 Adding $name to $env environment..."
    echo "$value" | vercel env add "$name" "$env" --force --token "$VERCEL_TOKEN" || echo "⚠️  Failed to add $name"
}

echo "🔧 Setting up core application variables..."

# Core Application Variables
add_env_var "NEXT_PUBLIC_ENV" "production"
add_env_var "NEXT_PUBLIC_SITE_URL" "https://www.cerebrumbiologyacademy.com"
add_env_var "NEXT_PUBLIC_APP_VERSION" "1.0.0"
add_env_var "NEXT_TELEMETRY_DISABLED" "1"

# Security and Features
add_env_var "ENABLE_SECURITY_HEADERS" "true"
add_env_var "ENABLE_ADMIN_PROTECTION" "true"
add_env_var "ADMIN_PANEL_ENABLED" "true"
add_env_var "DEMO_BOOKING_ENABLED" "true"
add_env_var "ENROLLMENT_ENABLED" "true"

# Analytics (with placeholder values - to be updated with real ones)
add_env_var "NEXT_PUBLIC_GA_MEASUREMENT_ID" "G-CEREBRUM-PROD-READY"
add_env_var "ENABLE_ANALYTICS" "true"

# Admin Authentication
add_env_var "ADMIN_EMAIL" "admin@cerebrumbiologyacademy.com"
add_env_var "ADMIN_PASSWORD_HASH" "\$2a\$12\$LQv3c1yqBwkVsvDqjrOuWOFHk.cqmZqjSmUjcScVHFWuLnDSsOlMe"

# NextAuth Configuration
add_env_var "AUTH_SECRET" "cerebrum-biology-academy-super-secret-key-2024-prod"
add_env_var "NEXTAUTH_URL" "https://www.cerebrumbiologyacademy.com"
add_env_var "AUTH_TRUST_HOST" "true"

echo "🎯 Setting up placeholder variables for future configuration..."

# Payment Gateway (Placeholders)
add_env_var "NEXT_PUBLIC_RAZORPAY_KEY_ID" "rzp_live_placeholder"
add_env_var "RAZORPAY_KEY_SECRET" "razorpay_secret_placeholder"
add_env_var "RAZORPAY_WEBHOOK_SECRET" "razorpay_webhook_placeholder"

# WhatsApp Business API (Placeholders)
add_env_var "WHATSAPP_PHONE_NUMBER_ID" "whatsapp_phone_placeholder"
add_env_var "WHATSAPP_ACCESS_TOKEN" "whatsapp_token_placeholder"
add_env_var "WHATSAPP_VERIFY_TOKEN" "whatsapp_verify_placeholder"
add_env_var "WHATSAPP_WEBHOOK_SECRET" "whatsapp_webhook_placeholder"

# Social Media & Analytics (Placeholders)
add_env_var "NEXT_PUBLIC_GTM_ID" "GTM-PLACEHOLDER"
add_env_var "NEXT_PUBLIC_FB_PIXEL_ID" "facebook_pixel_placeholder"

# AI Integration (Placeholders)
add_env_var "OPENAI_API_KEY" "openai_key_placeholder"
add_env_var "ANTHROPIC_API_KEY" "anthropic_key_placeholder"

# Database (Placeholder)
add_env_var "DATABASE_URL" "postgresql://placeholder:placeholder@localhost:5432/cerebrum"

echo "✅ Production environment setup completed!"
echo ""
echo "📋 Next Steps:"
echo "1. Replace placeholder values with real API keys in Vercel dashboard"
echo "2. Update GA4 measurement ID with real Google Analytics property"
echo "3. Configure Razorpay with live keys when ready for payments"
echo "4. Set up WhatsApp Business API credentials"
echo "5. Configure database connection string"
echo ""
echo "🌐 Your website is live at: https://www.cerebrumbiologyacademy.com"