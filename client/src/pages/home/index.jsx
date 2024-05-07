import { useLoaderData } from 'react-router-dom';
import Carousel from './components/Carousel';
import TabCategories from './components/TabCategories';

const Home = () => {
  const jobs = useLoaderData();
  console.log(jobs);
  return (
    <>
      <Carousel />
      <TabCategories jobs={jobs} />
    </>
  );
};

export default Home;
