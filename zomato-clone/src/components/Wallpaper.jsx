import React from "react";
import axios from "axios";

import WallpaperImage from "../../public/assets/Wallpaper.jpg";
import Header from "./Header";
import RestaurantListItem from "./RestaurantListItem";

class  Wallpaper extends React.Component {

    constructor(){
        super();
        this.state = {
            restaurants: [],
            searchRestaurants: "",
            suggestions: [],
        }
    }

    handleLocation = (event) => {
        const [city, locationId] = event.target.value.split(',');


        sessionStorage.setItem('locationId', locationId);

        axios.get(`http://localhost:8700/restaurants/${city}`)
            .then(response => {
                this.setState({restaurants: response.data})
            })
            .catch(err => {
                console.error(err);
            })
    }

    handleSearch = (event) => {
        let searchRestaurants = event.target.value; 
        const { restaurants } =this.state;
        const suggestions = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(searchRestaurants.toLowerCase()));
        this.setState({ suggestions: suggestions, searchRestaurants: searchRestaurants});
    }

    showSuggestions = () => {
        const {suggestions, searchRestaurants} = this.state;

        if(suggestions.length == 0 && searchRestaurants == "") {
            return null;
        }
        if(suggestions.length > 0 && searchRestaurants == ""){
            return null;
        }
        if(suggestions.length == 0 && searchRestaurants){
            return (
            <ul className="suggestionUl">
                <li className="suggestionList">No Search Results found</li>
            </ul>
            )
        }
        else{
            return (
            <ul className="suggestionUl" role="listbox">
                {
                    suggestions.map((item, index) => {
                        return(
                            <RestaurantListItem key={index} restaurant={item} />
                        )
                    })
                }
            </ul>
        )}
    }


    render(){

        const { locations } = this.props;

        return(
            <>
                <img src={WallpaperImage} alt="WallPaper Image" className="home-image" />
                <Header />
                    <div className="image-overlay"></div>
                <div className="container-fluid wallpaper-section text-center">
                    <div className="home-logo">e!</div>
                    <div className="header-text">Find the best restaurants, bars and cafe!</div>
                    <div className="container search-options">
                        <div className="row justify-content-md-center">
                        <div className="col-8 col-sm-8 col-md-5 col-lg-4 col-xl-3 my-1 mx-auto location-box">
                        <select className="form-control" defaultValue="" onChange={this.handleLocation}>
                        <option value="" disabled>Select City</option>
                            {locations.map(location => (
                                <option key={location.location_id} value={`${location.city},${location.location_id}`}>{location.name}, {location.city}</option>
                            ))}
                        </select>
                        </div>
                        <div className="col-8 col-sm-8 col-md-7 col-lg-6 col-xl-6 my-1 mx-auto text-center search-box">
                                    <input id="query" type="text" className="search-box form-control"placeholder="search for restaurants" onChange={this.handleSearch}/>
                                    {this.showSuggestions()}
                        </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Wallpaper;