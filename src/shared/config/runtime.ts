export const IS_DEV_MODE =
  Boolean(import.meta.env.VITEST) ||
  (typeof window !== 'undefined' &&
    window.location.hostname === 'localhost' &&
    import.meta.dev);
