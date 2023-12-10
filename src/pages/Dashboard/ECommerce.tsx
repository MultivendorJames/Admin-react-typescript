import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import { useQuery } from 'react-query';
import { get } from '../../utils/apiClient.ts';
import Loader from '../../common/Loader/index.tsx';

const ECommerce = () => {


   const getStats = () => {
     const res = get("/admin/metrics");
     return res;
   };

   const { data, isLoading, error, isError } = useQuery(
     "stats",
     getStats
   );
   if (isLoading) {
    return <Loader />
   }

   if (isError) {
     console.log("something went wrong");
   }


  return (
    <>
      <div className="mb-5">
        {/* <h3 className='font-semibold text-3xl text-black-2'>Dashboard</h3> */}
      </div>
      <div className="grid mb-10 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne users={data?.users} />
        <CardTwo orders={data?.orders} />
        <CardThree revenue={data?.revenue} />
        <CardFour products={data?.products} />
      </div>
      {/* 
      <div className="mt-4 grid grid-cols-12 md:grid-cols-3 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
      </div> */}
      <div>
        <ChartThree />
      </div>
    </>
  );
};

export default ECommerce;
