import React, { useState,useContext } from "react";
import axios from "axios";
import UserContext from "../context/userContext";
import { NavLink } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        maneesh(); 
    }


    
   const  { setUser } = useContext(UserContext);



    const maneesh = async () => {
        await axios.post('http://localhost:8080/login', formData)
        .then(res => {
            console.log("Hello")
            setUser(res.data)
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.response);
            setErrorMessage("Incorrect Password")
        })
    }

    return (
        <div className="flex justify-center items-center h-[70vh]">
            <div className="h-4/5 w-full flex flex-col gap-9">
                <div className="flex justify-center items-center">
                    <h1 className="text-4xl footer-title text-slate-800">Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-center items-center gap-8">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text text-xl font-mono">Username/Email Id: </span>
                                <span className="label-text-alt">required</span>
                            </div>
                            <input type="text" name="email" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={handleInputChange} />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text text-xl font-mono">Password: </span>
                                <span className="label-text-alt">required</span>
                            </div>
                            <input type="password" name="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={handleInputChange} />
                        </label>
                    </div>
                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    <div className="flex justify-center mt-8">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
                <div className="flex justify-center flex-wrap items-center gap-10">
                    <div className="">
                        <NavLink to="/ForgotPassword">
                            <p className="link link-hover text-blue-600">Forgot Password?</p>
                        </NavLink>
                    </div>
                    <div className="">
                        <NavLink to="/register" >
                        <p className="link link-hover text-blue-600">New User?</p>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
