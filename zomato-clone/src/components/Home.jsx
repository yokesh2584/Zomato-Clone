import React from "react";
import axios from "axios";

import "../styles/Home.css";

import Wallpaper from "./Wallpaper";
import QuickSearch from "./QuickSearch";

class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            locations: [],
            mealType: [],
        }
    }

    componentDidMount(){
        sessionStorage.clear();

        axios.get('https://zomato-server-backend.vercel.app/locations')
            .then(response => {
                this.setState({locations: response.data})
            })
            .catch(err => {
                console.error(err);
            })
        
        axios.get('https://zomato-server-backend.vercel.app/mealType')
        .then(response => {
            this.setState({mealType: response.data})
        })
        .catch(err => {
            console.error(err);
        })
    }

    render(){
        return(
            <>
                <Wallpaper locations={this.state.locations}/>
                <QuickSearch QuickSearchData={this.state.mealType}/>
            </>
        )
    }
}

export default Home;