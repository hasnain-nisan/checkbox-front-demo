import React from 'react'
import Search from '../components/Search'
import Categories from '../components/Categories'

const Home = () => {
  return (
    <div className="mx-auto p-4 flex gap-3 items-center w-full">
        <Categories/>
        <Search/>
    </div>
  )
}

export default Home