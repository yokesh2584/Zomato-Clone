import React from "react";
import { useNavigate } from "react-router-dom";

function RestaurantListItem({ restaurant }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/details?restaurant=${restaurant.location_id}`);
    }

    return (
        <li className="suggestionList" onClick={handleClick}>
            <div className="container-fluid">
                <div className="row justify-content-between justify-content-md-end align-items-center">
                    <div className="col-2 col-md-4 col-lg-3 text-center"><img src={`/${restaurant.image}`}/></div>
                    <div className="col-8 col-md-8 col-lg-4 text-center"><p><b>{` ${restaurant.name} -  ${restaurant.locality}, ${restaurant.city}`}</b></p></div>
                    <div className="col-12 col-md-12 col-lg-5 text-right"><button className="orderBtn">Order Now &gt;</button></div>
                </div>
                {/* <div className="row justify-content-between" >
                     <div className="col-2" >
                       <img src={`../../public/${restaurant.image}`}/>
                     </div>
                     <div className="col-8">
                        <p>{` ${restaurant.name} -  ${restaurant.locality}, ${restaurant.city}`}</p>
                     </div>

                     <div className= "col-12">
                         <button className="orderBtn">Order Now &gt;&gt;&gt;</button>
                     </div>
                </div> */}
            </div>
        </li>
      );
}

export default RestaurantListItem;