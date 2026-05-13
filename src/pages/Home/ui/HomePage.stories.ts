import type { Meta, StoryObj } from '@storybook/vue3';
import type { TelegramPluginApi } from '~/shared/lib/telegram/twa';
import HomePageView from './HomePageView.vue';

const mockTelegram = {
  ready: true,
  initDataRaw: null,
  isTelegram: false,
  webApp: null,
  user: { id: 1, username: 'story' },
  async init() {},
  isAuthorized: () => true,
} satisfies TelegramPluginApi;

const meta = {
  title: 'pages/Home/HomePageView',
  component: HomePageView,
  args: {
    telegram: mockTelegram,
  },
} satisfies Meta<typeof HomePageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
