// Re-export from lazy provider for backward compatibility
// Layout uses PersonalizationProviderLazy directly for better LCP
// Components importing from this file get the same context
export {
  PersonalizationProviderLazy as PersonalizationProvider,
  usePersonalization,
} from './PersonalizationProviderLazy'
