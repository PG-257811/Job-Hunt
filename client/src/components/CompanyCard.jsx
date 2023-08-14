import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ cmp }) => {
  return (
    <div className='w-full h-16 flex gap-4 items-center justify-between bg-white  border-gray-300 border rounded-lg overflow-hidden hover:bg-[#EDEFEF] hover:scale-105 ease-in-out duration-300'>
      <div className='w-3/4 md:w-2/4 flex gap-4 items-center p-2'>
        <Link to={`/company-profile/${cmp?._id}`}>
          <img
            src={cmp?.profileUrl}
            alt={cmp?.name}
            className='w-8 md:w-16 h-8 md:h-12 rounded md:px-2'
          />
        </Link>
        <div className='h-full flex flex-col'>
          <Link
            to={`/company-profile/${cmp?._id}`}
            className='text-base md:text-lg font-bold text-gray-600 truncate'
          >
            {cmp?.name}
          </Link>
          <span className='text-sm text-gray-600'>{cmp?.email}</span>
        </div>
      </div>

      <div className='hidden w-1/4 h-full md:flex items-center'>
        <p className='text-base text-start'>{cmp?.location}</p>
      </div>

      <div className='w-1/4 h-full flex flex-col items-center md:py-3'>
        <p className='text-black font-semibold'>{cmp?.jobPosts?.length}</p>
        <span className='text-xs md:base font-normal text-gray-600'>
          Jobs Posted
        </span>
      </div>
    </div>
  );
};

export default CompanyCard;
