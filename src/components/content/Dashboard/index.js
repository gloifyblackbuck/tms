import React from "react";
import LocationHistoryStepper from "../LiveTracking/components/LocationHistoryStepper";
import UiIcon from "../../uiComponents/materializecss//UiIcon";
import UiSubChart from "../../uiComponents/materializecss//UiSubChart";
import UiSelect from "components/uiComponents/materializecss/UiSelect";
import UiDatePicker from "components/uiComponents/materializecss/UiDatePicker";
import { Link } from "react-router-dom";
import { commonApi } from "utility/api";
import {
  epochToCustomDateCoversion,
  substructDaysInDate
} from "utility/common";
import "./index.css";

class Dashboard extends React.Component {
  state = {
    summary: {},
    barChartConfig: {
      xAxis: {
        lineWidth: 0,
        gridLineWidth: 0,
        minorTickLength: 0,
        tickLength: 0,
        categories: [],
        title: {
          text: "ROUTES"
        },
        style: {
          fontSize: "10px",
          fontWeight: 600
        }
      },
      yAxis: {
        labels: {
          enabled: false
        },
        lineWidth: 0,
        gridLineWidth: 0,
        min: 0,
        title: {
          text: "DIFFERENCE (IN HOURS)"
        },
        style: {
          fontSize: "10px",
          fontWeight: 600
        }
      },
      legend: {
        enabled: false
      },
      series: [
        {
          pointWidth: 20,
          color: "#26a69a",
          showInLegend: true,
          data: []
        }
      ],
      chart: {
        height: 235,
        marginTop: 25
      }
    },
    lineChartConfig: {
      type: "line",
      xAxis: {
        title: {
          text: "SHIPEMNT DELIVERY DATE"
        },
        style: {
          fontSize: "10px",
          fontWeight: 600
        }
      },
      yAxis: {
        title: {
          text: "FULLIFILLMENT OF SLA (IN %)"
        },
        style: {
          fontSize: "10px",
          fontWeight: 600
        }
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          }
        }
      },
      series: [],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom"
              }
            }
          }
        ]
      },
      chart: {
        height: 361,
        marginTop: 25
      }
    },
    watchlist: [
      // {
      //   truckNo: "GJ-18-NT-9379",
      //   shipmentDetail: {
      //     indentId: "7350090909",
      //     driverDetail: {
      //       name: "Raman"
      //     }
      //   },
      //   trace: [
      //     {
      //       location: {
      //         name: "sagar"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "bangalore"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "shimoga"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     }
      //   ],
      //   status: "On Time"
      // },
      // {
      //   truckNo: "GJ-18-NT-9379",
      //   shipmentDetail: {
      //     indentId: "7350090909",
      //     driverDetail: {
      //       name: "Raman"
      //     }
      //   },
      //   trace: [
      //     {
      //       location: {
      //         name: "sagar"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "bangalore"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "shimoga"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     }
      //   ],
      //   status: "On Time"
      // },
      // {
      //   truckNo: "GJ-18-NT-9379",
      //   shipmentDetail: {
      //     indentId: "7350090909",
      //     driverDetail: {
      //       name: "Raman"
      //     }
      //   },
      //   trace: [
      //     {
      //       location: {
      //         name: "sagar"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "bangalore"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "shimoga"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     }
      //   ],
      //   status: "On Time"
      // },
      // {
      //   truckNo: "GJ-18-NT-9379",
      //   shipmentDetail: {
      //     indentId: "7350090909",
      //     driverDetail: {
      //       name: "Raman"
      //     }
      //   },
      //   trace: [
      //     {
      //       location: {
      //         name: "sagar"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "bangalore"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "shimoga"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     }
      //   ],
      //   status: "On Time"
      // },
      // {
      //   truckNo: "GJ-18-NT-9379",
      //   shipmentDetail: {
      //     indentId: "7350090909",
      //     driverDetail: {
      //       name: "Raman"
      //     }
      //   },
      //   trace: [
      //     {
      //       location: {
      //         name: "sagar"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "bangalore"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "shimoga"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     }
      //   ],
      //   status: "On Time"
      // },
      // {
      //   truckNo: "GJ-18-NT-9379",
      //   shipmentDetail: {
      //     indentId: "7350090909",
      //     driverDetail: {
      //       name: "Raman"
      //     }
      //   },
      //   trace: [
      //     {
      //       location: {
      //         name: "sagar"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "bangalore"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "shimoga"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     }
      //   ],
      //   status: "On Time"
      // },
      // {
      //   truckNo: "GJ-18-NT-9379",
      //   shipmentDetail: {
      //     indentId: "7350090909",
      //     driverDetail: {
      //       name: "Raman"
      //     }
      //   },
      //   trace: [
      //     {
      //       location: {
      //         name: "sagar"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "bangalore"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "shimoga"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     }
      //   ],
      //   status: "Need Attention"
      // },
      // {
      //   truckNo: "GJ-18-NT-9379",
      //   shipmentDetail: {
      //     indentId: "7350090909",
      //     driverDetail: {
      //       name: "Raman"
      //     }
      //   },
      //   trace: [
      //     {
      //       location: {
      //         name: "sagar"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "bangalore"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     },
      //     {
      //       location: {
      //         name: "shimoga"
      //       },
      //       location_time: "Thu May 24 2018 23:05:11 GMT+0530 (IST)"
      //     }
      //   ],
      //   status: "Delayed"
      // }
    ],
    chart: {
      eta: 30,
      sla: 30
    }
  };

  componentDidMount = async () => {
    let truckSummary = await commonApi(
      "get",
      "/tms/v1/tracking/status/summary"
    );
    this.setState({
      summary: truckSummary.data.result
    });
    let watchlistDetail = await commonApi("get", "/tms/v1/tracking/watchlist");
    this.initETADeviation(
      {
        startDate: epochToCustomDateCoversion(
          substructDaysInDate(new Date("2017-01-01"), 30)
        ),
        endDate: epochToCustomDateCoversion(new Date("2018-02-01"))
      },
      30
    );
    this.initFulfillmentSLA(
      {
        startDate: epochToCustomDateCoversion(
          substructDaysInDate(new Date("2017-01-01"), 30)
        ),
        endDate: epochToCustomDateCoversion(new Date("2018-02-01")),
        transporterIds: "1,2,3,4,5,6,7,86"
      }
    );
  };

  initETADeviation = async (filterETADeviation, value) => {
    let { barChartConfig } = this.state;
    let topDeviationLine = await commonApi(
      "get",
      "/tms/v1/tracking/lane/eta/deviation",
      filterETADeviation
    );

    this.setState({
      chart: {
        eta: value
      },
      barChartConfig: {
        ...barChartConfig,
        xAxis: {
          ...barChartConfig.xAxis,
          categories: topDeviationLine.data.result.data.map(item => {
            return `${item.source.code} - ${item.destination.code}`;
          })
        },
        series: [
          {
            ...barChartConfig.series[0],
            data: topDeviationLine.data.result.data.map(item => {
              return { y: item.deviation };
            })
          }
        ]
      }
    });
  };

  initFulfillmentSLA = async (filterFulifelmentSLA) => {
    let { lineChartConfig } = this.state;

    let fullifilmentOfSla = await commonApi(
      "get",
      "/tms/v1/tracking/transporter/eta/sla",
      filterFulifelmentSLA
    );

    let series = {};
    for (var i = 0; i < fullifilmentOfSla.data.result.data.length; i++) {
      let item = fullifilmentOfSla.data.result.data[i];
      if (series.hasOwnProperty(item.transporter.name)) {
        series[item.transporter.name].data = [
          ...series[item.transporter.name].data,
          item.sla
        ];
      } else {
        series[item.transporter.name] = {};
        series[item.transporter.name].data = [];
        series[item.transporter.name].data.push(item.sla);
      }
    }

    this.setState({
      lineChartConfig: {
        ...lineChartConfig,
        series: Object.keys(series).map((key, index) => {
          return {
            name: key,
            data: series[key].data
          };
        })
      }
    });
  };

  chartFilterChange = (filterName, value) => {
    let { initETADeviation, initFulfillmentSLA } = this;
    let { chart } = this.state;
    if (filterName === "etaDeviationFilter") {
      initETADeviation(
        {
          startDate: epochToCustomDateCoversion(
            substructDaysInDate(new Date(), value)
          ),
          endDate: epochToCustomDateCoversion(new Date())
        },
        value
      );
    } else {
      // console.log(value,filterName);
      if (
        filterName === "fulfillmentSLAFrom" &&
        chart["fulfillmentSLATo"]
      ) {
        initFulfillmentSLA(
          {
            startDate: epochToCustomDateCoversion(new Date(value)),
            endDate: epochToCustomDateCoversion(
              new Date(chart["fulfillmentSLATo"])
            ),
            transporterIds: "1,2,3,4,5,6,7,86"
          }
        );
      } else if (chart["fulfillmentSLAFrom"]) {
        initFulfillmentSLA(
          {
            startDate: epochToCustomDateCoversion(
              new Date(chart["fulfillmentSLAFrom"])
            ),
            endDate: epochToCustomDateCoversion(new Date(value)),
            transporterIds: "1,2,3,4,5,6,7,86"
          }
        );
      }
      this.setState({
        chart:{
          ...chart,
          [filterName]:value
        }
      })
    }
  };

  render() {
    const { chartFilterChange } = this;
    let {
      summary,
      watchlist,
      barChartConfig,
      lineChartConfig,
      chart
    } = this.state;
    return (
      <div>
        <div
          className="row center-align backgroundWhite"
          style={{ height: "138px", paddingTop: "20px", paddingBottom: "20px" }}
        >
          <div
            className="col m3"
            style={{ borderRight: "solid 1px #5a6872", height: "100%" }}
          >
            <span className="dashbordSummayHeader">Total Shipment</span>
            <br />
            <Link to="/live-tracking">
              <span className="dashbordSummayHeaderValue liveShipment">
                {summary.total}
              </span>
            </Link>
          </div>
          <div className="col m2">
            <span className="dashbordSummayHeader">Live Shipment</span>
            <br />
            <Link to="/live-tracking">
              <span className="dashbordSummayHeaderValue liveShipment">
                {summary.trackable}
              </span>
            </Link>
          </div>
          <div className="col m2">
            <span className="dashbordSummayHeader">On Time</span>
            <br />
            <Link to="/live-tracking/1">
              <span className="dashbordSummayHeaderValue onTime">
                {summary.on_time}
              </span>
            </Link>
          </div>
          <div className="col m3">
            <span className="dashbordSummayHeader">Behind Scedule</span>
            <br />
            <Link to="/live-tracking/2">
              <span className="dashbordSummayHeaderValue behindSchedule">
                {summary.delayed}
              </span>
            </Link>
          </div>
          <div className="col m2">
            <span className="dashbordSummayHeader">Stopped</span>
            <br />
            <Link to="/live-tracking/3">
              <span className="dashbordSummayHeaderValue stopped">
                {summary.needs_attention}
              </span>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col m8">
            <div
              className="row backgroundWhite"
              style={{ paddingTop: "10px", paddingLeft: "20px" }}
            >
              <div className="row">
                <div className="col m8">
                  <span className="chartHeader">
                    Routes with top ETA deviation
                  </span>
                </div>
                <div className="col m4">
                  <UiSelect
                    id="etaDeviationFilter"
                    containerclassName="align-right customDropdown"
                    data={[
                      { id: 7, name: "Last 7 days" },
                      { id: 15, name: "Last 15 days" },
                      { id: 30, name: "Last 30 days" }
                    ]}
                    code="id"
                    value="name"
                    placeholder="Choose days"
                    // name="etaDeviationFilter"
                    handleChange={(property, value) => {
                      chartFilterChange(property, value);
                    }}
                    defaultValue={chart.eta}
                  />
                </div>
              </div>
              <UiSubChart {...barChartConfig} />
            </div>
            <div
              className="row backgroundWhite"
              style={{ paddingTop: "10px", paddingLeft: "20px" }}
            >
              <div className="col m12">
                <span className="chartHeader">
                  Percentage fulfillment of SLA
                </span>
              </div>
              <div className="col m6">
                <UiDatePicker
                  id="fulfillmentSLAFrom"
                  placeholder="Start date"
                  containerclassName="align-right"
                  handleChange={(property, value) => {
                    chartFilterChange(property, value);
                  }}
                />
              </div>
              <div className="col m6">
                <UiDatePicker
                  id="fulfillmentSLATo"
                  placeholder="End date"
                  containerclassName="align-right"
                  handleChange={(property, value) => {
                    chartFilterChange(property, value);
                  }}
                />
              </div>

              <UiSubChart {...lineChartConfig} />
            </div>
          </div>
          <div className="col m4">
            <div
              className="row backgroundWhite"
              style={{
                paddingTop: "10px",
                paddingLeft: "20px",
                paddingBottom: "10px"
              }}
            >
              <span>Watchlist ({watchlist.length})</span> <br />
            </div>
            <div
              style={{
                overflowY: "scroll",
                height: "682px"
              }}
            >
              {watchlist.map((truckDetail, key) => {
                return (
                  <div
                    className="row backgroundWhite"
                    key={key}
                    style={{
                      marginBottom: "2px",
                      paddingLeft: "10px",
                      paddingTop: "16px"
                    }}
                  >
                    <div>
                      <span>
                        <UiIcon
                          key={key}
                          name="local_shipping"
                          size="tiny"
                          containerStyle={{ marginRight: "10px" }}
                        />
                        {truckDetail.truckNo}
                      </span>
                      <span className="floatRight">
                        <UiIcon
                          key={key}
                          name="person"
                          size="tiny"
                          containerStyle={{ marginRight: "10px" }}
                        />
                        {`${truckDetail.shipmentDetail.driverDetail.name}(${
                          truckDetail.shipmentDetail.indentId
                        })`}
                      </span>
                    </div>
                    <br />
                    <LocationHistoryStepper
                      truckDetails={truckDetail}
                      status={truckDetail.status}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
