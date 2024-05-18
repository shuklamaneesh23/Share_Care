import React from "react"

function MemberCard({ add, username,post}) {

  return (
   
      <div className="relative h-[400px] w-[300px] rounded-md cursor-pointer hover:scale-125 duration-1000 ease-in-out delay- hover:m-8">
        <img
          src={add}
          alt="AirMax Pro"
          className="z-0 h-full w-full rounded-md object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-left">
          <h1 className="text-4xl font-semibold text-blue-500">{username}</h1>
          <p className="text-2xl font-medium text-white">{post}</p>

        </div>
      </div>
   
  )
}

export default MemberCard