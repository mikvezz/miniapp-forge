import { retrieveRawInitData } from '@telegram-apps/sdk';
import { IS_DEV_MODE } from '~/shared/config/runtime';
import type { TelegramPluginApi } from '~/shared/lib/telegram/twa';

function createStub(): TelegramPluginApi {
  return reactive({
    ready: true,
    initDataRaw: null,
    isTelegram: false,
    webApp: null,
    user: null,
    async init() {},
    isAuthorized: () => false,
  });
}

export default defineNuxtPlugin(async () => {
  if (import.meta.server) {
    return { provide: { telegram: createStub() } };
  }

  const runtime = useRuntimeConfig();

  const tg = reactive<TelegramPluginApi>({
    ready: false,
    initDataRaw: null,
    isTelegram: false,
    webApp: null,
    user: null,

    async init() {
      if (IS_DEV_MODE) {
        this.user = { id: 1, username: 'dev_user' };
        this.initDataRaw = 'dev_fake_token';
        this.isTelegram = false;
        this.ready = true;
        return;
      }

      const w = window.Telegram?.WebApp;
      if (w?.initDataUnsafe?.user) {
        this.isTelegram = true;
        this.webApp = w;
        w.ready();
        w.expand();
        w.requestFullscreen?.();

        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => resolve());
        });

        this.user = w.initDataUnsafe.user ?? null;
        try {
          this.initDataRaw = retrieveRawInitData();
        }
        catch (e) {
          console.warn('retrieveRawInitData:', e);
        }
        this.ready = true;
        return;
      }

      const fallback = runtime.public.telegramFallbackUrl as string;
      if (fallback) {
        window.location.href = fallback;
      }
      else {
        console.warn(
          '[telegram] Открыто вне Telegram и без NUXT_PUBLIC_TELEGRAM_FALLBACK_URL — редирект отключён.',
        );
        this.user = null;
        this.ready = true;
      }
    },

    isAuthorized() {
      return Boolean(this.user?.id);
    },
  });

  await tg.init();

  return {
    provide: {
      telegram: tg,
    },
  };
});
