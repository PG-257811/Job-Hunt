import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CompanyCard, CustomButton, Header, ListBox, Loading } from "../components";
import { apiRequest, updateURL } from "../utils";

const Companies = () => {
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordsCount, setRecordsCount] = useState(0);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cmpLocation, setCmpLocation] = useState("");
  const [sort, setSort] = useState("Newest");
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    setIsFetching(true);

    const newURL = updateURL({
      pageNum: page,
      query: searchQuery,
      cmpLoc: cmpLocation,
      sort: sort,
      navigate: navigate,
      location: location,
    });

    try {
      const res = await apiRequest({
        url: newURL,
        method: "GET",
      });

      setNumPage(res?.numOfPage);
      setRecordsCount(res?.total);
      setData(res?.data);

      setIsFetching(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault()

    await fetchCompanies();
  };

  const handleShowMore = (increment) => {
    if (page + increment > 0 && page + increment <= numPage) {
      setPage((prevPage) => prevPage + increment);
      setIsFetching(true); // Assuming you're using this state to manage fetching
      // Perform your data fetching here
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page, sort]);

  return (
    <div className="w-full">
      <Header
        title="Find Your Dream Company"
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={cmpLocation}
        setLocation={setCmpLocation}
        type='company'
      />

      <div className="container mx-auto flex flex-col gap-5 2xl:gap-10 px-8 py-6">
        <div className="flex items-center justify-between mb-4 px-8">
          <p className="text-sm md:text-base">
            Showing: <span className='font-semibold'>{recordsCount}</span> Companies
            Available
          </p>

          <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center">
            <p className="text-sm md:text-base">Sort By:</p>

            <ListBox sort={sort} setSort={setSort} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 px-8">
          {data?.map((cmp, index) => (
            <CompanyCard cmp={cmp} key={index} />
          ))}

          <p className="text-sm text-right font-semibold">
            {data?.length} records out of {recordsCount}
          </p>
          
          {isFetching && (
            <div className="mt-10">
              <Loading />
            </div>
          )}

        </div>

        {/* Pagination */}
        <div className="w-full flex items-center justify-center gap-8">
        {page > 1 && !isFetching && (
          <button
            onClick={() => handleShowMore(-1)}
            className="text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600"
          >
            Previous
          </button>
        )}

        {numPage > page && !isFetching && (
          <button
            onClick={() => handleShowMore(1)}
            className="text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600"
          >
            Next
          </button>
        )}
      </div>


      </div>
    </div>
  );
};

export default Companies;
