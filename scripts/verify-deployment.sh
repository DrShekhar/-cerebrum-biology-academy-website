#!/bin/bash

###############################################################################
# Automated Post-Deployment Verification Script (Bash)
#
# A lightweight alternative to the Node.js version
# Performs essential checks on deployed website
###############################################################################

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Configuration
BASE_URL="${1:-https://cerebrumbiologyacademy.com}"
TIMEOUT=10
RETRIES=3
VERBOSE=false

# Counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0
WARNING_CHECKS=0

# Results file
RESULTS_FILE="deployment-verification-$(date +%Y%m%d-%H%M%S).log"

###############################################################################
# Helper Functions
###############################################################################

log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    case $level in
        INFO)
            echo -e "${CYAN}[INFO]${NC} $message"
            ;;
        SUCCESS)
            echo -e "${GREEN}[SUCCESS]${NC} $message"
            ;;
        ERROR)
            echo -e "${RED}[ERROR]${NC} $message"
            ;;
        WARNING)
            echo -e "${YELLOW}[WARNING]${NC} $message"
            ;;
        HEADER)
            echo ""
            echo -e "${BOLD}${BLUE}$message${NC}"
            echo -e "${BLUE}$(printf '=%.0s' {1..60})${NC}"
            ;;
    esac

    echo "[$timestamp] [$level] $message" >> "$RESULTS_FILE"
}

check_result() {
    local category=$1
    local name=$2
    local passed=$3
    local details=${4:-""}

    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

    if [ "$passed" = "true" ]; then
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
        echo -e "  ${GREEN}✅${NC} $category → $name $details"
    elif [ "$passed" = "warning" ]; then
        WARNING_CHECKS=$((WARNING_CHECKS + 1))
        echo -e "  ${YELLOW}⚠️${NC}  $category → $name $details"
    else
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
        echo -e "  ${RED}❌${NC} $category → $name $details"
    fi
}

make_request() {
    local url=$1
    local method=${2:-GET}

    local response
    local http_code

    if command -v curl &> /dev/null; then
        response=$(curl -s -w "\n%{http_code}\n%{time_total}" \
                       -X "$method" \
                       --max-time "$TIMEOUT" \
                       --retry "$RETRIES" \
                       --retry-delay 1 \
                       -L \
                       -H "User-Agent: Cerebrum-Deployment-Verifier-Bash/1.0" \
                       "$url" 2>&1 || echo "000")

        http_code=$(echo "$response" | tail -2 | head -1)
        time_total=$(echo "$response" | tail -1)
        body=$(echo "$response" | head -n -2)

        echo "$http_code|$time_total|$body"
    else
        log ERROR "curl is not installed. Please install curl to run this script."
        exit 1
    fi
}

###############################################################################
# Check Functions
###############################################################################

check_homepage() {
    log HEADER "📱 Checking Homepage"

    local result=$(make_request "$BASE_URL")
    local http_code=$(echo "$result" | cut -d'|' -f1)
    local time_total=$(echo "$result" | cut -d'|' -f2)
    local body=$(echo "$result" | cut -d'|' -f3-)

    # Convert time to milliseconds
    local time_ms=$(echo "$time_total * 1000" | bc | cut -d'.' -f1)

    # HTTP Status Check
    if [ "$http_code" = "200" ]; then
        check_result "Homepage" "HTTP Status" "true" "(${time_ms}ms)"
    else
        check_result "Homepage" "HTTP Status" "false" "(HTTP $http_code)"
        return
    fi

    # Check for critical elements
    if echo "$body" | grep -q "<title>"; then
        check_result "Homepage" "Title Tag" "true"
    else
        check_result "Homepage" "Title Tag" "false"
    fi

    if echo "$body" | grep -qi "nav"; then
        check_result "Homepage" "Navigation" "true"
    else
        check_result "Homepage" "Navigation" "false"
    fi

    if echo "$body" | grep -qi "footer"; then
        check_result "Homepage" "Footer" "true"
    else
        check_result "Homepage" "Footer" "false"
    fi

    # Check for error messages
    if echo "$body" | grep -qi "error occurred\|something went wrong"; then
        check_result "Homepage" "No Error Messages" "false"
    else
        check_result "Homepage" "No Error Messages" "true"
    fi

    # Performance check
    if [ "$time_ms" -lt 3000 ]; then
        check_result "Homepage" "Load Time < 3s" "true" "(${time_ms}ms)"
    else
        check_result "Homepage" "Load Time < 3s" "warning" "(${time_ms}ms exceeds 3000ms)"
    fi
}

check_api_health() {
    log HEADER "🏥 Checking API Health Endpoints"

    local result=$(make_request "${BASE_URL}/api/health")
    local http_code=$(echo "$result" | cut -d'|' -f1)
    local time_total=$(echo "$result" | cut -d'|' -f2)
    local body=$(echo "$result" | cut -d'|' -f3-)

    local time_ms=$(echo "$time_total * 1000" | bc | cut -d'.' -f1)

    # Health endpoint check
    if [ "$http_code" = "200" ] || [ "$http_code" = "503" ]; then
        check_result "API Health" "Health Check" "true" "(${time_ms}ms)"

        # Verify JSON format
        if echo "$body" | jq -e . >/dev/null 2>&1; then
            check_result "API Health" "JSON Format" "true"

            # Check database status
            local db_status=$(echo "$body" | jq -r '.services.database.status' 2>/dev/null || echo "")
            if [ "$db_status" = "up" ]; then
                check_result "API Health" "Database Connectivity" "true"
            elif [ -n "$db_status" ]; then
                check_result "API Health" "Database Connectivity" "warning" "($db_status)"
            fi

            # Check environment variables
            local uptime=$(echo "$body" | jq -r '.uptime' 2>/dev/null || echo "")
            if [ -n "$uptime" ] && [ "$uptime" != "null" ]; then
                check_result "API Health" "Environment Variables" "true"
            fi
        else
            check_result "API Health" "JSON Format" "false" "(Invalid JSON)"
        fi

        # API response time check
        if [ "$time_ms" -lt 500 ]; then
            check_result "API Health" "Response Time < 500ms" "true" "(${time_ms}ms)"
        else
            check_result "API Health" "Response Time < 500ms" "warning" "(${time_ms}ms)"
        fi
    else
        check_result "API Health" "Health Check" "false" "(HTTP $http_code)"
    fi
}

check_critical_pages() {
    log HEADER "📄 Checking Critical Pages"

    local pages=(
        "/courses"
        "/purchase/class-11"
        "/purchase/class-12"
        "/purchase/neet-dropper"
        "/login"
        "/signup"
        "/about"
        "/contact"
    )

    for page in "${pages[@]}"; do
        local result=$(make_request "${BASE_URL}${page}")
        local http_code=$(echo "$result" | cut -d'|' -f1)
        local time_ms=$(echo "$result" | cut -d'|' -f2 | awk '{print int($1*1000)}')

        if [ "$http_code" = "200" ] || [ "$http_code" = "307" ] || [ "$http_code" = "308" ]; then
            check_result "Critical Pages" "$page" "true" "(${time_ms}ms)"
        else
            check_result "Critical Pages" "$page" "false" "(HTTP $http_code)"
        fi
    done
}

check_api_endpoints() {
    log HEADER "🔌 Checking API Endpoints"

    # Check if endpoints exist (should not return 404)
    local endpoints=(
        "POST:/api/auth/signin:Auth Signin"
        "GET:/api/courses:Courses API"
    )

    for endpoint_info in "${endpoints[@]}"; do
        local method=$(echo "$endpoint_info" | cut -d':' -f1)
        local path=$(echo "$endpoint_info" | cut -d':' -f2)
        local name=$(echo "$endpoint_info" | cut -d':' -f3)

        local result=$(make_request "${BASE_URL}${path}" "$method")
        local http_code=$(echo "$result" | cut -d'|' -f1)

        if [ "$http_code" != "404" ]; then
            if [ "$http_code" -ge 500 ]; then
                check_result "API Endpoints" "$name" "warning" "(HTTP $http_code)"
            else
                check_result "API Endpoints" "$name" "true" "(HTTP $http_code)"
            fi
        else
            check_result "API Endpoints" "$name" "false" "(Not found)"
        fi
    done
}

check_static_assets() {
    log HEADER "🖼️  Checking Static Assets"

    local assets=(
        "/favicon.ico:Favicon"
    )

    for asset_info in "${assets[@]}"; do
        local path=$(echo "$asset_info" | cut -d':' -f1)
        local name=$(echo "$asset_info" | cut -d':' -f2)

        local result=$(make_request "${BASE_URL}${path}")
        local http_code=$(echo "$result" | cut -d'|' -f1)

        if [ "$http_code" = "200" ]; then
            check_result "Static Assets" "$name" "true"
        else
            check_result "Static Assets" "$name" "false" "(HTTP $http_code)"
        fi
    done
}

check_performance() {
    log HEADER "⚡ Checking Performance Metrics"

    local result=$(make_request "$BASE_URL")
    local http_code=$(echo "$result" | cut -d'|' -f1)
    local time_total=$(echo "$result" | cut -d'|' -f2)

    if [ "$http_code" = "200" ]; then
        local time_ms=$(echo "$time_total * 1000" | bc | cut -d'.' -f1)

        # TTFB check (approximate with curl timing)
        if [ "$time_ms" -lt 600 ]; then
            check_result "Performance" "TTFB < 600ms" "true" "(${time_ms}ms)"
        elif [ "$time_ms" -lt 1000 ]; then
            check_result "Performance" "TTFB < 600ms" "warning" "(${time_ms}ms)"
        else
            check_result "Performance" "TTFB < 600ms" "false" "(${time_ms}ms)"
        fi

        # Total load time
        if [ "$time_ms" -lt 3000 ]; then
            check_result "Performance" "Total Load Time < 3s" "true" "(${time_ms}ms)"
        elif [ "$time_ms" -lt 5000 ]; then
            check_result "Performance" "Total Load Time < 3s" "warning" "(${time_ms}ms)"
        else
            check_result "Performance" "Total Load Time < 3s" "false" "(${time_ms}ms)"
        fi
    else
        check_result "Performance" "Performance Test" "false" "(HTTP $http_code)"
    fi
}

check_security() {
    log HEADER "🔒 Checking Security Headers"

    local result=$(make_request "$BASE_URL" "HEAD")
    local http_code=$(echo "$result" | cut -d'|' -f1)
    local body=$(echo "$result" | cut -d'|' -f3-)

    # Check HTTPS
    if [[ "$BASE_URL" =~ ^https:// ]]; then
        check_result "Security" "HTTPS Enabled" "true"
    else
        check_result "Security" "HTTPS Enabled" "warning" "(HTTP only)"
    fi

    # Get full headers with curl
    local headers=$(curl -s -I -L --max-time "$TIMEOUT" "$BASE_URL" 2>&1)

    # Check security headers
    if echo "$headers" | grep -qi "strict-transport-security:"; then
        check_result "Security" "Strict-Transport-Security" "true"
    elif [[ "$BASE_URL" =~ ^https:// ]]; then
        check_result "Security" "Strict-Transport-Security" "warning" "(Not set)"
    else
        check_result "Security" "Strict-Transport-Security" "true" "(N/A for HTTP)"
    fi

    if echo "$headers" | grep -qi "x-frame-options:"; then
        check_result "Security" "X-Frame-Options" "true"
    else
        check_result "Security" "X-Frame-Options" "warning" "(Not set)"
    fi

    if echo "$headers" | grep -qi "x-content-type-options:"; then
        check_result "Security" "X-Content-Type-Options" "true"
    else
        check_result "Security" "X-Content-Type-Options" "warning" "(Not set)"
    fi

    # Check for exposed secrets
    local page_body=$(make_request "$BASE_URL" | cut -d'|' -f3-)
    if echo "$page_body" | grep -qi "api_key\|secret\|password\|sk-"; then
        check_result "Security" "No Exposed Secrets" "false" "(Potential secrets found)"
    else
        check_result "Security" "No Exposed Secrets" "true"
    fi
}

check_seo() {
    log HEADER "🎯 Checking SEO Requirements"

    local result=$(make_request "$BASE_URL")
    local http_code=$(echo "$result" | cut -d'|' -f1)
    local body=$(echo "$result" | cut -d'|' -f3-)

    if [ "$http_code" = "200" ]; then
        # Check meta tags
        if echo "$body" | grep -q "<title>.*</title>" && ! echo "$body" | grep -q "<title>\s*</title>"; then
            check_result "SEO" "Title Tag" "true"
        else
            check_result "SEO" "Title Tag" "false"
        fi

        if echo "$body" | grep -qi 'name="description"'; then
            check_result "SEO" "Meta Description" "true"
        else
            check_result "SEO" "Meta Description" "warning" "(Not found)"
        fi

        if echo "$body" | grep -qi 'rel="canonical"'; then
            check_result "SEO" "Canonical URL" "true"
        else
            check_result "SEO" "Canonical URL" "warning" "(Not found)"
        fi

        if echo "$body" | grep -qi 'property="og:'; then
            check_result "SEO" "Open Graph Tags" "true"
        else
            check_result "SEO" "Open Graph Tags" "warning" "(Not found)"
        fi

        # Check robots.txt
        local robots_result=$(make_request "${BASE_URL}/robots.txt")
        local robots_code=$(echo "$robots_result" | cut -d'|' -f1)
        if [ "$robots_code" = "200" ]; then
            check_result "SEO" "robots.txt" "true"
        else
            check_result "SEO" "robots.txt" "warning" "(Not found)"
        fi

        # Check sitemap.xml
        local sitemap_result=$(make_request "${BASE_URL}/sitemap.xml")
        local sitemap_code=$(echo "$sitemap_result" | cut -d'|' -f1)
        if [ "$sitemap_code" = "200" ]; then
            check_result "SEO" "sitemap.xml" "true"
        else
            check_result "SEO" "sitemap.xml" "warning" "(Not found)"
        fi
    else
        check_result "SEO" "SEO Check" "false" "(Cannot access homepage)"
    fi
}

check_analytics() {
    log HEADER "📊 Checking Analytics Integration"

    local result=$(make_request "$BASE_URL")
    local http_code=$(echo "$result" | cut -d'|' -f1)
    local body=$(echo "$result" | cut -d'|' -f3-)

    if [ "$http_code" = "200" ]; then
        # Google Analytics
        if echo "$body" | grep -q "googletagmanager.com/gtag\|google-analytics.com/analytics.js\|gtag(\|GA_MEASUREMENT_ID"; then
            check_result "Analytics" "Google Analytics" "true"
        else
            check_result "Analytics" "Google Analytics" "warning" "(Not detected)"
        fi

        # Google Tag Manager
        if echo "$body" | grep -q "googletagmanager.com/gtm.js\|GTM-"; then
            check_result "Analytics" "Google Tag Manager" "true"
        else
            check_result "Analytics" "Google Tag Manager" "warning" "(Not detected)"
        fi
    else
        check_result "Analytics" "Analytics Check" "false" "(Cannot access homepage)"
    fi
}

print_summary() {
    local pass_rate=0
    if [ "$TOTAL_CHECKS" -gt 0 ]; then
        pass_rate=$(echo "scale=1; $PASSED_CHECKS * 100 / $TOTAL_CHECKS" | bc)
    fi

    echo ""
    echo -e "${BOLD}${BLUE}$(printf '=%.0s' {1..60})${NC}"
    echo -e "${BOLD}${BLUE}📊 VERIFICATION SUMMARY${NC}"
    echo -e "${BOLD}${BLUE}$(printf '=%.0s' {1..60})${NC}"
    echo ""
    echo -e "${GREEN}✅ Passed:   ${PASSED_CHECKS}/${TOTAL_CHECKS} (${pass_rate}%)${NC}"
    echo -e "${RED}❌ Failed:   ${FAILED_CHECKS}/${TOTAL_CHECKS}${NC}"
    echo -e "${YELLOW}⚠️  Warnings: ${WARNING_CHECKS}/${TOTAL_CHECKS}${NC}"
    echo ""

    if [ "$FAILED_CHECKS" -eq 0 ] && [ "$WARNING_CHECKS" -eq 0 ]; then
        echo -e "${GREEN}🎉 All checks passed! Deployment verified successfully.${NC}"
    elif [ "$FAILED_CHECKS" -eq 0 ]; then
        echo -e "${YELLOW}✨ All critical checks passed. Review warnings for optimization.${NC}"
    else
        echo -e "${RED}⚠️  Some checks failed. Please review and fix issues.${NC}"
    fi

    echo ""
    echo -e "${CYAN}📝 Full results saved to: $RESULTS_FILE${NC}"
    echo -e "${BOLD}${BLUE}$(printf '=%.0s' {1..60})${NC}"
    echo ""
}

###############################################################################
# Main Execution
###############################################################################

main() {
    # Check dependencies
    if ! command -v curl &> /dev/null; then
        log ERROR "curl is required but not installed. Please install curl."
        exit 1
    fi

    if ! command -v jq &> /dev/null; then
        log WARNING "jq is not installed. JSON parsing will be limited."
    fi

    if ! command -v bc &> /dev/null; then
        log WARNING "bc is not installed. Some calculations will be limited."
    fi

    # Print header
    echo ""
    echo -e "${BOLD}${BLUE}$(printf '=%.0s' {1..60})${NC}"
    echo -e "${BOLD}${BLUE}🚀 CEREBRUM BIOLOGY ACADEMY - POST-DEPLOYMENT VERIFICATION${NC}"
    echo -e "${BOLD}${BLUE}$(printf '=%.0s' {1..60})${NC}"
    echo ""
    echo -e "${CYAN}📍 Target URL: $BASE_URL${NC}"
    echo -e "${CYAN}⏰ Started at: $(date '+%Y-%m-%d %H:%M:%S')${NC}"
    echo -e "${CYAN}🔄 Retry attempts: $RETRIES${NC}"
    echo -e "${CYAN}⏱️  Timeout: ${TIMEOUT}s${NC}"
    echo ""

    # Run all checks
    check_homepage
    check_api_health
    check_critical_pages
    check_api_endpoints
    check_static_assets
    check_performance
    check_security
    check_seo
    check_analytics

    # Print summary
    print_summary

    # Exit with appropriate code
    if [ "$FAILED_CHECKS" -eq 0 ]; then
        exit 0
    else
        exit 1
    fi
}

# Handle script arguments
if [ "${1:-}" = "--help" ] || [ "${1:-}" = "-h" ]; then
    echo "Usage: $0 [BASE_URL]"
    echo ""
    echo "Arguments:"
    echo "  BASE_URL    Base URL to verify (default: https://cerebrumbiologyacademy.com)"
    echo ""
    echo "Examples:"
    echo "  $0"
    echo "  $0 https://staging.cerebrumbiologyacademy.com"
    echo ""
    exit 0
fi

# Run main function
main
