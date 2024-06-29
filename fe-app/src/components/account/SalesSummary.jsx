import React from 'react'

const SalesSummary = () => {
  return (
    <section className='text-center m-10'>
      <h1 className='text-3xl'>Sales Summary</h1>
      <div className='flex flex-wrap w-160 m-auto items-center justify-around'>
        <div className='flex justify-center items-center border border-black flex-col w-72 h-56 bg-pink-400 mt-10'>
          <h1 className='text-3xl'>Daily sales</h1>
          <h1 className='text-3xl mt-5'>$0</h1>
        </div>

        <div className='flex justify-center items-center border border-black flex-col w-72 h-56 bg-pink-400 mt-10'>
          <h1 className='text-3xl'>Monthly sales</h1>
          <h1 className='text-3xl mt-5'>$0</h1>
        </div>

        <div className='flex justify-center items-center border border-black flex-col w-72 h-56 bg-pink-400 mt-10'>
          <h1 className='text-3xl'>Yearly sales</h1>
          <h1 className='text-3xl mt-5'>$0</h1>
        </div>

        <div className='flex justify-center items-center border border-black flex-col w-72 h-56 bg-pink-400 mt-10'>
          <h1 className='text-3xl'>All time sales</h1>
          <h1 className='text-3xl mt-5'>$0</h1>
        </div>
      </div>
    </section>
  )
}

export default SalesSummary
