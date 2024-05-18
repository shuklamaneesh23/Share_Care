import { useContext, useState } from "react";
import { NavLink, useNavigate} from 'react-router-dom'; // Assuming you're using React Router
import UserContext from "../context/userContext";

export default function Card({ data }) {
    const { user } = useContext(UserContext);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleAcceptClick = () => {
        setIsDialogOpen(true);
    };

    const handleConfirm = () => {
        setIsDialogOpen(false);
        // Redirect to home page after a short delay
        setTimeout(() => {
            navigate('/');
        }, 500);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <div className="card w-[90vw] bg-primary text-primary-content">
                <div className="card-body">
                    <div className="flex justify-between">
                        <div className="flex flex-row ">
                            <h2 className="card-title text-3xl">{data.donationId}.</h2>
                            <h2 className="card-title text-3xl">{data.name}</h2>
                        </div>
                        <div className="flex gap-3">
                            <h2 className="card-title text-3xl">{data.sourceType} </h2>
                            <h2 className="card-title text-3xl"> | </h2>
                            <h2 className="card-title text-3xl">{data.foodType} </h2>
                            <h2 className="card-title text-3xl">| </h2>
                            <h2 className="card-title text-3xl">{data.foodTime} </h2>
                        </div>
                    </div>
                    <div className="flex justify-end ">
                        <p className="text-2xl">{data.address}</p>
                        <p className="text-2xl">Number of serving: {data.quantity}</p>
                    </div>
                    <p className="text-1xl">{data.email}</p>
                    <p className="text-1xl">{data.phoneno}</p>
                    <p className="text-1xl">Date: {data.date}</p>
                    <p className="text-1xl">Time: {data.time}</p>
                    <div className="card-actions justify-end">
                        {user ? (
                            <>
                            <button className="btn" onClick={handleAcceptClick}>Accept</button>
                            
                            <button className="btn btn-secondary">Chat</button>
                            </>
                        ) : (
                            <>
                            <button disabled className="btn">Accept</button>

                            <button disabled className="btn btn-secondary">Chat</button>
                            </>
                        )}
                        
                    </div>
                </div>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-2xl mb-4">Confirmation</h2>
                        <p className="mb-4">Are you sure you want to accept this donation?</p>
                        <div className="flex justify-end gap-4">
                            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleConfirm}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
