import FilterAttribute from '../components/FilterAttribute'
import Product from '../components/Product'
import Search from '../components/Search'
import Categories from '../components/Categories'

const Filter = () => {

  return (
    <div className="mx-auto p-4 flex flex-col gap-3 items-center w-full">
      <div className='flex gap-3 w-full'>
        <Categories/>
        <Search/>
      </div>
      <div className='w-full flex gap-10 mt-5'>
        <div className="w-1/4">
          <FilterAttribute/>
        </div>
        <div className="w-3/4 bg-white">
          <Product/>
        </div>
      </div>
    </div>
  )
}

export default Filter