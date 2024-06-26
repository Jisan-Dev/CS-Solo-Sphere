/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const { _id, deadline, category, job_title, description, min_price, max_price, bid_count } = job || {};
  return (
    <Link to={`/jobs/${_id}`} className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-xs font-normal text-gray-800 ">Deadline: {new Date(deadline).toLocaleDateString('en-GB')}</span>
        <span className="px-3 py-1 text-[10px] text-blue-800 uppercase bg-blue-200 rounded-full">{category}</span>
      </div>

      <h1 className="mt-2 text-lg font-semibold text-gray-800">{job_title}</h1>
      <p title={description} className="mt-2 text-sm text-gray-600 flex-grow">
        {description.substring(0, 70)}...
      </p>
      <p className="mt-2 text-sm font-bold text-gray-600 ">{`Range: $${min_price} - $${max_price}`}</p>
      <p className="mt-2 text-sm font-bold text-gray-600 ">{`Total bids: ${bid_count ?? 0}`}</p>
    </Link>
  );
};

export default JobCard;
