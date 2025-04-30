import React, { useState, useEffect, useMemo, useCallback } from 'react';

import Filters from './components/Filters';
import ProductList from './components/ProductList';
import CartView from './components/CartView';
import './ProductPage.css';

// This is our main component for the Product Listing feature.
// It's responsible for fetching data and managing the overall state.
function ProductPage() {
  // === State ===
  // useState hooks to store data that changes over time

  // Holds the original list of products fetched from the API
  const [products, setProducts] = useState([]);
  // Holds the items currently in the shopping cart
  const [cart, setCart] = useState([]);

  // Holds the current value of the search input field
  const [searchTerm, setSearchTerm] = useState('');
  // Holds the currently selected category from the dropdown
  const [selectedCategory, setSelectedCategory] = useState(''); // Empty string means "All"

  // Tracks if we are currently fetching data from the API
  const [isLoading, setIsLoading] = useState(false);
  // Stores any error message if fetching fails
  const [error, setError] = useState(null);

  // === Data Fetching ===
  // useEffect runs after the component renders.
  // The empty array [] at the end means it only runs ONCE when the component first mounts.
  useEffect(() => {
    console.log('Attempting to fetch products...');
    setIsLoading(true);
    setError(null);

    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Products fetched successfully:', data);
        setProducts(data);
        setIsLoading(false); 
      })
      .catch(err => {
        // ERROR! Something went wrong during fetch.
        console.error('Failed to fetch products:', err);
        setError('Sorry, could not load products. Please try again later.'); // Set error message
        setIsLoading(false); // Hide loading message
      });
  }, []); // Empty dependency array means run only on mount

  // === Memoized Calculations (for performance) ===
  // useMemo "remembers" the result of a calculation. It only recalculates
  // if one of the things in its dependency array (e.g., [products]) changes.

  // Calculate the list of unique categories from the products
  const categories = useMemo(() => {
    console.log('Calculating categories...');
    // Create a Set from the categories to automatically get unique values
    const uniqueCategories = new Set(products.map(p => p.category));
    // Convert the Set back to an array
    return [...uniqueCategories];
  }, [products]); // Only recalculate if the 'products' array changes

  // Calculate the list of products to display based on filters
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    let result = products; // Start with all products

    // Apply category filter if a category is selected
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply search term filter if there's a search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase(); // Ignore case
      result = result.filter(product =>
        product.title.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return result;
  }, [products, selectedCategory, searchTerm]); 

  // Calculate the total price of items in the cart
  const cartTotal = useMemo(() => {
    console.log('Calculating cart total...');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return total.toFixed(2); // Format to 2 decimal places
  }, [cart]); // Only recalculate if the 'cart' array changes

  // === Callback Functions (for performance and stability) ===
  // useCallback "remembers" the function itself. This is useful when passing functions
  // down to child components, so the child doesn't re-render unnecessarily just because
  // the parent re-rendered and created a "new" function instance.

  // Function to add a product to the cart
  const handleAddToCart = useCallback((productToAdd) => {
    console.log('Adding to cart:', productToAdd.title);
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item 
        );
      } else {
        return [...currentCart, { ...productToAdd, quantity: 1 }]; 
      }
    });
  }, []); 
  // Function to remove an item from the cart by its ID
  const handleRemoveFromCart = useCallback((productIdToRemove) => {
    console.log('Removing from cart, ID:', productIdToRemove);
    // Use functional updae form again for safety and stability
    setCart(currentCart =>
      currentCart.filter(item => item.id !== productIdToRemove) 
    );
  }, []); 

  // === Rendering the UI ===
  return (
    <div className="product-page">
      <h1>Our Awesome Products</h1>

      {/* Pass filter state and handlers down to the Filters component */}
      <Filters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory} 
        categories={categories}
      />

      {/* Show loading or error messages if applicable */}
      {isLoading && <p>Loading products, hang tight!</p>}
      {error && <p className="error">{error}</p>}

      {/* Show Product List only if not loading and no error */}
      {!isLoading && !error && (
        <ProductList
          products={filteredProducts}
          onAddToCart={handleAddToCart} // Pass the memoized add function
        />
      )}

      {/* Show the Cart View */}
      <CartView
        cartItems={cart} 
        total={cartTotal} 
        onRemoveFromCart={handleRemoveFromCart} // Pass the memoized remove function
      />
    </div>
  );
}

export default ProductPage;