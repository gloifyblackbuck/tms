import React from "react";
import { getMonthName } from "utility/common";
import UiIcon from "../../../../uiComponents/materializecss//UiIcon";
import "./index.css";

const timeConverion = dateAndTime => {
  let date = new Date(dateAndTime);
  let month = getMonthName(date.getMonth());
  let d = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${d} ${month}, ${hours}:${minutes}`;
};

const LocationHistoryStepper = props => {
  let { truckDetails, status } = props;
  let statusColor = "stopped";
  let color = "#F44336";
  if (status === "On Time") {
    statusColor = "on-time";
    color = "#4CAF50";
  } else if (status === "Delayed") {
    statusColor = "behind-schedule";
    color = "#ff9800";
  }
  return (
    <div className="row" style={{ position: "relative" }}>
      <div className="col m1">
        {truckDetails.trace.length>2 && <div
          style={{
            borderLeft: "1px solid " + color,
            height: "43px",
            position: "absolute",
            left: "18px",
            marginleft: "-3px",
            top: "12px"
          }}
        />}
        {truckDetails.trace.length>=2 && <div
          style={{
            borderLeft: "1px dotted " + color,
            height: "41px",
            position: "absolute",
            left: "21px",
            marginLeft: "-3px",
            top: "66px"
          }}
        />}
        {
          truckDetails.trace.length!==1 && truckDetails.trace.slice(0,2).map((item,key)=>{
            return (
              <UiIcon
                key={key}
                name="brightness_1"
                size="tiny"
                containerStyle={{ marginBottom: "38px" }}
                containerClass={statusColor}
              />
            )
          })
        }
        {truckDetails.trace.length>0 && <UiIcon
          name="panorama_fish_eye"
          size="tiny"
          containerClass={statusColor}
        />}
      </div>
      <div className="col m11">
        {
          truckDetails.trace.length!==1 && truckDetails.trace.slice(0,2).map((item,key)=>{
            return (
              <div key={key} className="row marginTop30">
                <div className="col m8 left-align">
                  {item.location.name}
                </div>
                <div className="col m4 shipmentDetailsBreakUpDateAndTime">
                  {timeConverion(item.location_time)}
                </div>
              </div>
            )
          })
        }
        {truckDetails.trace.length>0?<div className="row">
          <div className="col m8 left-align">
            {truckDetails.trace[truckDetails.trace.length - 1].location.name}
          </div>
          <div className="col m4 shipmentDetailsBreakUpDateAndTime">{`ETA: ${timeConverion(
            truckDetails.trace[truckDetails.trace.length - 1].location_time
          )}`}</div>
        </div>:<div className="row">No trace records</div>}
      </div>
    </div>
  );
};

export default LocationHistoryStepper;
