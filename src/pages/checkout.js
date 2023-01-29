import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import {useSelector} from "react-redux";
import {selectItems, selectTotal} from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import {useSession} from "next-auth/client";
import {loadStripe} from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);

function checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();

  const createCheckoutSession = async () => {
    try {
      const stripe = await stripePromise;

      const checkoutSession = await axios.post("/api/create-checkout-session", {
        items: items,
        email: session.user.email,
      });

      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (e) {
      console.log("Checkout error", e);
    }
  };

  return (
    <div className='bg-gray-100'>
      <Header />
      <main className='lg:flex max-w-screen-2xl mx-auto'>
        {/* left */}
        <div className='flex-grow m-5 shadow-sm'>
          <Image
            src='http://links.papareact.com/ikj'
            width={1020}
            height={250}
            objectFit='contain'
          />
          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0
                ? "Your Amazon Basket is Empty"
                : "Shopping Basket"}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                category={item.category}
                image={item.image}
                rating={item.rating}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>

        {/* right */}
        <div className='flex flex-col bg-white p-10 shadow-md'>
          {items.length > 0 && (
            <>
              <h2 className='whitespace-nowrap'>
                Subtotal ({items.length} items) :
                <span className='font-bold ml-2'>
                  {<Currency quantity={total} currency='GBP' />}
                </span>
              </h2>

              <button
                role='link'
                onClick={createCheckoutSession}
                disabled={!session}
                className={` button mt-2  ${!session && "sessionButton"} `}>
                {!session ? "sign in to checkout" : "proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default checkout;
