import React from "react";
import { useNavigate } from "react-router-dom";

const FilterResultsPanel = ({ image, heading, subheading, address, cuisine, cost, location_id }) => {
  // console.log(image);
  const navigate = useNavigate();

  const handleRestaurantClick = () => {
    navigate(`/details?restaurant=${location_id}`);
  };

  return (
    <div className="resultsPanel" onClick={handleRestaurantClick}>
      <div className="row upperSection">
        <div className="col-2">
          <img src={image} alt="BreakFast" className="resultsImage" />
        </div>
        <div className="col-10">
          <div className="resultsHeading">{heading}</div>
          <div className="resultsSubHeading">{subheading}</div>
          <div className="resultsAddress">{address}</div>
        </div>
      </div>
      <hr />
      <div className="row lowerSection">
        <div className="col-5">
          <div>CUISINE:</div>
          <div>COST FOR TWO:</div>
        </div>
        <div className="col-7">
          <div>{cuisine}</div>
          <div>{cost}</div>
        </div>
      </div>
    </div>
  );
};

export default FilterResultsPanel;