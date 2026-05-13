export type TelegramWebAppLike = {
  ready: () => void;
  expand: () => void;
  requestFullscreen?: () => void;
  initDataUnsafe: { user?: { id: number; username?: string } };
};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebAppLike;
    };
  }
}

export type TelegramPluginApi = {
  ready: boolean;
  initDataRaw: string | null | undefined;
  isTelegram: boolean;
  webApp: TelegramWebAppLike | null;
  user: { id: number; username?: string } | null;
  init: () => Promise<void>;
  isAuthorized: () => boolean;
};
