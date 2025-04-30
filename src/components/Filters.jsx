import React from 'react';

// This component just shows the search input and category dropdown.
// It receives all the data and functions it needs as props from ProductPage.
function Filters(props) {
  // Using props directly here, could also destructure: const { searchTerm, ... } = props;
  const {
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories
  } = props;

  // Handler for the search input changes
  const handleSearchInputChange = (event) => {
    // Call the function passed down from ProductPage to update the state there
    onSearchChange(event.target.value);
  };

  // Handler for the category dropdown changes
  const handleCategorySelectChange = (event) => {
    // Call the function passed down from ProductPage
    onCategoryChange(event.target.value);
  };

  return (
    <div className="filters" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee' }}>
      <h3>Filter Products</h3>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchInputChange}
        style={{ marginRight: '10px', padding: '5px' }}
      />

      <select
        value={selectedCategory}
        onChange={handleCategorySelectChange}
        style={{ padding: '5px' }}
      >
        <option value="">All Categories</option>
        {/* Create an <option> for each category passed in */}
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;