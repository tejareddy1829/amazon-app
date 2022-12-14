import React from "react";
import Image from "next/image";
import {StarIcon} from "@heroicons/react/solid";
import Currency from "react-currency-formatter";

function CheckoutProduct({
  id,
  title,
  description,
  price,
  category,
  image,
  rating,
  hasPrime,
}) {
  return (
    <div className='grid grid-cols-5'>
      <Image src={image} height={200} width={200} objectFit='contain' />

      <div className='col-span-3 mx-5'>
        <p>{title}</p>
        <div className='flex'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className='h-5 text-yellow-500' />
            ))}
        </div>
        <p className='text-xs my-2 line-clamp-3'>{description}</p>
        <Currency quantity={price} currency='GBP' />

        {hasPrime && (
          <div className='flex items-center space-x-2'>
            <img
              loading='lazy'
              className='w-12'
              src='http://links.papareact.com/fdw'
            />
            <p className='text-xs text-gray-500'>Free Next-Day Delivery</p>
          </div>
        )}
      </div>
      <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        <button className='button'>Add To Basket</button>
        <button className='button'>Remove From Basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
