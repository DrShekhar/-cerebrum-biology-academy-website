#!/usr/bin/env node
/**
 * Interakt MCP Server - WhatsApp Automation CLI
 *
 * This script starts the Interakt MCP server for Claude Code integration.
 * It enables automated WhatsApp messaging, campaigns, and contact management.
 *
 * Usage:
 *   node scripts/interakt-mcp-server.js
 *   npx tsx src/lib/mcp/servers/interakt-server.ts
 *
 * Or via Claude Code MCP configuration (see .mcp.json)
 *
 * Environment Variables:
 *   INTERAKT_API_KEY - Your Interakt API key (required)
 */

const { spawn } = require('child_process')
const path = require('path')

// Load environment variables
require('dotenv').config()

const serverPath = path.join(__dirname, '../src/lib/mcp/servers/interakt-server.ts')

const child = spawn('npx', ['tsx', serverPath], {
  stdio: 'inherit',
  env: process.env,
})

child.on('error', (err) => {
  console.error('Failed to start MCP server:', err)
  process.exit(1)
})

child.on('close', (code) => {
  process.exit(code || 0)
})
