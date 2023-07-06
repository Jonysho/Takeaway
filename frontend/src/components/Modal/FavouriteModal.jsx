import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { BsCartPlusFill } from 'react-icons/bs'
import { CgRemove } from 'react-icons/cg'

const FavouriteDetails = ({favourite, closeModal, load, remove}) => {
  const {name, cart, _id} = favourite
  console.log(favourite)
  return (
    <div className='sm:p-6 relative'>
      <div className='sticky top-0 sm:hidden w-full bg-red-600 h-14'>
        <div className='flex items-center h-full justify-center'>
        <button className="mr-6 hover:underline font-extrabold decoration-2" onClick={() => load(_id)}> Load to cart </button>
        <button className='mr-6 hover:underline font-extrabold decoration-2' onClick={() => remove(_id)}> Remove </button>
        <div className='absolute right-0 top-0'>
        <RxCross2 onClick={closeModal} size={35} className='text-yellow-400 cursor-pointer hover:text-yellow-300'/>
        </div>
        </div>
      </div>
      <div className='hidden sm:flex justify-end absolute right-1 top-1'>
        <RxCross2 onClick={closeModal} size={40} className='text-red-600 cursor-pointer hover:text-red-700' title='Close'/>
      </div>
      <h1 className='mb-2 font-bold text-xl'>{name}</h1>
      <div className='p-4'>
        {cart.map((item, index) => (
          <div key={index} className='flex mb-4 bg-white shadow-xl rounded-md text-sm sm:text-base'>
            <div className='w-20 h-20 sm:h-24 sm:w-24'>
              <img src={`https://storage.googleapis.com/item-images-bucket/${item.image}`}
                alt={item.name} className="w-full h-full object-cover rounded-l-md"/>
            </div>
            <div className='p-2 sm:p-3 flex flex-col justify-between w-full'>
              <h1 className='font-semibold text-gray-700 text-sm sm:text-lg'>{item.name}</h1>
              <div>
              {item.portions.map((p, index) => (
                <div key={index} className='flex justify-between'>
                  <div className='flex'>
                    <p>{p.size}</p>
                    <p className='ml-1'>({p.quantity})</p>
                  </div>
                  <div>£{p.price.toFixed(2)}</div>
                </div>
              ))}
              </div>
            </div>
          </div>
        ))}
        <div className='mt-8 w-full hidden sm:flex items-center justify-around'>
          <div className='flex items-center cursor-pointer hover:text-red-600 duration-200' onClick={() => remove(_id)}>
            <CgRemove className='mr-3 cursor-pointer ' title="Delete Favourite cart" size={40}/> 
            <p className='font-bold text-lg cursor-pointer'>Remove</p>
          </div>
          <div className='flex items-center text-center cursor-pointer hover:text-green-600 duration-200' onClick={() => load(_id)}>
            <BsCartPlusFill className='mr-3 cursor-pointer ' title="Load to cart" size={40}/>
            <p className='font-bold text-lg cursor-pointer '>Load to Cart</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FavouriteDetails
