<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useEvents } from '@Composables/useEvents';
import { usePlayerStats } from '@Composables/usePlayerStats';
import { useUserSearch } from '@Plugins/rebar-adminpanel/webview/composables/useUserSearch.js';
import { adminpanelEvents } from '@Plugins/rebar-adminpanel/shared/events.js';

const Events = useEvents();

const {
    health,
    stamina,
    ping,
    street
} = usePlayerStats();

const {
    characterData,
    playerDetails,
    filteredPlayers,
    searchQuery,
    searchResult,
    searchResultClass,
    closePanel
} = useUserSearch();

Events.on(adminpanelEvents.webview.getUsers, (details: { id: string; name: string; discordId: number }[]) => {
    playerDetails.value = details;
});

onMounted(() => {
    Events.onKeyUp(adminpanelEvents.webview.closeUserpanelCallback, adminpanelEvents.bindings.ESC, closePanel);
});

onUnmounted(() => {
    Events.offKeyUp(adminpanelEvents.webview.closeUserpanelCallback);
});
</script>

<template>
    <div class="flex h-screen w-screen items-center justify-center p-4">
        <div
            class="h-[50%] w-1/2 max-w-4xl rounded-lg border-2 border-solid border-red-500 intense-glow-border bg-gray-800 text-white shadow-2xl">
            <div class="flex h-full flex-col p-6">
                <div class="mb-6 flex flex-col items-center justify-between sm:flex-row">
                    <h2 class="mb-4 text-2xl font-bold sm:mb-0">⚙️ User Management</h2>
                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="search users..."
                            class="w-full rounded-md bg-gray-700 px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-500 sm:w-64"
                        />
                        <svg
                            class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                <div class="flex flex-grow flex-col overflow-hidden">
                    <div v-if="searchQuery" class="mb-2 rounded-md p-2 text-sm font-medium" :class="searchResultClass">
                        {{ searchResult }}
                    </div>
                    <div class="flex-grow overflow-y-auto rounded-md border border-gray-700">
                        <div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div
                                v-for="player in filteredPlayers"
                                :key="player.id"
                                :class="[
                                    'flex flex-col rounded-lg border-2 p-3 transition-colors duration-200 ease-in-out',
                                    searchQuery ? 'border-red-500 bg-gray-700' : 'border-transparent bg-gray-700 hover:border-red-500',
                                ]"
                            >
                                <div class="flex items-center space-x-2">
                                    <div class="relative flex-shrink-0">
                                        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-900 text-white">
                                            {{ player.id }}
                                        </div>
                                        <span class="absolute -right-1 -top-1 flex h-3 w-3">
                                            <span
                                                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
                                            ></span>
                                            <span class="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                                        </span>
                                    </div>
                                    <p class="truncate font-medium">{{ player.name }}</p>
                                </div>
                                <p class="text-style">Ping: {{ ping }}</p>
                                <p class="text-style">Health: {{ health }}</p>
                                <p class="text-style">Stamina: {{ stamina }}</p>
                                <p class="text-style">Bank: {{ '$' + characterData.bank }}</p>
                                <p class="text-style">Cash: {{ '$' + characterData.cash }}</p>
                                <p class="text-style">Street: {{ street }}</p>
                                <p class="text-style">Discord ID: {{ player.discordId }}</p>
                                <span v-if="searchQuery" class="ml-auto text-yellow-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.text-style {
    @apply text-xs text-gray-200 sm:ml-1
}

.intense-glow-border {
    box-shadow:
        0 0 5px #ef4444,
        0 0 10px #ef4444,
        0 0 15px #ef4444;
}

</style>
