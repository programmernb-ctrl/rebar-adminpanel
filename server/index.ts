import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { adminpanelConfig } from '@Plugins/rebar-adminpanel/shared/config.js';
import { adminpanelEvents } from '@Plugins/rebar-adminpanel/shared/events.js';

const Rebar = useRebar();

const getter = Rebar.get.usePlayersGetter();
const worldGetter = Rebar.get.useWorldGetter();
const keyBinding = Rebar.useKeybinder();

if (adminpanelConfig.Settings.debug) {
    alt.logWarning('[rebar-adminpanel] Debug Mode is still activated. Consider disable it to prevent unwanted' +
        ' behaviour')
}

/**
 * Checks if the player is a member of the 'admin' group, if true continue with showing the webview
 * @param player to show the webview to | alt.Player
 */
async function adminpanelShow(player: alt.Player) {
    const character = Rebar.document.character.useCharacter(player);
    const isMember = character.groups.memberOf('admin');
    // const hasPermission = Rebar.permissions.usePermissions(player).hasPermission('adminpanel');

    if (isMember || adminpanelConfig.Settings.adminMode) {
        const view = Rebar.player.useWebview(player);
        Rebar.player.useWorld(player).disableControls();
        Rebar.player.useAudio(player).playFrontendSound('Click_Special', 'WEB_NAVIGATION_SOUNDS_PHONE');
        view.show('Adminpanel', 'page');
    } else {
        return;
    }
}

async function adminpanelHide(player: alt.Player) {
    const view = Rebar.player.useWebview(player);
    view.hide('Adminpanel');
    Rebar.player.useAudio(player).playFrontendSound('Click_Fail', 'WEB_NAVIGATION_SOUNDS_PHONE');
    Rebar.player.useWorld(player).enableControls();
}

async function getAdmin(player: alt.Player) {
    const character = Rebar.document.character.useCharacter(player);
    const hasGroup = character.groups.memberOf('admin');

    if (!hasGroup) {
        alt.log('[rebar-adminpanel] The admin group is now being added to your character!');
        await character.groups.add('admin');
    } else {
        alt.logWarning('[rebar-adminpanel] No need to get it again... You already got the admin group.');
        return;
    }
}

async function adminpanelShowAllUsers(player: alt.Player) {
    const playersOnline = getter.online();
    const view = Rebar.player.useWebview(player);

    Rebar.player.useWorld(player).disableControls();
    Rebar.player.useAudio(player).playFrontendSound('Click_Special', 'WEB_NAVIGATION_SOUNDS_PHONE');

    view.show('Users', 'persistent');

    const playerDetails = playersOnline.map((p) => ({
        id: p.id,
        name: p.name,
        discordId: p.discordID,
    }));

    view.emit(adminpanelEvents.webview.getUsers, playerDetails);
}

async function adminpanelHideUser(player: alt.Player) {
    const view = Rebar.player.useWebview(player);

    view.hide('Users');
    Rebar.player.useAudio(player).playFrontendSound('Click_Fail', 'WEB_NAVIGATION_SOUNDS_PHONE');
    Rebar.player.useWorld(player).enableControls();
}

alt.onRpc(adminpanelEvents.rpc.giveAdmin, async (player: alt.Player) => {
    try {
        alt.log(`${player.name} called adminpanel:giveadmin rpc`);
        await getAdmin(player);
    } catch (error) {
        alt.log(`${player.name} called adminpanel:giveadmin rpc but with an error ${error}`);
    }
});

alt.onRpc(adminpanelEvents.rpc.toWaypoint, async (player: alt.Player, x: number, y: number, z: number) => {
    const isClear = await worldGetter.positionIsClear(new alt.Vector3(x, y, z), 'all');

    try {
        alt.log(`${player.name} called adminpanel:towaypoint rpc with coords: ${x}, ${y}, ${z}`);

        if (player && player.valid && isClear) {
            player.pos = new alt.Vector3(x, y, z); // Teleport the player
        } else {
            alt.log(`Invalid player attempted to teleport: ${player.name} or new position is not clear.`);
        }
    } catch (err) {
        alt.log(`${player.name} encountered an error with adminpanel:towaypoint rpc: ${err}`);
    }
});

alt.onRpc(adminpanelEvents.rpc.showAllUsers, async (player: alt.Player) => {
    await adminpanelShowAllUsers(player);
});

alt.onClient(adminpanelEvents.toServer.closePanel, async (player: alt.Player) => {
    await adminpanelHide(player);
});

alt.onClient(adminpanelEvents.toServer.closeUsers, async (player: alt.Player) => {
    await adminpanelHideUser(player);
    await adminpanelShow(player);
});

alt.once('playerConnect', async (player: alt.Player) => {
    await showView(player);
});

async function showView(player: alt.Player) {
    keyBinding.on(adminpanelEvents.bindings.F4, () => {
        adminpanelShow(player);
    });
}