import React from "react";
import { Link } from "react-router-dom";
import { AboutImg } from "../assets";

const About = () => {
  return (
   <section className="bg-gradient-to-b from-white via-blue-100 to-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          <span className="font-serif">Welcome to</span> <span className="font-serif text-blue-600">JobHunt</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="md:pr-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">For Job Seekers</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our website offers a comprehensive database of job listings across various industries and locations. Create personalized profiles, upload your resume, and apply for jobs with just a few clicks. We make it easy for you to land your dream job.
            </p>
          </div>
          <div className="md:pl-12 relative overflow-hidden transform transition-transform duration-300 hover:scale-110">
            <img
              src={AboutImg}
              alt="Job Seeker Image"
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          <div className="md:pr-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">For Recruiters</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Post job openings, review applications, and manage the hiring process efficiently, all within our platform. Our app provides the tools you need to find and hire the best talent for your organization.
            </p>
          </div>
          <div className="md:pl-12">
            <div className="text-center md:text-left">
              <p className="text-gray-600">
                Ready to take the next step in your career journey?
              </p>
              <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-full font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400">
                <Link to='/'>
                  Get Started
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
