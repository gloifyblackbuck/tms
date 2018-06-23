import React from "react";
import * as routeNames from "./routeNames";
import LiveTracking from "components/content/LiveTracking";
import Dashboard from "components/content/Dashboard";

const appRoutes=[
  {
    path:routeNames.DASHBOARD,
    component:Dashboard
  },
  {
    path:routeNames.LIVE_TRACKING,
    component:LiveTracking
  },
  {
    path:routeNames.SHIPMENT_HISTORY,
    component:()=><div>Shipment history</div>
  },
  {
    path:routeNames.REPORTS,
    component:()=><div>Reports</div>
  },
  {
    path:routeNames.ADMIN,
    component:()=><div>Admin</div>
  },
  {
    redirect:true,
    from:"/",
    to:routeNames.DASHBOARD
  }
]


export default appRoutes;
