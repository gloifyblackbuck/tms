import React from 'react';
import {Switch, Route,Redirect} from 'react-router-dom';
// import * as routeNames from "constants/routeNames";
// import LiveTracking from "components/content/LiveTracking";
import appRoutes from "../constants/appRoutes";


const Main = () => {
    return (
      <main>
        <Switch>
          {
            appRoutes.map((route,key)=>
            {
              if (route.redirect) {
                return <Redirect key={key} from={route.from} to={route.to}/>
              } else {
                return <Route key={key} path={route.path} component={route.component}/>
              }
            })
          }
        </Switch>
      </main>
     )
   }

export default(
     <Main/>
);

// <Route path={routeNames.DASHBOARD} component={()=><div>dashboard</div>}/>
// <Route path={routeNames.LIVE_TRACKING} component={LiveTracking}/>
// <Route path={routeNames.SHIPMENT_HISTORY} component={()=><div>shipment-history</div>}/>
// <Route path={routeNames.REPORTS} component={()=><div>reports</div>}/>
// <Route path={routeNames.ADMIN} component={()=><div>admin</div>}/>
// <Redirect from="/" to={routeNames.LIVE_TRACKING}/>
