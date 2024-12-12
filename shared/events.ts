export const adminpanelEvents = {
   toClient: {},
   toServer: {
      closePanel: 'adminpanel:close',
      closeUsers: 'adminpanel:close:users',
      tpMarker: 'adminpanel:teleport:marker:hud',
   },
   webview: {
      closeAdminpanelCallback: 'adminpanel',
      closeUserpanelCallback: 'adminpanel:users',
      getUsers: 'adminpanel:get:users',
   },
   rpc: {
      showAllUsers: 'adminpanel:show:all:users',
      giveAdmin: 'adminpanel:admin',
      toWaypoint: 'adminpanel:towaypoint',
   },
   bindings: {
      ESC: 27,
      F4: 115,
   }
};