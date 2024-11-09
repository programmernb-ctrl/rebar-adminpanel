import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { adminpanelConfig } from '@Plugins/rebar-adminpanel/shared/config.js';
import { adminPanelEvents } from '@Plugins/rebar-adminpanel/shared/events.js';

const Rebar = useRebar();
const getter = Rebar.get.usePlayersGetter();
const Keybinder = Rebar.useKeybinder();

if (adminpanelConfig.Settings.debug) {
    alt.log('[rebar-adminpanel] Debug Mode is activated for the plugin.')
}

async function adminpanelShow(player: alt.Player) {
    // useWebview(player).show('Adminpanel', 'page', true);
    const character = Rebar.document.character.useCharacter(player);
    const isMember = character.groups.memberOf('admin');

    if (isMember || adminpanelConfig.Settings.adminMode) {
        const view = Rebar.player.useWebview(player);
        Rebar.player.useWorld(player).disableControls();
        view.show('Adminpanel', 'page');
    } else {
        return;
    }
}

async function adminpanelHide(player: alt.Player) {
    const view = Rebar.player.useWebview(player);
    view.hide('Adminpanel');
    Rebar.player.useWorld(player).enableControls();
}

async function makeAdmin(player: alt.Player) {
    const rPlayer = Rebar.usePlayer(player);

    rPlayer.character.groups.add('admin');
    rPlayer.account.permissions.grant('admin');
}

async function adminpanelShowAllUsers(player: alt.Player) {
    // useWebview(player).show('Adminpanel', 'page', true);
    const playersOnline = getter.online();
    const view = Rebar.player.useWebview(player);
    Rebar.player.useWorld(player).disableControls();

    view.show('Users', 'persistent');

    const playerDetails = playersOnline.map((p) => ({
        id: p.id,
        name: p.name,
        discordId: p.discordID,
    }));
    view.emit(adminPanelEvents.WebView.getUsers, playerDetails);
}

async function adminpanelHideUser(player: alt.Player) {
    const view = Rebar.player.useWebview(player);
    view.hide('Users');
    Rebar.player.useWorld(player).enableControls();
}

alt.onRpc(adminPanelEvents.RPC.giveAdmin, async (player: alt.Player) => {
    try {
        alt.log(`${player.name} called adminpanel:giveadmin rpc`);
        await makeAdmin(player);
    } catch (error) {
        alt.log(`${player.name} called adminpanel rpc but got an error ${error}`);
    }
});

alt.onRpc(adminPanelEvents.RPC.toWaypoint, async (player: alt.Player, x: number, y: number, z: number) => {
    try {
        alt.log(`${player.name} called adminpanel:towaypoint rpc with coords: ${x}, ${y}, ${z}`);

        if (player && player.valid) {
            player.pos = new alt.Vector3(x, y, z); // Teleport the player
            alt.log(`${player.name} has been teleported to coordinates`);
        } else {
            alt.log(`Invalid player attempted to teleport: ${player.name}`);
        }
    } catch (error) {
        alt.log(`${player.name} encountered an error: ${error}`);
    }
});

alt.onRpc(adminPanelEvents.RPC.showAllUsers, async (player: alt.Player) => {
    await adminpanelShowAllUsers(player);
});

alt.onClient(adminPanelEvents.ToServer.closePanel, async (player: alt.Player) => {
    await adminpanelHide(player);
});

alt.onClient(adminPanelEvents.ToServer.closeUsers, async (player: alt.Player) => {
    await adminpanelHideUser(player);
    await adminpanelShow(player);
});

alt.once('playerSpawn', async () => {
    await showView();
});

async function showView() {
    Keybinder.on(adminPanelEvents.KeyCodes.f4, (player) => {
        adminpanelShow(player);
    });
};
