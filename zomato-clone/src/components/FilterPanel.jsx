import React from "react";
import axios from "axios";

class FilterPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            selectedCuisines: new Set(), // Track selected cuisines
            selectedCostRange: "", // Track cost range
            sortOrder: "" // Track sort order
        }
    }
    
    componentDidMount(){
        axios.get('http://localhost:8700/locations')
            .then(response => {
                this.setState({ locations: response.data })
            })
            .catch(err => {
                console.error('Error fetching locations:', err);
            })
    }

    handleLocationChange = (event) => {
        const location = event.target.value;
        this.props.locationChange(location);
    }

    handleCuisineChange = (cuisineId) => {
        this.setState(prevState => {
            const newSelectedCuisines = new Set(prevState.selectedCuisines);
            if (newSelectedCuisines.has(cuisineId)) {
                newSelectedCuisines.delete(cuisineId);
            } else {
                newSelectedCuisines.add(cuisineId);
            }
            return { selectedCuisines: newSelectedCuisines };
        }, () => {
            this.props.cuisineChange(cuisineId);
        });
    }

    handleCostRangeChange = (range) => {
        // Add cost range handling when you implement it
        this.setState({ selectedCostRange: range });
        this.props.costRangeChange(range);
        // Call parent component method when implemented
        // this.props.costRangeChange(range);
    }

    handleSortChange = (sortOrder) => {
        this.setState({ sortOrder });
        this.props.sortOrderChange(sortOrder);
    }
    
    render(){
        const { locations, selectedCuisines } = this.state;

        const cuisines = [
            { id: 1, name: 'North Indian' },
            { id: 2, name: 'South Indian' },
            { id: 3, name: 'Chinese'},
            { id: 4, name: 'Fast Food' },
            { id: 5, name: 'Street Food' },
        ];

        const costRanges = [
            { id: 1, label: 'Less than ₹500', min: 0, max: 500 },
            { id: 2, label: '₹500 to ₹1000', min: 500, max: 1000 },
            { id: 3, label: '₹1000 to ₹1500', min: 1000, max: 1500 },
            { id: 4, label: '₹1500 to ₹2000', min: 1500, max: 2000 },
            { id: 5, label: '₹2000+', min: 2000, max: null }
        ];

        return(
            <div className="filterPanel">
                <div className="filterHeading">Filters</div>
                
                {/* Location Filter */}
                <div className="filterPanelSubHeading">Select Location</div>
                <select 
                    className="locationSelection" 
                    defaultValue="" 
                    onChange={this.handleLocationChange}
                >
                    <option value="" disabled>Select Location</option>
                    {locations.map(location => (
                        <option 
                            key={location.location_id} 
                            value={location.location_id}
                        >
                            {location.name}, {location.city}
                        </option>
                    ))}
                </select>

                {/* Cuisine Filter */}
                <div className="filterPanelSubHeading">Cuisine</div>
                {cuisines.map((cuisine) => (
                    <div key={cuisine.id}>
                        <input
                            type="checkbox"
                            id={`cuisine-${cuisine.id}`}
                            className="cuisineOption"
                            checked={selectedCuisines.has(cuisine.id)}
                            onChange={() => this.handleCuisineChange(cuisine.id)}
                        />
                        <label htmlFor={`cuisine-${cuisine.id}`}>{cuisine.name}</label>
                        <br />
                    </div>
                ))}

                {/* Cost Range Filter */}
                <div className="filterPanelSubHeading">Cost for two</div>
                {costRanges.map(range => (
                    <div key={range.id}>
                        <input 
                            type="radio" 
                            id={`cost-${range.id}`}
                            className="costOption" 
                            name="cost"
                            value={range.id}
                            // checked={this.state.selectedCostRange === range.id}
                            onChange={() => this.handleCostRangeChange(range)}
                        />
                        <label htmlFor={`cost-${range.id}`}>{range.label}</label>
                        <br/>
                        
                    </div>
                ))}

                {/* Sort Options */}
                <div className="filterPanelSubHeading">Sort</div>
                <div>
                    <input 
                        type="radio" 
                        id="sortLow"
                        className="sortOption" 
                        name="Price"
                        value="1"
                        checked={this.state.sortOrder === 1}
                        onChange={() => this.handleSortChange(1)}
                    />
                    <label htmlFor="sortLow">Price low to high</label>
                    <br/>
                </div>
                <div>
                    <input 
                        type="radio" 
                        id="sortHigh"
                        className="cuisinOption" 
                        name="Price"
                        value="-1"
                        checked={this.state.sortOrder === -1}
                        onChange={() => this.handleSortChange(-1)}
                    />
                    <label htmlFor="sortHigh">Price high to low</label>
                    <br/>
                </div>
            </div>
        );
    }
}

export default FilterPanel;
