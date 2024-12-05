export const adminpanelEvents = {
   toClient: {},
   toServer: {
      closePanel: 'adminpanel:close',
      closeUsers: 'adminpanel:closeUsers',
   },
   webview: {
      closeAdminpanelCallback: 'adminpanel',
      closeUserpanelCallback: 'adminpanel:users',
      getUsers: 'adminpanel:getUsers',

   },
   rpc: {
      showAllUsers: 'adminpanel:showAllUsers',
      giveAdmin: 'adminpanel:giveadmin',
      toWaypoint: 'adminpanel:towaypoint',
   },
   bindings: {
      ESC: 27,
      F4: 115,
   }
};