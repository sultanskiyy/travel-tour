import FilterSearch from '@/components/FilterSearch'
import Searchsweger from '@/components/Searchsweger'
import TourCardsSarch from '@/components/TourCardsSarch'


const page = async() => {

  
  return (
    <div>
      <Searchsweger/>
      <section className=' bg-[#f5f5f5] py-16'>
<div className='max-w-7xl mx-auto px-6 lg:px-8'>
  <div className='flex flex-col lg:flex-row gap-10 items-start'>
<FilterSearch/>
<TourCardsSarch/>
  </div>

</div>
      </section>
    </div>
  )
}

export default page