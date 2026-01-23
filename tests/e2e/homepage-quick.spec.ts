import { test, expect } from '@playwright/test'

test.describe('Homepage Quick Tests', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Cerebrum/i)
  })

  test('should display hero section', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()
  })

  test('should have navigation', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('header')
    await expect(nav).toBeVisible()
  })

  test('should have footer with language switcher', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Check for language switcher text
    const languageText = page.getByText('Choose your language')
    await expect(languageText).toBeVisible()
  })

  test('should have chatbot button', async ({ page }) => {
    await page.goto('/')
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')
    // Wait for lazy-loaded widgets (ARIA has 3s delay + load time)
    await page.waitForTimeout(6000)

    // Look for chat button (ARIA widget or WhatsApp CTA)
    // ARIA: aria-label="Open ARIA Sales Agent Chat"
    // WhatsApp: aria-label="Chat on WhatsApp"
    const chatButton = page.locator('button[aria-label*="ARIA"], button[aria-label*="Chat"], button[aria-label*="chat"], button[aria-label*="WhatsApp"]')
    await expect(chatButton.first()).toBeVisible({ timeout: 15000 })
  })
})
