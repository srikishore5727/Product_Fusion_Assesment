import React from 'react';
import ProductCard from './ProductCard';

// This component just displays the list of products.
// It receives the list of products to show and the 'addToCart' function.
function ProductList({ products, onAddToCart }) {

  // If the products array is empty, show a message
  if (!products || products.length === 0) {
    return <p>No products match your search. Try changing the filters!</p>;
  }

  // Otherwise, render the grid of product cards
  return (
    <div className="product-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          productData={product}
          onAddToCartClick={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;