export const productStore = {
  products: [],
  filters: {
    maxPrice: 700,
    category: "all",
    searchText: "",
    sortText: "default",
  },
};

export const setProducts = (data) => {
  productStore.products = data;
};
export const getProducts = () => {
  return [...productStore.products];
};
export const setMaxPrice = (value) => {
  productStore.filters.maxPrice = value;
};

export const setCategory = (category) => {
  productStore.filters.category = category;
};

export const setSearchText = (text) => {
  productStore.filters.searchText = text;
};
export const setSortText = (text) => {
  productStore.filters.sortText = text;
};
