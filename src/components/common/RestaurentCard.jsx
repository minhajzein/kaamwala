import React from 'react';
import { MdPhone, MdLocationOn, MdEmail } from 'react-icons/md';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white p-6 rounded-md border shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold mb-2">{restaurant.name}</div>
        <div className="text-gray-600 mb-4">Owned by: {restaurant.owner}</div>
        <div className="flex flex-col items-start w-full space-y-2">
          <div className="flex items-center gap-2">
            <MdPhone className="text-xl text-blue-500" />
            <span>{restaurant.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-xl text-red-500" />
            <span>{restaurant.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail className="text-xl text-green-500" />
            <span>{restaurant.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
