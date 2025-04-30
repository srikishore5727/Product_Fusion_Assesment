import React from 'react';

// This component shows a single item within the shopping cart.
// It receives the item details and the function to call when 'Remove' is clicked.
function CartItem({ itemData, onRemoveClick }) {

  if (!itemData) return null;

  // Helper function for this item's remove button
  const handleRemoveButtonClick = () => {
    onRemoveClick(itemData.id);
  };

  // Calculate the price for this item line (price * quantity)
  const itemLineTotal = (itemData.price * itemData.quantity).toFixed(2);

  return (
    <div className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px dashed #eee' }}>
      <span>{itemData.title} x {itemData.quantity}</span>
      <span>${itemLineTotal}</span>
      <button onClick={handleRemoveButtonClick} style={{ marginLeft: '10px' }}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;