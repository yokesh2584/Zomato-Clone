import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import GoogleLoginButton from "./GoogleLoginButton";
import { Link } from "react-router-dom";
import FacebookLoginButton from "./FacebookLoginButton";


import "../styles/Header.css";

// Custom withRouter HOC for React Router v6
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        const location = useLocation();
        return <Component {...props} location={location} />;
    }
    ComponentWithRouterProp.displayName = `withRouter(${Component.displayName || Component.name || "Component"})`;
    return ComponentWithRouterProp;
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleFacebookLoginSuccess = this.handleFacebookLoginSuccess.bind(this);
        this.state = {
            bg: "transparent",
            logoDisplay: "none",
            position: "absolute",
            justify: "right",
            loginModalIsOpen: false,
            isLoggedIn: false,
            loggedUser: undefined,
            userEmail: "",
            userPassword: "",
        };
    }

    componentDidMount() {
        this.initModalAccessibility();
        this.updateHeader(this.props.location.pathname);
        this.restoreLoginState();
    }
    
    initModalAccessibility() {
    Modal.setAppElement("#root");
    }
    
    restoreLoginState() {
        try {
          const isLoggedIn = localStorage.getItem('isLoggedIn');
          const loggedUser = localStorage.getItem('loggedUser');
          
          if (isLoggedIn === 'true') {
            this.setState({ isLoggedIn: true, loggedUser });
          }
        } catch (error) {
          console.error('Error restoring LocalStorage:', error);
        }
      }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.updateHeader(this.props.location.pathname);
        }

        if (prevState.loggedUser !== this.state.loggedUser) {
            console.log('State updated: loggedUser:', this.state.loggedUser);
        }
    }

    updateHeader = (path) => {
        if (path === "/") {
            this.setState({
                bg: "transparent",
                logoDisplay: "none",
                position: "absolute",
                justify: "right",
                zIndex: "2",
            });
        } else {
            this.setState({
                bg: "hsl(0, 100%, 50%)",
                logoDisplay: "inline-block",
                position: "relative",
                justify: "space-between",
                zIndex: "0",
            });
        }
    };
    
    handleLogin = () => {
        this.setState({ loginModalIsOpen: true });
    };

    handleCloseModal = () => {
        this.setState({ loginModalIsOpen: false });
    };

    handleLoginSuccess = (response) => {
        // console.log(response); // Google login response with access token
        const access_token = response?.access_token; // Get the access token from the response
    
        if (access_token) {
            // Fetch user's profile data using the access token
            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
            })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data); // This contains user's name, email, etc.
                this.setState({
                    isLoggedIn: true,
                    loggedUser: data.name,  // Set the name from the response
                    loginModalIsOpen: false, // Close the modal on successful login
                });
                try {
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('loggedUser', data.name);
                } catch (error) {
                console.error('Error setting LocalStorage:', error);
                }
            })
            .catch((error) => console.error('Error fetching user info:', error));
        }

    }


    handleFacebookLoginSuccess = (response) => {
        const access_token = response?.accessToken;
        
        if (access_token) {
            fetch(`https://graph.facebook.com/me?fields=name,email,picture&access_token=${access_token}`)
                .then((response) => {
                    if (!response.ok) throw new Error('Failed to fetch user data');
                    return response.json();
                })
                .then((data) => {
                    this.setState({
                        isLoggedIn: true,
                        loggedUser: data.name,
                        loginModalIsOpen: false,
                    }, () => {
                        console.log('State updated successfully');
                        console.log('isLoggedIn:', this.state.isLoggedIn);
                        console.log('loggedUser:', this.state.loggedUser);
                        console.log('loginModalIsOpen:', this.state.loginModalIsOpen);
                        localStorage.setItem('isLoggedIn', true);
                        localStorage.setItem('loggedUser', data.name);
                    });
                })
                .catch((error) => console.error('Error fetching Facebook user data:', error));
        }
    };

    handleUserEmail = (e) => {
        this.setState({ userEmail: e.target.value });
    }
    
    handleUserPassword = (e) => {
        this.setState({ userPassword: e.target.value });
    }
    
    handleUserLogin = () => {
        const {userEmail, userPassword} = this.state;
        const user = {
            email: userEmail,
            password: userPassword
        }
        axios({
            method: "POST",
            url: "https://zomato-server-backend.vercel.app/auth/login",
            headers: { "Content-Type": "application/json" },
            data: user
        })
        .then((response) => console.log(response), this.setState({loginModalIsOpen: false}))
        .catch((error) => console.error(error));
    }

    handleLogOut = () => {
        try {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loggedUser');
        } catch (error) {
        console.error('Error removing LocalStorage:', error);
        }
        this.setState({isLoggedIn: false, loggedUser: undefined });
    }

    render() {
        const { bg, logoDisplay, position, justify, zIndex, isLoggedIn, loggedUser } = this.state;

        return (
            <>
                <div className="header-component" style={{ backgroundColor: bg, position: position, justifyContent: justify, zIndex: zIndex }}>
                   <Link to="/" aria-label="Go to homepage"><div className="logo" style={{ display: logoDisplay }}>e!</div></Link>
                    <div className="buttons">
                        {!isLoggedIn 
                        ? 
                            <>
                                <button className="login-btn" onClick={this.handleLogin}>login</button>
                                <button className="create-btn" onClick={this.handleLogin}>create an account</button>
                            </>
                        : 
                            <>
                                <button className="user-name" >{loggedUser}</button>
                                <button className="logout-btn" onClick={this.handleLogOut}>Log out</button>
                            </>
                        }
                    </div>
                </div>
                
                {/* React Modal component */}
                <Modal
                    isOpen={this.state.loginModalIsOpen}
                    onRequestClose={this.handleCloseModal}
                    className="login-modal"
                    overlayClassName="login-modal-overlay"
                    style={{
                        content: {
                            color: 'black',
                            backgroundColor: 'white',
                            padding: '20px',
                            maxWidth: '400px',
                            margin: 'auto',
                            border: '1px solid black',
                            borderRadius: '8px',
                        },
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }
                    }}
                >
                    <div className="modal-container">
                            <div className="modal-header">
                            <div className="modal-login">Login</div>
                            <div><i className="fa fa-close" onClick={this.handleCloseModal}></i></div>
                            </div>
                        <div className="modal-inputs">
                            <input type="text" className="input-field" placeholder="Email" onChange={this.handleUserEmail}/>
                            <input type="text" className="input-field" placeholder="Password" onChange={this.handleUserPassword}/>
                        </div>
                        <div className="login-buttons">
                            <button className="modal-login-btn" onClick={this.handleUserLogin}>Login</button>
                        </div>
                        <hr/>
                        <div className="logins">
                            <FacebookLoginButton
                                onSuccess={this.handleFacebookLoginSuccess}
                                onError={(error) => console.error(error)}
                            />
                            <GoogleLoginButton
                                onSuccess={this.handleLoginSuccess}
                                onError={() => console.log("Google login failed")}
                            />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

export default withRouter(Header);