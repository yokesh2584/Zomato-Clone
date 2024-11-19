import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess, onError }) => {
    const login = useGoogleLogin({
        onSuccess,
        onError,
    });

    return (
        <button className="google-login" onClick={() => login()}>
            <i className="fa-brands fa-google" aria-hidden="true"></i> continue with google
        </button>
    );
};

export default GoogleLoginButton;
