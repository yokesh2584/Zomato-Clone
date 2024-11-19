import React from "react";
import queryString from "query-string";
import axios from "axios";
import Modal from "react-modal";

import "../styles/Details.css";
import Header from "./Header";
import ImageSlider from "./ImageSlider";

class Details extends React.Component {

    constructor(){
        super();
        this.state = {
            toggle: 1,
            restaurant: {},
            menuItem: {},
            modalIsOpen: false,
            subTotalAmount: 0,
            itemQuantities: [],
        }
    }

    componentDidMount() {
        const qs = queryString.parse(window.location.search);
        const { restaurant } = qs ;

        axios.get(`https://zomato-server-backend.vercel.app/restaurants`)
            .then(response => {
                const restaurantData = response.data.find((item) => item.location_id === parseInt(restaurant));
                if ( restaurantData ) {
                    this.setState({ restaurant: restaurantData })
                } else {
                    console.log('No restaurant data found');
                }
            })
            .catch(err => {
                console.error(err);
            })

        axios.get(`https://zomato-server-backend.vercel.app/${restaurant}`)
            .then(response => {
              if (response.data) {
                const menuItem = response.data[0];
                // console.log(response.data)
                this.setState({ 
                    menuItem,
                    itemQuantities: Array(menuItem.menu.length).fill(0)
                 });
              }
            })
            .catch(err => console.error(err));
    }

    handleQuantityChange = (index, operation, itemPrice) => {
        const { itemQuantities, subTotalAmount } = this.state;
      
        if (operation === 'add') {
          itemQuantities[index]++;
          this.setState({
            itemQuantities: [...itemQuantities], // Update state with new array
            subTotalAmount: subTotalAmount + itemPrice,
          });
        } else if (operation === 'subtract' && itemQuantities[index] > 0) {
          itemQuantities[index]--;
          this.setState({
            itemQuantities: [...itemQuantities], // Update state with new array
            subTotalAmount: subTotalAmount - itemPrice,
          });
        }
      };

    
    handleToggle = (index) => {
        this.setState({toggle: index});
    }
    
    handleOrder = () => {
        this.setState({ modalIsOpen: true });
    }

    handleCloseModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render(){
        
        const { restaurant, menuItem, subTotalAmount } = this.state;
        const { name, city, location_id, city_id, locality, min_price, contact_number, cuisine } = restaurant;
        
        return(
            <>      
                <Header />
                <div className="container details-page py-3">
                    <ImageSlider />
                    <div className="name-box">
                    <div className="shop-name">{name}</div>
                    <div className="btn-div"><button className="order-btn" onClick={this.handleOrder}>Place Order</button></div>
                    </div>
                    <div className="tabs">
                        <button className={this.state.toggle === 1 ? "tab active-tab" : "tab"} onClick={() => this.handleToggle(1)}>Overview</button>
                        <button className={this.state.toggle === 2 ? "tab active-tab" : "tab"} onClick={() => this.handleToggle(2)}>Contact</button>
                        <hr/>
                    <div className="tabs-contents">
                        <div className={this.state.toggle === 1 ? "content active-content" : "content"}>
                            <div className="about">About this place</div>
                            <div className="head">Cuisine</div>
                    {cuisine && cuisine.length > 0 && (
                    <div className="value">
                        {cuisine.map((cuisineItem, index) => (
                        <React.Fragment key={index}>{cuisineItem.name1 || cuisineItem.name2}{index < cuisine.length - 1 && ", "}</React.Fragment>
                        ))}
                    </div>
                    )}
                            <div className="head">Average Cost</div>
                            <div className="value">&#8377;&nbsp;{min_price} for two people(approx)</div>
                        </div>
                        <div className={this.state.toggle === 2 ? "content active-content" : "content"}>
                            <div className="shop-name">{name}</div>
                            <div className="shop-contact">Phone number:&nbsp;{contact_number}</div>
                            <div className="shop-address">{`Shop ${location_id}, ${locality}, ${city}-${city_id}`}</div>
                        </div>
                    </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.handleCloseModal}
                    contentLabel="Order Place"
                    className="order-place-modal"                
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-10 text-left res-name">{menuItem.name}</div>
                            <div className="col-2 text-center fa fa-close modal-close-btn" onClick={this.handleCloseModal}></div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-left total-amount">Price: {subTotalAmount}</div>
                        </div>
                        <div className="row">
                            <div className="col-12"><button className="pay-btn">Pay Now</button></div>
                        </div>
                        <hr/>
                        {menuItem && menuItem.menu && menuItem.menu.map((item, index) => {
                            return (
                                <React.Fragment key={item._id}>

                                <div className="container-fluid mt-4">
                                    <div className="menu-item-card row align-items-center">
                                    <div className="col-12 col-sm-7 col-md-8 col-lg-8">
                                        <h5 className="fw-bold mb-2">{item.name}</h5>
                                        <p className="text-danger fw-bold mb-1">₹{item.price}</p>
                                        <p className="d-none d-sm-block text">{item.description}</p>
                                    </div>
                                    <div className="col-12 col-sm-5 col-md-4 col-lg-4 px-1">
                                        <img
                                        src={`../../public/${item.image}`}
                                        alt="Menu Item"
                                        className="menu-item-img mb-2"
                                        />
                                        <button
                                            className="btn-sub"
                                            onClick={() => this.handleQuantityChange(index, 'subtract', item.price)}
                                            >
                                            -
                                        </button>
                                        <span className="quantity">{this.state.itemQuantities[index]}</span>
                                        <button
                                            className="btn-add"
                                            onClick={() => this.handleQuantityChange(index, 'add', item.price)}
                                            >
                                            +
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                <hr/>
                                </React.Fragment>
                            )
                            })}
                    </div>
                </Modal>
            </>
        )
    }
}

export default  Details;