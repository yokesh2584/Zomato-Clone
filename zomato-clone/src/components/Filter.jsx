import React from "react";
import queryString from "query-string";
import axios from "axios";

import Header from "./Header";
import FilterPanel from "./FilterPanel";
import FilterResultsPanel from "./FilterResultsPanel";
import Pagination from "./Pagination";

import "../styles/Filter.css";


class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            meal_Type : "",
            locations: undefined,
            cuisine: [],   
            lowCost: undefined,   
            highCost: undefined, 
            sort: 1,  
            page: 1,
            totalPages: 0,
            isFetching: false,
        };
    }

    componentDidMount() {
        this.fetchRestaurants();
        const qs = queryString.parse(window.location.search);
        const { meal_type, location } = qs;

        const filterObj = {
            mealType: Number(meal_type),
            location,
        };

        switch (Number(meal_type)){
            case 1:
                this.setState({meal_Type: "BreakFast"})
                break;
            case 2:
                this.setState({meal_Type: "Lunch"})
                break;
            case 3:
                this.setState({meal_Type: "Dinner"})
                break;
            case 4:
                this.setState({meal_Type: "Snacks"})
                break;
            case 5:
                this.setState({meal_Type: "Drinks"})
                break;
            case 6:
                this.setState({meal_Type: "NightLife"})
                break;
        }

        axios({
            method: 'POST',
            url: 'https://zomato-server-backend.vercel.app/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
        .then(response => {
            this.setState({ restaurants: response.data.data });
        })
        .catch(error => {
            console.error('Error fetching meal types:', error);
        });
    }


    handleLocation = (location) => {
        const qs = queryString.parse(window.location.search);
        const { meal_type } = qs;

        const locationId = Number(location);

        const filterObj = {
            mealType: Number(meal_type),
            location: locationId,
        };

        axios({
            method: 'POST',
            url: 'https://zomato-server-backend.vercel.app/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
        .then(response => {
            this.setState({ restaurants: response.data.data, locations: locationId, page: 1 });
        })
        .catch(error => {
            console.error('Error fetching meal types:', error);
        });
    }

    handleCuisine = (cuisineId) => {
        const { cuisine, locations } = this.state;
        const qs = queryString.parse(window.location.search);
        const { meal_type } = qs;
    
        // Create new cuisine array
        let updatedCuisine = [...cuisine];
        const index = updatedCuisine.indexOf(cuisineId);
        
        if (index === -1) {
            updatedCuisine.push(cuisineId);
        } else {
            updatedCuisine.splice(index, 1);
        }
    
        const filterObj = {
            mealType: Number(meal_type),
            location: locations ? Number(locations) : undefined,
            cuisine: updatedCuisine.length > 0 ? updatedCuisine.map(Number) : undefined // Ensure all cuisine IDs are numbers
        };
    
        // console.log('Sending filter request:', filterObj);
    
        axios({
            method: 'POST',
            url: 'https://zomato-server-backend.vercel.app/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
        .then(response => {
            if (response.data && response.data.data) {
                this.setState({ 
                    restaurants: response.data.data,
                    cuisine: updatedCuisine,
                    page: 1,
                });
            } else {
                console.error('Invalid response format:', response);
            }
        })
        .catch(error => {
            console.error('Error details:', error.response?.data || error.message);
        });
    }

    handleCostRangeChange = (range) => {
        const { cuisine, locations } = this.state;
        const qs = queryString.parse(window.location.search);
        const { meal_type } = qs;

        const filterObj = {
            mealType: Number(meal_type),
            location: locations ? Number(locations) : undefined,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            lowCost: range.min,
            highCost: range.max,
        };

        // console.log('Cost range filter request:', filterObj);

        axios({
            method: 'POST',
            url: 'https://zomato-server-backend.vercel.app/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
        .then(response => {
            this.setState({ 
                restaurants: response.data.data,
                lowCost: range.min,
                highCost: range.max,
                page: 1,
            });
        })
        .catch(error => {
            console.error('Error applying cost filter:', error.response?.data || error.message);
        });
    }

    handleSortChange = (sortOrder) => {
        const { cuisine, locations, lowCost, highCost } = this.state;
        const qs = queryString.parse(window.location.search);
        const { meal_type } = qs;

        const filterObj = {
            mealType: Number(meal_type),
            location: locations ? Number(locations) : undefined,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            lowCost: lowCost,
            highCost: highCost,
            sort: sortOrder // 1 for ascending, -1 for descending
        };

        // console.log('Sort filter request:', filterObj);

        axios({
            method: 'POST',
            url: 'https://zomato-server-backend.vercel.app/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
        .then(response => {
            this.setState({ 
                restaurants: response.data.data,
                sort: sortOrder,
                page: 1,
            });
        })
        .catch(error => {
            console.error('Error applying sort filter:', error.response?.data || error.message);
        });
    }

    fetchRestaurants = () => {

        if (this.state.isFetching) return;

        this.setState({ isFetching: true });

        const { page, locations, cuisine, lowCost, highCost, sort } = this.state;
        const qs = queryString.parse(window.location.search);
        const { meal_type, location } = qs;

        const filterObj = {
            mealType: Number(meal_type),
            location: locations || location,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            lowCost,
            highCost,
            sort,
            page
        };

        axios({
            method: "POST",
            url: "https://zomato-server-backend.vercel.app/filter",
            headers: { "Content-Type": "application/json" },
            data: filterObj
        })
        .then(response => {
            this.setState({
                restaurants: response.data.data,
                totalPages: response.data.pageCount || 1, // Update total pages
                isFetching: false
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            this.setState({ isFetching: false });
        });
    }

    handlePageChange = (newPage) => {
        this.setState({ page: newPage }, () => {
            this.fetchRestaurants();
        });
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
          this.fetchRestaurants();
        } else if (
          prevState.locations !== this.state.locations ||
          prevState.cuisine !== this.state.cuisine ||
          prevState.lowCost !== this.state.lowCost ||
          prevState.highCost !== this.state.highCost ||
          prevState.sort !== this.state.sort
        ) {
          this.setState({ page: 1 }, () => {
            this.fetchRestaurants();
          });
        }
      }
    
    
    render(){

        const { restaurants, meal_Type, page, totalPages } = this.state;

        return(
            <>
                <Header />
                <div className="container-fluid">
                    <div className="row heading">
                        {meal_Type}
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-4 col-lg-3">
                            <FilterPanel 
                                locationChange={this.handleLocation}
                                cuisineChange={this.handleCuisine}
                                costRangeChange={this.handleCostRangeChange}
                                sortOrderChange={this.handleSortChange}
                            />
                        </div>
                        <div className="col-12 col-sm-12 col-md-8 col-lg-9">
                            {
                                restaurants.length > 0 ?
                                restaurants.map((restaurant) => {
                                    return <FilterResultsPanel 
                                    key={restaurant.location_id}
                                    image={`../public/${restaurant.image}`}
                                    heading={restaurant.name} 
                                    subheading={restaurant.locality}
                                    address={restaurant.city}
                                    cuisine={restaurant.cuisine.map((cuisineItem, index) => (
                                        <React.Fragment key={index}>{cuisineItem.name1 || cuisineItem.name2}{index < restaurant.cuisine.length - 1 && ", "}</React.Fragment>
                                        ))}
                                    cost={`₹ ${restaurant.min_price}`}
                                    location_id={restaurant.location_id}
                                    />
                                })
                                :
                                <div className="no-resultsPanel">No results found ! </div>
                            }
                            {restaurants.length > 0 ?
                                <Pagination 
                                    page={page} 
                                    totalPages={totalPages} 
                                    onPageChange={this.handlePageChange}
                                /> :
                            null} 
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Filter;
