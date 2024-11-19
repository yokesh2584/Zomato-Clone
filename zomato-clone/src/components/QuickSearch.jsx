import React from "react";

import QuickSearches from "./QuickSearches";

class QuickSearch extends React.Component {

    render(){

        const { QuickSearchData } = this.props;

        return(
            <>
                <div className="container-fluid quick-search">
                    <h4 className="qs-heading">Quick Searches</h4>
                    <h5 className="qs-subheading">Discover restaurants by type of meal</h5>
                    <div className="row qs-boxes-container">
                    
                    {
                        QuickSearchData.map(item => {
                            return <QuickSearches key={item.meal_type} QuickSearchDataItem={item}/>
                        })
                    }

                        
                    </div>
                </div>
            </>
        )
    }
}

export default QuickSearch;