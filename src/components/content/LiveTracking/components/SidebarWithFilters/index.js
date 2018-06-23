import React from "react";
import UiSelect from "components/uiComponents/materializecss/UiSelect";
import UiCheckBox from "components/uiComponents/materializecss/UiCheckBox";
import UiIcon from "components/uiComponents/materializecss/UiIcon";
import UiAutoCompleteWithToaster from "components/uiComponents/materializecss/UiAutoCompleteWithToaster";
import "./index.css";


const SidebarWithFilters = props => {
  const {
    totalShipement,
    onTime,
    behindSchedule,
    stopped,
    transporters,
    sources,
    destinations,
    filters,
    handleChange,
    applyFilter,
    clearFilter,
    toggleMoreFilter,
    hasMoreFilter
  } = props;
  return (
    <div>
      <form action="#">
        <div>
          <h5 className="live-shipments">Live Shipments</h5>
          <h5 className="shipmentCount">
            {totalShipement ? totalShipement : "0"}
          </h5>
        </div>
        <hr className="hr" />
        <h6 className="filter">Filters</h6>
        <div className="bottom-zero" style={{ marginLeft: "15px" }}>
          <label className="input-label m-bottom16">Status</label>
          <div className="col s12">
            <UiCheckBox
              id="blackbuckInTime"
              containerClass="checkbox-status"
              labelChildren={
                <span>
                  <UiIcon
                    name="brightness_1"
                    containerStyle={{ fontSize: "1rem" }}
                    containerClass="green-text"
                  />
                  <span>On Time ({onTime ? onTime : ""})</span>
                </span>
              }
              handleChange={(property, value) => {
                handleChange(property, value);
              }}
              value={filters.blackbuckInTime}
            />

            <UiCheckBox
              id="blackbuckBehindSchedule"
              containerClass="checkbox-status"
              labelChildren={
                <span>
                  <UiIcon
                    name="brightness_1"
                    containerStyle={{ fontSize: "1rem" }}
                    containerClass="orange-text"
                  />
                  <span>
                    Behind Schedule ({behindSchedule ? behindSchedule : ""})
                  </span>
                </span>
              }
              handleChange={(property, value) => {
                handleChange(property, value);
              }}
              value={filters.blackbuckBehindSchedule}
            />

            <UiCheckBox
              id="blackbuckStopped"
              containerClass="checkbox-status"
              labelChildren={
                <span>
                  <UiIcon
                    name="brightness_1"
                    containerStyle={{ fontSize: "1rem" }}
                    containerClass="red-text"
                  />
                  <span>Stopped ({stopped ? stopped : ""})</span>
                </span>
              }
              handleChange={(property, value) => {
                  handleChange(property, value);
              }}
              value={filters.blackbuckStopped}
            />

          </div>
        </div>
        <br/>
        <br/>
        <div className="row bottom-zero">
            <UiAutoCompleteWithToaster
              id="filterFromWarehouses"
              containerClass="col s12"
              data={sources}
              code="id"
              value="name"
              placeholder="Enter a source"
              name="Source"
              defaultValues={filters.filterFromWarehouses}
              handleChange={(property, value,action) => {
                handleChange(property, value,action);
              }}
            />
        </div>
        <div className="row bottom-zero">
          <UiAutoCompleteWithToaster
            id="filterToWarehouses"
            containerClass="col s12"
            data={destinations}
            code="id"
            value="name"
            placeholder="Enter a destination"
            name="Desitnation"
            defaultValues={filters.filterToWarehouses}
            handleChange={(property, value,action) => {
              handleChange(property, value,action);
            }}
          />
        </div>
        <div className="row bottom-zero">
          <UiAutoCompleteWithToaster
            id="filterTransporters"
            containerClass="col s12"
            data={transporters}
            code="id"
            value="name"
            placeholder="Enter a transporter"
            name="Transporter"
            defaultValues={filters.filterTransporters}
            handleChange={(property, value,action) => {
              handleChange(property, value,action);
            }}
          />
        </div>

      <div className="more-filters">
        {hasMoreFilter &&<i className="material-icons">expand_more</i>}
        {!hasMoreFilter && <i className="material-icons">expand_less</i>}
        <span onClick={(e)=>{
          toggleMoreFilter()
        }}>More Filters</span>
      </div>
      {hasMoreFilter && <div>Coming soon</div>}
        <div className="filter-action">
          <a className="waves-effect waves-light btn filter-button-clear" onClick={(e)=>{
            clearFilter()
          }}>
            Clear
          </a>
          <a className="waves-effect waves-light btn filter-button-apply" onClick={(e)=>{
            applyFilter()
          }}>
            Apply
          </a>
        </div>
      </form>
    </div>
  );
};

export default SidebarWithFilters;
