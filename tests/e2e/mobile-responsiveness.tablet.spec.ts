import { test, expect } from '@playwright/test'

/**
 * Tablet Responsiveness Tests
 * These tests run on tablet devices (iPad Pro) via Playwright project config.
 * Device settings are handled by playwright.config.ts projects, not test.use().
 */

test.describe('Tablet Layout Tests', () => {
  test('Layout adapts properly on tablet', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    await page.waitForTimeout(1000)

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    expect(hasHorizontalScroll).toBe(false)
  })

  test('Navigation is accessible on tablet', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const header = page.locator('header').first()
    await expect(header).toBeVisible()

    const navLinks = page.locator('header nav a, header button')
    const linkCount = await navLinks.count()
    expect(linkCount).toBeGreaterThan(0)
  })

  test('Content sections have proper spacing', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const sections = page.locator('section')
    const sectionCount = await sections.count()
    expect(sectionCount).toBeGreaterThan(0)

    const firstSection = sections.first()
    const padding = await firstSection.evaluate((el) => {
      const styles = window.getComputedStyle(el)
      return {
        paddingLeft: parseInt(styles.paddingLeft),
        paddingRight: parseInt(styles.paddingRight),
      }
    })
    expect(padding.paddingLeft).toBeGreaterThan(0)
    expect(padding.paddingRight).toBeGreaterThan(0)
  })
})
