import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ onSuccess }) => {
    const handleResponse = (response) => {
        if (response.accessToken) {
            onSuccess(response);
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
        />
    );
};

export default FacebookLoginButton;
