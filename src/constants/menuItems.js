import * as routeNames from "./routeNames";

const menuItems = [
  {
    displayName:"Analytics",
    icon:"dashboard",
    to:routeNames.SHIPMENT_HISTORY
  },
  {
    displayName:"Live Feed",
    icon:"my_location",
    to:routeNames.LIVE_TRACKING
  },
  {
    displayName:"Tracking",
    icon:"access_time",
    to:routeNames.DASHBOARD
  },
  {
    displayName:"Orders",
    icon:"poll",
    to:routeNames.REPORTS
  },
  // {
  //   displayName:"Admin",
  //   icon:"settings_applications",
  //   to:routeNames.ADMIN
  // }
];


export default menuItems;
