import { ref, computed } from 'vue';
import { useEvents } from '@Composables/useEvents.js';
import { useSyncedMeta } from '@Composables/useSyncedMeta.js';
import { adminpanelEvents } from '@Plugins/rebar-adminpanel/shared/events.js';

const events = useEvents();
const syncedMeta = useSyncedMeta();

export function useUserSearch() {

    const characterData = syncedMeta.getCharacter();

    const playerDetails = ref<{id : string; name: string; discordId: number; }[]>([]);
    const searchQuery = ref<string>('');

    const getPlayerDetails = (details: { id: string; name: string; discordId: number; }[]) => {
        playerDetails.value = details;
    }

    const closePanel = () => {
        events.emitServer(adminpanelEvents.toServer.closeUsers);
    };

    const filteredPlayers = computed(() => {
        if (!searchQuery.value) return playerDetails.value;
        const lowerCaseQuery = searchQuery.value.toLowerCase();
        return playerDetails.value
            .map((player) => ({
                ...player,
                highlighted: player.name.toLowerCase().includes(lowerCaseQuery) || player.id.toString().includes(lowerCaseQuery),
            }))
            .filter((player) => player.highlighted);
    });

    const searchResult = computed(() => {
        if (!searchQuery.value) return '';
        const count = filteredPlayers.value.length;
        return count > 0 ? `${count} user${count > 1 ? 's' : ''} found` : 'No users found';
    });

    const searchResultClass = computed(() => {
        if (!searchQuery.value) return '';
        return filteredPlayers.value.length > 0 ? 'bg-green-500' : 'bg-yellow-500';
    })

    return {
        closePanel,
        characterData,
        playerDetails,
        searchQuery,
        filteredPlayers,
        searchResult,
        searchResultClass,
    }

}