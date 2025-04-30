# React Frontend Interview Exercise - Solution

This project contains the solutions for the medium-level React frontend interview exercise, covering code review/optimization (Task A) and feature implementation (Task B).

## Overview

The project addresses two distinct tasks:

1.  **Task A: Code Review & Optimization (`src/ProductPage.jsx`)**
    *   Reviewed the provided `ProductPage.jsx` component.
    *   Identified and documented performance and structural issues in `optimization-review.md`.
    *   Refactored the component by splitting it into smaller, focused components (located in `src/components/`).
    *   Applied React optimization techniques, primarily `useMemo` for derived state/calculations (filtered products, cart total, categories) and `useCallback` for stable event handlers (`addToCart`, `removeFromCart`).

2.  **Task B: Dashboard Implementation (`src/Dashboard.jsx`)**
    *   Implemented a data dashboard component from the starter file.
    *   **Features Implemented:**
        *   Fetches data from the provided mock API.
        *   Implements filtering by date range and category.
        *   Includes `localStorage` caching for fetched data (simple implementation).
        *   Displays a line chart (`recharts`) showing data trends.
        *   Displays a filterable data table.
        *   Displays a summary statistics panel.
        *   Handles loading and error states appropriately during data fetching.
        *   Utilizes the provided `Dashboard.css` for styling and basic responsiveness.

## Key Files & Structure

*   `optimization-review.md`: Detailed review and optimization notes for Task A.
*   `src/ProductPage.jsx`: The refactored container component for the product listing page (Task A).
*   `src/components/`: Contains the smaller UI components extracted from `ProductPage.jsx` (e.g., `ProductCard`, `Filters`, `CartView`).
*   `src/ProductPage.css`: Basic CSS added for the Task A components.
*   `src/Dashboard.jsx`: The implementation of the data dashboard component (Task B).
*   `src/Dashboard.css`: CSS file provided and used for styling the Dashboard (Task B), with minor additions for polish.
*   `src/index.css`: Minimal global CSS styles.
*   `src/App.jsx`: The main application component, currently configured to render the `Dashboard` component by default.

## Running the Project

**Prerequisites:**
*   Node.js (v16 or later recommended)
*   npm (or yarn / pnpm)

**Installation:**

1.  Navigate to the project's root directory in your terminal.
2.  Install the necessary dependencies:
    ```bash
    npm install
    ```
    *(Use `yarn install` or `pnpm install` if you prefer those package managers)*

**Development Server:**

1.  Start the Vite development server:
    ```bash
    npm run dev
    ```
    *(Use `yarn dev` or `pnpm dev` if applicable)*

2.  Open your web browser and go to the local URL provided (usually `http://localhost:5173`).

**Viewing Components:**

*   By default, `src/App.jsx` renders the `<Dashboard />` component (Task B).
*   To view the `<ProductPage />` component (Task A), you will need to modify `src/App.jsx` to render `<ProductPage />` instead of `<Dashboard />`.