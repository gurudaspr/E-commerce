import { create } from 'zustand';

export const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  isLoading: false,
  error: null,
  filters: {
    categories: [],
    priceRange: [],
    sortBy: [],
    searchQuery: '',
    ratingRange: [], // Add a rating filter
  },

  setProducts: (products) => set({ products, filteredProducts: products }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  setFilter: (filterType, value) => set((state) => ({
    filters: { ...state.filters, [filterType]: value },
  })),

  clearFilters: () => set((state) => ({
    filters: {
      categories: [],
      priceRange: [],
      sortBy: [],
      searchQuery: '',
      ratingRange: [], // Clear rating range on filter clear
    }
  })),

  applyFilters: () => {
    const { products, filters } = get();
    let filtered = [...products];

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        product.category && filters.categories.includes(product.category._id)
      );
    }

    // Apply price range filter
    if (filters.priceRange.length > 0) {
      filtered = filtered.filter(product => {
        const price = product.price;
        return filters.priceRange.some(range => {
          if (range === 'Below 500') return price < 500;
          if (range === '500 to 1000') return price >= 500 && price <= 1000;
          if (range === '1001 to 2000') return price > 1000 && price <= 2000;
          if (range === '2001 to 5000') return price > 2000 && price <= 5000;
          if (range === 'Above 5000') return price > 5000;
          return false;
        });
      });
    }

    // Apply rating range filter
    if (filters.ratingRange.length > 0) {
      filtered = filtered.filter(product => {
        const averageRating = product.averageRating || 0; // Use the averageRating property
        return filters.ratingRange.some(range => {
          if (range === 'Below 3') return averageRating < 3;
          if (range === '3 to 4') return averageRating >= 3 && averageRating < 4;
          if (range === '4 and above') return averageRating >= 4;
          return false;
        });
      });
    }

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    if (filters.sortBy.length > 0) {
      filtered.sort((a, b) => {
        for (const sortOption of filters.sortBy) {
          switch (sortOption) {
            case 'price-low-high':
              return a.price - b.price;
            case 'price-high-low':
              return b.price - a.price;
            case 'newest-first':
              return new Date(b.createdAt) - new Date(a.createdAt);
            case 'best-rating':
              return (b.averageRating || 0) - (a.averageRating || 0); // Sort by average rating
            default:
              return 0;
          }
        }
        return 0;
      });
    }

    set({ filteredProducts: filtered });
  },
}));
