import React from "react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import CustomButton from "./CustomButton";
import { popularSearchJobs, popularSearchCompanies } from "../utils/data";

const SearchInput = ({ placeholder, icon, value, setValue, styles }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const clearInput = () => setValue("");

  return (
    <div className={`flex w-full md:w-1/3 items-center ${styles}`}>
      {icon}

      <input
        value={value}
        onChange={(e) => handleChange(e)}
        type="text"
        className="w-full md:w-64 p-2 outline-none bg-transparent text-base"
        placeholder={placeholder}
      />

      <AiOutlineCloseCircle
        className="hidden md:flex text-gray-600 text-xl cursor-pointer"
        onClick={clearInput}
      />
    </div>
  );
};

const Header = ({
  title,
  type,
  handleClick,
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
}) => {
  return (
    <div>
      <div className="bg-[#1d4fd862] px-5">
        <div
          className={`container mx-auto ${
            type ? "h-[250px]" : "h-[250px]"
          } flex items-center relative`}
        >
          <div className="w-full z-10">
            <div className="mb-8 px-8">
              <p className="text-black font-bold text-3xl">{title}</p>
            </div>

            <div className="w-full flex items-center justify-around bg-white px-2 md:px-5 py-2.5 md:py-6 shadow-2xl rounded-full">
              <SearchInput
                placeholder={
                  type === "home"
                    ? "Job Title or Keywords"
                    : "Company Title or Keywords"
                }
                icon={<AiOutlineSearch className="text-gray-600 text-xl" />}
                value={searchQuery}
                setValue={setSearchQuery}
              />
              <SearchInput
                placeholder="Add Country or City"
                icon={<CiLocationOn className="text-gray-600 text-xl" />}
                value={location}
                setValue={setLocation}
                styles={"hidden md:flex"}
              />

              <div>
                <CustomButton
                  onClick={handleClick}
                  title="Search"
                  containerStyles={
                    "text-white py-2 md:py3 px-3 md:px-10 focus:outline-none bg-blue-600 rounded-full md:rounded-md text-sm md:text-base"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        {type === "home" && (
          <div className="w-full lg:1/2 flex flex-wrap gap-3 md:gap-6 px-8 py-10">
            {popularSearchJobs.map((search, index) => (
              <span
                key={index}
                className="bg-white text-black py-1 px-2 text-sm md:text-base border-gray-300 border-2 rounded-lg"
              >
                {search}
              </span>
            ))}
          </div>
        )}

        {type === "company" && (
          <div className="w-full lg:1/2 flex flex-wrap gap-3 md:gap-6 px-8 py-10">
            {popularSearchCompanies.map((search, index) => (
              <span
                key={index}
                className="bg-white text-black py-1 px-2 text-sm md:text-base border-gray-300 border-2 rounded-lg"
              >
                {search}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
