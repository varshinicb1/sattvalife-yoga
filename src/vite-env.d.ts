/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** PostHog *project* key (phc_...). Leave unset to disable analytics. */
  readonly VITE_POSTHOG_KEY?: string
  /** PostHog ingestion host matching the project's region. */
  readonly VITE_POSTHOG_HOST?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
