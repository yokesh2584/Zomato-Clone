import React from "react";
import { useNavigate } from "react-router-dom";

const QuickSearches = ({ QuickSearchDataItem }) => {
    const navigate = useNavigate();

    const handleClick = (mealtypeId) => {
        const locationId = sessionStorage.getItem('locationId');
        if(locationId){
            navigate(`/filter?meal_type=${mealtypeId}&location=${locationId}`);
        } else {
            navigate(`/filter?meal_type=${mealtypeId}`);
        }
    };

    const { name, content, image, meal_type } = QuickSearchDataItem;

    return (
        <div 
            className="qs-box col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4" 
            onClick={() => handleClick(meal_type)}
        >
            <div className="qs-box-contents">
                <img src={`../../public/${image}`} alt="breakfast" className="qs-image" />
                <h4 className="qs-item-heading">{name}</h4>
                <p className="qs-item-description">{content}</p>
            </div>
        </div>
    );
};

export default QuickSearches;
