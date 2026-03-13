<<<<<<< HEAD
import Container from "@/components/Container";

const SearchPage = () => {
  return (
    <div className="bg-white">
      <Container className="px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
        <p className="text-gray-600 mt-2">Search results will appear here...</p>
      </Container>
    </div>
  );
=======

import FilterSearch from '@/components/FilterSearch'
import Searchsweger from '@/components/Searchsweger'
import TourCardsSarch from '@/components/TourCardsSarch'

type PageProps = {
  searchParams: Promise<{
    destination?: string;
    date?: string;
    typology?: string | string[];
    duration?: string | string[];
    difficulty?: string | string[];
    minAge?: string | string[];
    maxPrice?: string;
    onlyPromo?: string;
  }>;
};

const page = async ({ searchParams }: PageProps) => {  


  return (
    <div>
      <Searchsweger/>
      <section className=' bg-[#f5f5f5] py-16'>
<div className='max-w-7xl mx-auto px-6 lg:px-8'>
  <div className='flex flex-col lg:flex-row gap-10 items-start'>
            <FilterSearch />
            <TourCardsSarch searchParams={searchParams} />
  </div>
        
</div>
      </section>
    </div>
  )
>>>>>>> ffb59e609affc476c2fe8d3f20e9af6ac3969308
}

export default SearchPage;