/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV_FIREBASE_API_KEY: string;
  readonly VITE_ENV_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_ENV_FIREBASE_PROJECT_ID: string;
  readonly VITE_ENV_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_ENV_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_ENV_FIREBASE_APP_ID: string;
  readonly VITE_ENV_FIREBASE_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
