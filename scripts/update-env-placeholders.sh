#!/bin/bash

# Script to update placeholder environment variables with real values
# Usage: ./scripts/update-env-placeholders.sh

set -e

echo "🔧 Environment Variables Update Helper"
echo "======================================"

# Function to update environment variable
update_env_var() {
    local name=$1
    local current_value=$2
    local description=$3

    echo ""
    echo "📝 Variable: $name"
    echo "💡 Description: $description"
    echo "🔍 Current value: $current_value"

    if [[ "$current_value" == *"placeholder"* ]]; then
        echo "⚠️  This is a placeholder value that needs to be updated!"
        echo "🌐 Update it at: https://vercel.com/dashboard/projects/cerebrum-biology-academy-website/settings/environment-variables"
    else
        echo "✅ Value appears to be configured"
    fi
}

echo "🔍 Checking environment variables status..."

# Check critical variables
update_env_var "NEXT_PUBLIC_GA_MEASUREMENT_ID" "G-CEREBRUM-PROD-READY" "Google Analytics 4 Measurement ID - Get from https://analytics.google.com"
update_env_var "NEXT_PUBLIC_RAZORPAY_KEY_ID" "rzp_live_placeholder" "Razorpay Live Key ID - Get from https://dashboard.razorpay.com"
update_env_var "RAZORPAY_KEY_SECRET" "razorpay_secret_placeholder" "Razorpay Live Secret Key"
update_env_var "WHATSAPP_ACCESS_TOKEN" "whatsapp_token_placeholder" "WhatsApp Business API Token - Get from Facebook Developer Console"
update_env_var "WHATSAPP_PHONE_NUMBER_ID" "whatsapp_phone_placeholder" "WhatsApp Business Phone Number ID"
update_env_var "DATABASE_URL" "postgresql://placeholder..." "Production Database Connection String"

echo ""
echo "📋 Quick Setup Guide:"
echo "====================="
echo ""
echo "1. 📊 Google Analytics 4:"
echo "   - Go to https://analytics.google.com"
echo "   - Create property for 'cerebrumbiologyacademy.com'"
echo "   - Copy Measurement ID (G-XXXXXXXXXX)"
echo "   - Update NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel"
echo ""
echo "2. 💳 Razorpay Payments:"
echo "   - Go to https://dashboard.razorpay.com"
echo "   - Switch to Live mode"
echo "   - Copy Key ID and Secret"
echo "   - Update NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET"
echo ""
echo "3. 📱 WhatsApp Business API:"
echo "   - Go to Facebook Business Manager"
echo "   - Set up WhatsApp Business API"
echo "   - Get Access Token and Phone Number ID"
echo "   - Update WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID"
echo ""
echo "4. 🗄️ Production Database:"
echo "   - Set up PostgreSQL database (Supabase/PlanetScale/Railway)"
echo "   - Update DATABASE_URL with connection string"
echo ""
echo "🚀 Priority Order:"
echo "1. Google Analytics (for tracking)"
echo "2. Database (for data persistence)"
echo "3. Razorpay (for payments)"
echo "4. WhatsApp (for automation)"
echo ""
echo "🔗 Vercel Dashboard: https://vercel.com/dashboard/projects/cerebrum-biology-academy-website/settings/environment-variables"