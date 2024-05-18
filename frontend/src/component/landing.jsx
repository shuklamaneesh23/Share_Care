import React from "react";
import Search from "./search";
import Feeders from "./feeders";
import Volunteers from "./volunteer";
import Services from "./services";
import Foot from "./upperfoot";
import Values from "./ourValues";
import SignUp from "./signUp";


function Landing() {
    return (
        <>
            <Search />
            <Feeders />
            <Volunteers />
            <Services />
            
            
            <Foot />
        </>
    )
}

export default Landing;