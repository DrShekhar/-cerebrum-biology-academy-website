// Minimal cache configuration for MVP (no Redis)
// Returns null managers to prevent build-time Redis connection attempts

export function getCacheManagers() {
  return {
    distributed: null,
    session: null,
    query: null,
  }
}

export function initializeCaching() {
  console.log('Cache initialization skipped for MVP')
  return { success: true }
}
