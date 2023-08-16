import { useEffect, useState } from "react";
import { apiRequest } from "../utils"; // Import your API request function
import { useSelector } from "react-redux";
import {JobCard, Loading } from "../components";

const AppliedJobsPage = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const { user } = useSelector((state) => state.user);
  
    const [page, setPage] = useState(1);
    const [numPage, setNumPage] = useState(1);
    const [recordCount, setRecordCount] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

  const fetchAppliedJobs = async () => {
    setIsFetching(true);
    try {
      const res = await apiRequest({
        url: "/users/applied-jobs", // Replace with your backend route
        token: user?.token,
        method: "GET",
      });

      if (res?.success) {
        setAppliedJobs(res.data);
        setRecordCount(res.data?.length);
      }

      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <div className="px-14 py-8">
        <div className='w-full flex items-center justify-between mb-4'>
            <p className='text-sm md:text-base'>
            Showing: <span className='font-semibold'>{recordCount}</span> Jobs
            Available
            </p>
        </div>

        {isFetching && (
        <div className="py-10">
            <Loading/>
        </div>
        )}
          
        <div className='w-full flex flex-wrap gap-10 mt-10'>
        {appliedJobs?.map((job, index) => {
            const newJob = {
            name: job?.company?.name,
            logo: job?.company?.profileUrl,
            ...job,
            };
            return(
            <JobCard job={newJob} key={index} />
        )})}
        </div>
          

        {/* Pagination */}
        <div className="w-full flex items-center justify-center gap-8">
            {page > 1 && !isFetching && (
              <button
                onClick={() => handleShowMore(-1)}
                className="text-blue-600 mt-8 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600"
              >
                Previous
              </button>
            )}

            {numPage > page && !isFetching && (
              <button
                onClick={() => handleShowMore(1)}
                className="text-blue-600 mt-8 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600"
              >
                Next
              </button>
            )}
          </div>
    </div>
  );
};

export default AppliedJobsPage;
