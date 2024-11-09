<script lang="ts" setup>
import { ref, onUnmounted, onMounted } from 'vue';
import { useEvents } from '@Composables/useEvents';
import { adminPanelEvents } from '@Plugins/rebar-adminpanel/shared/events.js';

const Events = useEvents();

const coordinatesInput = ref<string>('');

async function showUsers() {
    await Events.emitServerRpc(adminPanelEvents.RPC.showAllUsers);
}

async function giveAdmin() {
    await Events.emitServerRpc(adminPanelEvents.RPC.giveAdmin);
}

async function toWaypoint() {
    const coords = coordinatesInput.value.split(',').map(Number);
    if (coords.length === 3 && coords.every((num) => !isNaN(num))) {
        await Events.emitServerRpc(adminPanelEvents.RPC.toWaypoint, ...coords);
    } else {
        return;
    }
}

function closeAdminpanel() {
    Events.emitServer(adminPanelEvents.ToServer.closePanel);
}

onMounted(() => {
    Events.onKeyUp(adminPanelEvents.WebView.closeAdminpanelCallback, 27, closeAdminpanel);
});

onUnmounted(() => {
    Events.offKeyUp(adminPanelEvents.WebView.closeAdminpanelCallback);
});
</script>

<template>
    <div class="fixed right-5 top-1/2 -translate-y-1/2 transform">
        <div
            class="min-h-80 w-72 overflow-hidden rounded-lg border-2 border-solid border-red-400 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl"
        >
            <div class="relative mb-4">
                <img
                    src="https://t3.ftcdn.net/jpg/05/41/09/60/360_F_541096083_KJcorovXUvyIordnevCAaNEIAeHY258R.jpg"
                    alt="Admin Header"
                    class="h-24 w-full animate-pulse object-cover"
                />
                <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <h2
                        class="animate-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-2xl font-bold text-transparent"
                    >
                        Admin Menu
                    </h2>
                </div>
            </div>
            <div class="px-6 pb-6">
                <ul class="space-y-3">
                    <li>
                        <button @click="showUsers" class="neon-button">User Management</button>
                    </li>
                    <li>
                        <button @click="giveAdmin" class="neon-button">Give Admin</button>
                    </li>
                    <li class="space-y-2">
                        <button @click="toWaypoint" class="neon-button">Teleport</button>
                        <input
                            v-model="coordinatesInput"
                            placeholder="x, y, z"
                            class="h-8 w-full rounded-lg bg-gray-700 bg-opacity-50 px-4 py-1 text-xs text-gray-300 placeholder-gray-400 focus:border-2 focus:border-red-500 focus:outline-none"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.animate-gradient {
    background-size: 200% 200%;
    animation: gradient 5s ease infinite;
}
</style>
