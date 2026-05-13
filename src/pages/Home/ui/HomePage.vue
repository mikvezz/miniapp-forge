<template>
  <main class="p-6">
    <h1 class="mb-2 text-2xl">MiniApp Forge</h1>
    <p v-if="$telegram.ready" class="text-sm opacity-85">
      <span v-if="$telegram.isTelegram">Telegram: ок</span>
      <span v-else>Локальная среда / браузер</span>
      <span v-if="$telegram.user"> · user id: {{ $telegram.user.id }}</span>
    </p>
  </main>
</template>

<script setup lang="ts">
const { $telegram } = useNuxtApp();
</script>
