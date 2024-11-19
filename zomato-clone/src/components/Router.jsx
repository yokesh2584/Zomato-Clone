import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Home from "./Home";
import Filter from "./Filter";
import Details from "./Details";
import Header from "./Header";

function Router(){

    return(
        <>
            <GoogleOAuthProvider clientId="592390835857-b2g1bifv0jrh4st5cnvvdsq7b9m1gvfi.apps.googleusercontent.com">
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Header />} />
                    <Route exact path="/" element={<Home />} />
                    <Route path="/filter" element={<Filter />} />
                    <Route path="/details" element={<Details />} />
                </Routes>
            </BrowserRouter>
            </GoogleOAuthProvider>
        </>
    )
}

export default Router;