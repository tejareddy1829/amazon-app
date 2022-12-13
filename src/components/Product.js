import React, {useState, useEffect} from "react";
import Image from "next/image";
import {StarIcon} from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import {useDispatch} from "react-redux";
import {addToBasket} from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({id, title, description, price, category, image}) {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);

  const [hasPrime, setIsPrimeEnabled] = useState(0);

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setIsPrimeEnabled(Math.random() < 0.5);
  }, []);

  const addItemsToBasket = () => {
    const product = {
      id,
      title,
      description,
      price,
      category,
      image,
    };

    dispatch(addToBasket(product));
  };

  return (
    <div className='relative flex flex-col bg-white m-5 z-30 p-10'>
      <p className='absolute top-2 right-2 text-xs italic text-gray-400'>
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit='contain' />

      <h4 className='my-3'>{title}</h4>

      <div className='flex'>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className='h-5 text-yellow-500' key={i} />
          ))}
      </div>

      <p className='text-xs my-2 line-clamp-2'>{description}</p>

      <div className='mb-5'>
        <Currency quantity={price} currency='GBP' />
      </div>

      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img className='w-12' src='http://links.papareact.com/fdw' />
          <p className='text-xs text-gray-500'>Free Next-Day Delivery</p>
        </div>
      )}

      <button onClick={addItemsToBasket} className='mt-auto button'>
        Add To Basket
      </button>
    </div>
  );
}

export default Product;
