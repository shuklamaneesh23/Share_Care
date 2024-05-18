import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom"
import UserContext from "../context/userContext";
function Navbar() {
    const {user} = useContext(UserContext);
    
    return (
        <>
            <nav className="w-full p-4 md:pl-8 md:pr-8 h-auto flex flex-wrap justify-between border-b-8  mb-4  bg-slate-500 sticky top-0 z-50">
                <div className="">
                    <NavLink
                        to="">
                        <h2 className="hover:cursor-pointer text-5xl md:ml-8 font-mono font-bold">Share&Care</h2>
                    </NavLink>
                </div>
                <div className="flex md:gap-9">

                    <div>
                        <NavLink
                            to="donate">
                            <button className="btn btn-primary btn-md btn-outline">Donate</button>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            to="volunteers">
                            <button className="btn btn-primary btn-md btn-outline">Volunteer</button>
                        </NavLink>
                    </div>
                    {user ? <div>
                        <NavLink
                            to="profile">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                        </NavLink>
                    </div> 
                    : 
                    <Link to={"/login"} className="flex justify-center">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </Link>
                    }

                </div>
            </nav>
        </>
    )
}

export default Navbar;