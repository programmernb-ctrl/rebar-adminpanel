import { ref } from 'vue';
import { useEvents } from '@Composables/useEvents.js';
import { adminpanelEvents } from '@Plugins/rebar-adminpanel/shared/events.js';

const events = useEvents();

export function useAdminPanel() {
    const coordinatesInput = ref<string>('');

    const closePanel = () => {
        events.emitServer(adminpanelEvents.toServer.closePanel);
    }

    const showUsers = async () => {
        await events.emitServerRpc(adminpanelEvents.rpc.showAllUsers);
    };

    const giveAdmin = async () => {
        await events.emitServerRpc(adminpanelEvents.rpc.giveAdmin);
    };

    const toWaypoint = async () => {
        const coordsInput = coordinatesInput.value.trim();
        const coords = coordinatesInput.value.split(',').map(Number);
        if (coords.length === 3 && coords.every((num) => !isNaN(num))) {
            await events.emitServerRpc(adminpanelEvents.rpc.toWaypoint, ...coords);
        } else if (coordsInput === "") {
            events.emitServer(adminpanelEvents.toServer.tpMarker);
        } else {
            return;
        }
    }

    return {
        coordinatesInput,
        closePanel,
        showUsers,
        giveAdmin,
        toWaypoint,
    }
}
