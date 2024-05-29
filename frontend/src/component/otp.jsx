import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from '../context/userContext';

function Otp() {
    const { mail } = useContext(UserContext); // Assuming UserContext provides the email
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8080/verify-account', null, {
                params: {
                    email: mail,
                    otp: otp
                }
            });
            setMessage(response.data);
            setError('');
            console.log(response);
            
        } catch (err) {
            setError('Account already exist with this email. Please try again with different email id.');
            setMessage('');
            console.error('Error submitting the form:', err);
        }
    };

    return (
        <div className="flex justify-center items-center h-auto p-6">
            <div className=" w-full flex flex-col gap-9">
                <div className="flex justify-center items-center">
                    <h1 className="text-4xl footer-title text-slate-800">OTP Verification</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-8">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-xl font-mono">Email Id: </span>
                        </div>
                        <input
                            type="text"
                            name="email"
                            value={mail}
                            readOnly
                            placeholder="eg: johnsmith@mail.com"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-xl font-mono">OTP: </span>
                            <span className="label-text-alt">required</span>
                        </div>
                        <input
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={handleOtpChange}
                            placeholder="Enter your OTP"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>
                    <div className="flex justify-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    {error && <p className="text-red-500 text-2xl">{error}</p>}
                    {message && <p className="text-green-500 text-2xl">{message}</p>}
                </form>
                <div className="flex justify-center flex-wrap items-center gap-4">
                    <div>
                        <Link to="../login">
                            <p className="link link-hover text-blue-600">Go Back To Login Page</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Otp;
