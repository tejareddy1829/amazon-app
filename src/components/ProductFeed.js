import React from "react";
import Product from "./Product";

function ProductFeed({products}) {
  return (
    <div>
      <h1>Product...</h1>
      {products.map(({id, title, description, price, category, image}) => (
        <Product
          key={id}
          id={id}
          title={title}
          description={description}
          price={price}
          category={category}
          image={image}
        />
      ))}
    </div>
  );
}

export default ProductFeed;
