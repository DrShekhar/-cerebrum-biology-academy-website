import { registerOTel } from '@vercel/otel';

export function register() {
  registerOTel({ serviceName: 'cerebrum-biology-academy' });
}

// Constitutional Excellence: Harvard Medical School Performance Monitoring
// This enables production-grade observability for 50,000+ students