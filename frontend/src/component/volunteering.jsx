import React, { useContext, useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import Card from "./donateCard";

function Volunteering() {


    const [data, setData] = useState(null)

    async function fetchVolunteerData() {
        try {
            const response = await fetch('http://localhost:8080/volunteer', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const res = await response.json();
            console.log(res);
            setData(res);
            console.log('data');
            // console.log(data);
        } catch (error) {
            console.error('Error fetching volunteer data:', error);
        }
    }
    
    // Call the async function

    useEffect(() => {
        fetchVolunteerData();
    }
    , []);


    return (
        <div className="flex flex-col flex-wrap justify-center items-center md:gap-12 gap-9 mt-12">
            <div className="flex justify-center items-center">
                <h1 className="md:text-5xl  text-3xl font-mono">
                    Volunteering Opportunities
                </h1>
            </div>
            <div>
                <div className=" flex flex-col gap-6 mb-12">
                    {data && data.map((obj,i)=><Card key={i} data={obj}/>)}
                </div>
                
            </div>

        </div>
    )
}

export default Volunteering;