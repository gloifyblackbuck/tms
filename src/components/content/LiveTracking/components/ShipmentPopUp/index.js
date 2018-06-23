import React from "react";
import Map from "../../../../uiComponents/Map";
import LocationHistoryStepper from "../LocationHistoryStepper";
import "./index.css";


const ShipmentPopUp = props => {
  let { truckDetails, source, destination, modalToggle} = props;
  return (
    <div>
      <div className="row">
        <div className="col m8 left-align">
          <span className="shipmentModalHeader left-align">Shipment ID</span>
          <br />
          <span className="shipementModalShipmentId">
            {truckDetails.id ? truckDetails.id : "NA"}
          </span>
        </div>
        <div className="col m4 right-align">
          <i className="medium material-icons shipmentModalIconOverride">
            turned_in_not
          </i>
          <i
            onClick={() => {
              modalToggle();
            }}
            className="medium material-icons shipmentModalIconOverride"
          >
            close
          </i>
        </div>
      </div>

      <div className="row">
        <div className="col m6">
          <div className="shipementModalShipmentDetailsHeader">
            <i className="tiny material-icons">receipt</i>
            <span>Shipment Details</span>
          </div>
          <div className="row">
            <div className="col m6">
              <span className="shipmentModalShipmentSubHeader">From</span>
              <br />
              <span>
                {truckDetails.shipmentDetail.from
                  ? truckDetails.shipmentDetail.from
                  : "NA"}
              </span>
            </div>
            <div className="col m6">
              <span className="shipmentModalShipmentSubHeader">To</span>
              <br />
              <span>
                {truckDetails.shipmentDetail.to
                  ? truckDetails.shipmentDetail.to
                  : "NA"}
              </span>
            </div>
          </div>
          {/*<div className="row">
              <div className="col m6">
                <span className="shipmentModalShipmentSubHeader">Region</span><br/>
                <span>{truckDetails.shipmentDetail.region?truckDetails.shipmentDetail.region:"NA"}</span>
              </div>
              <div className="col m6">
                <span className="shipmentModalShipmentSubHeader">Indent Type</span><br/>
                <span>{truckDetails.shipmentDetail.indentType?truckDetails.shipmentDetail.indentType:"NA"}</span>
              </div>
            </div>*/}

          <div className="shipementModalShipmentDetailsHeader">
            <i className="tiny material-icons">local_shipping</i>
            <span>Transporter Details</span>
          </div>
          <div className="row">
            <div className="col m6">
              <span className="shipmentModalShipmentSubHeader">
                Transporter Name
              </span>
              <br />
              <span>
                {truckDetails.transporterDetail.name
                  ? truckDetails.transporterDetail.name
                  : "NA"}
              </span>
            </div>
            <div className="col m6">
              <span className="shipmentModalShipmentSubHeader">
                Vehicle Number
              </span>
              <br />
              <span>
                {truckDetails.transporterDetail.vehicleNo
                  ? truckDetails.transporterDetail.vehicleNo
                  : "NA"}
              </span>
            </div>
          </div>
          {/*<div className="row">
              <div className="col m6">
                <span className="shipmentModalShipmentSubHeader">Drivers Name</span><br/>
                <span>{truckDetails.transporterDetail.driverName?truckDetails.transporterDetail.driverName:"NA"}</span>
              </div>
              <div className="col m6">
                <span className="shipmentModalShipmentSubHeader">Drivers Number</span><br/>
                <span>{truckDetails.transporterDetail.driverNumber?truckDetails.transporterDetail.driverNumber.id:"NA"}</span>
              </div>
            </div>*/}

          <div className="shipementModalShipmentDetailsHeader">
            <i className="tiny material-icons">attach_file</i>
            <span>Documents</span>
          </div>
          <div className="row">
            {truckDetails.documents > 0 ? (
              <div className="col m3" />
            ) : (
              <div className="col m12">No Documents</div>
            )}
          </div>
        </div>

        <div className="col m6 right-align">
          {truckDetails.entityTypes[0].status==="Need Attention" && <div className="shipmentDetailsMapStatus left-align">test</div>}
          <div style={{ height: "420px" }}>
            <Map
              onInfoBoxToggle={() => {
                console.log("clicked");
              }}
              isEntityTypeShown={true}
              isDirectionShown={true}
              source={source}
              destination={destination}
              entityTypes={truckDetails.entityTypes}
            />
          </div>
          <div className="row" style={{ marginTop: "21px", fontSize: "14px" }}>
            <div className="col m9">
              <LocationHistoryStepper truckDetails={truckDetails} status={truckDetails.entityTypes[0].status}/>
            </div>
            <div
              className="col m3"
              style={{ borderLeft: "0.3px solid #5e6c76", height: "131px" }}
            >
              {/*<div className="row">
                  <div className="col m12 left-align">
                    <span className="shipmentModalShipmentSubHeader">Remaining Distance</span><br/>
                    <span>{truckDetails.transporterDetail.distance?truckDetails.transporterDetail.distance:"NA"}</span>
                  </div>
                </div>*/}
              <div className="row">
                <div className="col m12 left-align">
                  <span className="shipmentModalShipmentSubHeader">ETA</span>
                  <br />
                  <span>
                    {truckDetails.transporterDetail.eta
                      ? truckDetails.transporterDetail.eta.duration
                      : "NA"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentPopUp;
