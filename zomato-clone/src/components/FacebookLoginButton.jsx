import React from 'react';
import FacebookLogin from 'react-facebook-login-lite';

const FacebookLoginButton = ({ onSuccess, onError }) => {
    const handleResponse = (response) => {
        if (response.accessToken) {
            onSuccess(response);
        } else {
            onError && onError("Facebook login failed. No access token.");
        }
    };

    return (
        <FacebookLogin
            appId="27440257842288419"
            autoLoad={false}
            fields="name,email,picture"
            callback={handleResponse}
            cssClass="fb-login custom-fb-button"
            textButton="Continue with Facebook"
            icon="fa-facebook"
        />
    );
};

export default FacebookLoginButton;
