import React from "react";
import Navbar from "./component/navbar";
import Footer from "./component/footer";
import { Outlet } from "react-router-dom";
import UserContextProvider from "./context/userContextProvider";



function Layout() {
    return (
        <UserContextProvider>
            <Navbar />
            <Outlet />
            <Footer />
        </UserContextProvider>
    )
}

export default Layout