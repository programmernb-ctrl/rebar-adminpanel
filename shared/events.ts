export const adminPanelEvents = {
   ToServer: {
      closePanel: 'adminpanel:close',
      closeUsers: 'adminpanel:closeUsers',
   },
   WebView: {
      closeAdminpanelCallback: 'adminpanel',
      closeUserpanelCallback: 'adminpanel:users',
      getUsers: 'adminpanel:getUsers',

   },
   RPC: {
      showAllUsers: 'adminpanel:showAllUsers',
      giveAdmin: 'adminpanel:giveadmin',
      toWaypoint: 'adminpanel:towaypoint',
   },
   KeyCodes: {
      escape: 27,
      f4: 115,
   }
};