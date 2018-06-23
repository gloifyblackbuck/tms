import React from "react";
import Map from "../../uiComponents/Map";
import SidebarWithFilters from "./components/SidebarWithFilters";
import ShipmentPopUp from "./components/ShipmentPopUp";
import "./index.css";
import { commonApi } from "utility/api";
import isEmpty from "lodash/isEmpty";
import pull from "lodash/pull";
import onTimeIcon from "assets/images/Green_Marker.svg";
import behindScheduleIcon from "assets/images/Yellow_Marker.svg";
import stoppedIcon from "assets/images/Red_Marker.svg";
import truck from "assets/images/truck.svg";
import source from "assets/images/Source.png";
import destination from "assets/images/Destination.png";
// import aboutToReachIcon from "assets/images/pickup/pickup.png";

let etaStatusMap={
  blackbuckInTime:1,
  blackbuckBehindSchedule:2,
  blackbuckStopped:3
}

// let stoppedIcon=
// {
//     path: "M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z",
//     fillColor: '#ff0000',
//     fillOpacity: 1,
//     strokeColor: '',
//     strokeWeight: 0
// }
//
// let behindScheduleIcon=
// {
//     path: "M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z",
//     fillColor: '#ffa900',
//     fillOpacity: 1,
//     strokeColor: '',
//     strokeWeight: 0
// }
//
// let onTimeIcon=
// {
//     path: "M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z",
//     fillColor: '#5aa700',
//     fillOpacity: 1,
//     strokeColor: '',
//     strokeWeight: 0
// }


let mapIcons = {
  "Needs Attention": stoppedIcon,
  Delayed: behindScheduleIcon,
  "On Time": onTimeIcon,
  truck:truck,
  source,
  destination
  // "AboutToReach":aboutToReachIcon
};




class LiveTracking extends React.Component {
  state = {
    summary: {},
    data: {},
    entityTypes: [],
    transporters: [],
    sources: [],
    destinations: [],
    isEntityTypeShown: true,
    isDirectionShown: false,
    source: {},
    destination: {},
    isModalVisble:false,
    truckDetails:{},
    filters:{},
    hasMoreFilter:false
  };

  componentDidMount = async () => {
    let status={};
    let {match}=this.props;
    if (match.params.status) {
      status.filterEtaStatus=match.params.status;
    }
    let truckSummary = await commonApi(
      "get",
      "/tms/v1/tracking/status/summary"
    );
    let truckPositions = await commonApi("get", "/tms/v2/tracking",status);
    let transporters = await commonApi("get", "/tms/v1/base/transporter/");
    let sources = await commonApi("get", "/tms/v1/warehouse", {
      warehouseType: 1
    });
    let destinations = await commonApi("get", "/tms/v1/warehouse", {
      warehouseType: 2
    });

    let truckPositionsTransfferedData=this.transformTruckPositions(truckPositions);
    this.setState({
      summary: truckSummary.data.result,
      entityTypes:truckPositionsTransfferedData,
      transporters: transporters.data.result.data,
      sources: sources.data.result.warehouse,
      destinations: destinations.data.result.warehouse
    });
  };

  transformTruckPositions=(truckPositions)=>{
    let entityTypes = [];
    if (
      truckPositions.data.result &&
      truckPositions.data.result.data.length > 0
    ) {
      entityTypes = truckPositions.data.result.data.map(truckPosition => {
        return {
          id: truckPosition.id,
          isLabelShown: false,
          labelStatus: false,
          position: {
            lat: truckPosition.latitude,
            lng: truckPosition.longitude
          },
          status: truckPosition.eta_status,
          icon: mapIcons[truckPosition.eta_status]
        };
      });
    }
    return entityTypes;
  }

  handleInfoBoxToggle = async index => {
    let truckPlotDetails = await commonApi(
      "get",
      `/tms/v1/tracking/plot/${index}`
    );
    let truckDetails= await commonApi(
      "get",
      `/tms/v1/tracking/${index}`
    );
    // let documentsDetails= await commonApi(
    //   "get",
    //   `/tms/v1/indents/${truckDetails.data.result.data[0].indent.indent}/documents/`
    // );
    // console.log(documentsDetails);
    // console.log(truckPlotDetails);
    // console.log(truckDetails);
    let { data } = truckPlotDetails;
    let { result } = data;
    let { source_warehouse, destination_warehouse,trace } = result;
    this.setState({
      isDirectionShown: true,
      truckDetails:{
          entityTypes:[
            {
              id: index,
              isLabelShown: false,
              labelStatus: false,
              position: {
                lat: trace[0].location.latitude,
                lng: trace[0].location.longitude
              },
              status: truckDetails.data.result.data[0].eta_status,
              icon: mapIcons.truck
            },
            {
              id: index+1,
              position: {
                lat: source_warehouse.latitude,
                lng: source_warehouse.longitude
              },
              icon:{url:mapIcons.source,scaledSize: new window.google.maps.Size(25, 25)}
            },
            {
              id: index+2,
              position: {
                lat: destination_warehouse.latitude,
                lng: destination_warehouse.longitude
              },
              icon:{url:mapIcons.destination,scaledSize: new window.google.maps.Size(25, 25)}
            }
          ],
          id:index,
          shipmentDetail:{
            from:truckDetails.data.result.data[0].indent.from_city,
            to:truckDetails.data.result.data[0].indent.to_city,
            region:"",
            indentType:""
          },
          transporterDetail:{
            transporterName:truckDetails.data.result.data[0].transporter.name,
            vehicleNo:truckDetails.data.result.data[0].truck_number,
            driverName:truckDetails.data.result.data[0].driver.name,
            driverNumber:truckDetails.data.result.data[0].driver.contact_number
          },
          etaStatus:truckDetails.data.result.data[0].eta_status,
          lastUpdatedAt:truckDetails.data.result.data[0].last_updated_at,
          trace,
          eta:truckDetails.data.result.data[0].eta
      },
      source: {
        lat: source_warehouse.latitude,
        lng: source_warehouse.longitude,
        code: source_warehouse.code,
        address: source_warehouse.address
      },
      destination: {
        lat: destination_warehouse.latitude,
        lng: destination_warehouse.longitude,
        code: destination_warehouse.code,
        address: destination_warehouse.address
      },
      documents:[]
    });
    this.modalToggle();
  };

  modalToggle=()=>{
    this.setState({isModalVisble:!this.state.isModalVisble})
  }

  handleChangeForFilter=(property,value,action="")=>{
    let {filters}=this.state;
    if (property==="filterFromWarehouses" || property==="filterToWarehouses" || property ==="filterTransporters") {
      if (action==="add") {
        if (filters.hasOwnProperty(property)) {
          this.setState({
            filters:{
              ...filters,
              [property]:[...filters[property],value]
            }
          })
        } else {
          this.setState({
            filters:{
              ...filters,
              [property]:[value]
            }
          })
        }
      } else {
        this.setState({
          filters:{
            ...filters,
            [property]:pull(filters[property],value)
          }
        })
      }

    } else {
      this.setState({
        filters:{
          ...filters,
          [property]:value
        }
      })
    }

  }

  applyFilter=async ()=>{
    let {filters}=this.state;
    if (!isEmpty(filters)) {
      let filterEtaStatus=[];
      if (filters.blackbuckInTime) {
        filterEtaStatus.push(etaStatusMap["blackbuckInTime"]);
        // delete filters["blackbuckInTime"];
      }
      if (filters.blackbuckBehindSchedule)
      {
        filterEtaStatus.push(etaStatusMap["blackbuckBehindSchedule"]);
        // delete filters["blackbuckBehindSchedule"];
      }
      if (filters.blackbuckStopped)
      {
        filterEtaStatus.push(etaStatusMap["blackbuckStopped"]);
        // delete filters["blackbuckStopped"]
      }
      if(filterEtaStatus.length>0){
        filters["filterEtaStatus"]=filterEtaStatus.join(",");
      }
      else {
        delete filters["filterEtaStatus"];
      }

      console.log(filters);
      let truckPositions = await commonApi("get", "/tms/v2/tracking",filters);
      let truckPositionsTransfferedData=this.transformTruckPositions(truckPositions);
      this.setState({
        entityTypes:truckPositionsTransfferedData
      })
    } else {
      alert("Please select one of the filters");
    }
  }

  clearFilter=async ()=>{
    let {filters}=this.state;
    if (!isEmpty(filters)) {
      let truckPositions = await commonApi("get", "/tms/v2/tracking");
      let truckPositionsTransfferedData=this.transformTruckPositions(truckPositions);
      this.setState({
        entityTypes:truckPositionsTransfferedData,
        filters:{}
      })
    } else {
      alert("There is no filter to clear");
    }
  }

  toggleMoreFilter=()=>{
    let {hasMoreFilter}=this.state;
    this.setState({
      hasMoreFilter:!hasMoreFilter
    })
  }
  render() {
    let {
      entityTypes,
      summary,
      transporters,
      sources,
      destinations,
      isEntityTypeShown,
      source,
      destination,
      isModalVisble,
      truckDetails,
      filters,
      hasMoreFilter
    } = this.state;
    let { handleInfoBoxToggle,modalToggle,handleChangeForFilter ,applyFilter,clearFilter,toggleMoreFilter} = this;

    return (
      <div>
        <div className="input-field input-field-override">
          <i className="material-icons prefix">search</i>
          <input
            type="text"
            id="autocomplete-input"
            className="autocomplete"
            style={{ marginBottom: "0" }}
            placeholder="Search for a shipment by shiment Id or vehicle No"
          />
        </div>
        <div className="flex-container">
          {isModalVisble && <div className="shipmentModal"><ShipmentPopUp truckDetails={truckDetails} modalToggle={modalToggle} source={source} destination={destination}/></div>}
          {!isModalVisble && <div className="filter-box">
            <SidebarWithFilters
              sources={sources}
              destinations={destinations}
              transporters={transporters}
              totalShipement={summary.trackable}
              onTime={summary.on_time}
              behindSchedule={summary.delayed}
              stopped={summary.needs_attention}
              handleChange={handleChangeForFilter}
              applyFilter={applyFilter}
              clearFilter={clearFilter}
              filters={filters}
              hasMoreFilter={hasMoreFilter}
              toggleMoreFilter={toggleMoreFilter}
              // aboutToReach={(summary.total-(summary.trackable+summary.delayed+summary.needs_attention))}
            />
          </div>}

          {!isModalVisble && <div className="map-box">
            <Map
              onInfoBoxToggle={handleInfoBoxToggle}
              isEntityTypeShown={isEntityTypeShown}
              isDirectionShown={false}
              entityTypes={entityTypes}
            />
          </div>}
        </div>
      </div>
    );
  }
}

export default LiveTracking;

// <div className="row">
//   <div className="col s12 m3">
//     <div className="card">
//       <div className="card-content">
//         <span className="card-title">Live Shipments</span>
//
//       </div>
//     </div>
//   </div>
//   <div className="col s12 m9">
//     <div className="card map-box">
//       <Map/>
//     </div>
//   </div>
// </div>
