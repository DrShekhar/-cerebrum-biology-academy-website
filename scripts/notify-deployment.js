#!/usr/bin/env node

/**
 * Notification Helper for Deployment Verification
 *
 * Sends notifications via Slack, Discord, or Email
 * Usage: node notify-deployment.js <results-file>
 */

const https = require('https')
const http = require('http')
const fs = require('fs')
const { URL } = require('url')

class NotificationService {
  constructor(results) {
    this.results = results
    this.slackWebhook = process.env.SLACK_WEBHOOK_URL
    this.discordWebhook = process.env.DISCORD_WEBHOOK_URL
  }

  /**
   * Send notification to Slack
   */
  async notifySlack() {
    if (!this.slackWebhook) {
      console.log('Skipping Slack notification (SLACK_WEBHOOK_URL not set)')
      return
    }

    const { summary, baseUrl, duration } = this.results
    const { total, passed, failed, warnings } = summary

    const status = failed === 0 ? 'success' : 'failure'
    const emoji = failed === 0 ? '🎉' : '🚨'
    const color = failed === 0 ? '#36a64f' : '#ff0000'

    const message = {
      text: `${emoji} Deployment Verification ${status.toUpperCase()}`,
      attachments: [
        {
          color: color,
          title: 'Verification Results',
          fields: [
            {
              title: 'Total Checks',
              value: total.toString(),
              short: true,
            },
            {
              title: 'Passed',
              value: passed.toString(),
              short: true,
            },
            {
              title: 'Failed',
              value: failed.toString(),
              short: true,
            },
            {
              title: 'Warnings',
              value: warnings.toString(),
              short: true,
            },
            {
              title: 'URL',
              value: baseUrl,
              short: false,
            },
            {
              title: 'Duration',
              value: `${duration}ms`,
              short: true,
            },
          ],
          footer: 'Cerebrum Biology Academy',
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    }

    try {
      await this.sendWebhook(this.slackWebhook, message)
      console.log('✅ Slack notification sent successfully')
    } catch (error) {
      console.error('❌ Failed to send Slack notification:', error.message)
    }
  }

  /**
   * Send notification to Discord
   */
  async notifyDiscord() {
    if (!this.discordWebhook) {
      console.log('Skipping Discord notification (DISCORD_WEBHOOK_URL not set)')
      return
    }

    const { summary, baseUrl, duration } = this.results
    const { total, passed, failed, warnings } = summary

    const status = failed === 0 ? 'success' : 'failure'
    const emoji = failed === 0 ? '🎉' : '🚨'
    const color = failed === 0 ? 3066993 : 15158332 // Green or Red

    const message = {
      content: `${emoji} **Deployment Verification ${status.toUpperCase()}**`,
      embeds: [
        {
          title: 'Verification Results',
          color: color,
          fields: [
            {
              name: 'Total Checks',
              value: total.toString(),
              inline: true,
            },
            {
              name: 'Passed',
              value: passed.toString(),
              inline: true,
            },
            {
              name: 'Failed',
              value: failed.toString(),
              inline: true,
            },
            {
              name: 'Warnings',
              value: warnings.toString(),
              inline: true,
            },
            {
              name: 'Duration',
              value: `${duration}ms`,
              inline: true,
            },
            {
              name: 'URL',
              value: baseUrl,
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'Cerebrum Biology Academy',
          },
        },
      ],
    }

    try {
      await this.sendWebhook(this.discordWebhook, message)
      console.log('✅ Discord notification sent successfully')
    } catch (error) {
      console.error('❌ Failed to send Discord notification:', error.message)
    }
  }

  /**
   * Send webhook request
   */
  async sendWebhook(webhookUrl, payload) {
    return new Promise((resolve, reject) => {
      const url = new URL(webhookUrl)
      const data = JSON.stringify(payload)
      const protocol = url.protocol === 'https:' ? https : http

      const options = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      }

      const req = protocol.request(options, (res) => {
        let responseData = ''

        res.on('data', (chunk) => {
          responseData += chunk
        })

        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(responseData)
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${responseData}`))
          }
        })
      })

      req.on('error', (error) => {
        reject(error)
      })

      req.write(data)
      req.end()
    })
  }

  /**
   * Send all configured notifications
   */
  async sendAll() {
    console.log('\n📢 Sending notifications...\n')

    const promises = []

    if (this.slackWebhook) {
      promises.push(this.notifySlack())
    }

    if (this.discordWebhook) {
      promises.push(this.notifyDiscord())
    }

    if (promises.length === 0) {
      console.log('⚠️  No notification webhooks configured')
      console.log('   Set SLACK_WEBHOOK_URL or DISCORD_WEBHOOK_URL to enable notifications')
      return
    }

    await Promise.allSettled(promises)
    console.log('')
  }
}

/**
 * CLI execution
 */
if (require.main === module) {
  const args = process.argv.slice(2)

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
Usage: node notify-deployment.js <results-file>

Arguments:
  results-file    Path to verification results JSON file

Environment Variables:
  SLACK_WEBHOOK_URL      Slack incoming webhook URL
  DISCORD_WEBHOOK_URL    Discord webhook URL

Example:
  node scripts/verify-deployment.js --json > results.json
  node scripts/notify-deployment.js results.json

Configure webhooks:
  export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
  export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/YOUR/WEBHOOK/URL"
    `)
    process.exit(0)
  }

  const resultsFile = args[0]

  // Check if file exists
  if (!fs.existsSync(resultsFile)) {
    console.error(`❌ Results file not found: ${resultsFile}`)
    process.exit(1)
  }

  // Read and parse results
  let results
  try {
    const data = fs.readFileSync(resultsFile, 'utf8')
    results = JSON.parse(data)
  } catch (error) {
    console.error(`❌ Failed to read/parse results file: ${error.message}`)
    process.exit(1)
  }

  // Send notifications
  const notifier = new NotificationService(results)

  notifier
    .sendAll()
    .then(() => {
      console.log('✅ Notification process completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Notification process failed:', error)
      process.exit(1)
    })
}

module.exports = NotificationService
