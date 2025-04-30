import React from 'react';

// This component shows a single product card.
// It gets the product details and the function to call when 'Add to Cart' is clicked.
function ProductCard({ productData, onAddToCartClick }) {

  // If for some reason productData isn't passed, don't render anything
  if (!productData) {
    return null;
  }

  // A small helper function specific to this card's button
  const handleButtonClick = () => {
    onAddToCartClick(productData);
  };

  return (
    <div className="product-card" style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
      <img
        src={productData.image}
        alt={productData.title ?? 'Product image'}
        style={{ width: '100%', height: '150px', objectFit: 'contain' }}
      />
      <h3 style={{ fontSize: '1em', height: '3em', overflow: 'hidden' }}>
        {productData.title ?? 'Product Name'}
      </h3>
      <p style={{ fontWeight: 'bold' }}>
        ${productData.price?.toFixed(2) ?? 'N/A'}
      </p>
      <button onClick={handleButtonClick}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;