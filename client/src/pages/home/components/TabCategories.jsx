/* eslint-disable react/prop-types */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';

const TabCategories = ({ jobs }) => {
  return (
    <div className="my-10 container px-4 mx-auto">
      <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">Browse Jobs By Categories</h1>

      <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
        Three categories available for the time being. They are Web Development, Graphics Design and Digital Marketing. Browse them by clicking on the tabs below.
      </p>
      <Tabs>
        <div className="text-center w-[calc(100%-180px)] mx-auto">
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs
              .filter((job) => job.category === 'Web Development')
              .map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs
              .filter((job) => job.category === 'Graphic Design')
              .map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs
              .filter((job) => job.category === 'Digital Marketing')
              .map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TabCategories;
