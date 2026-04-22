export const getCategories = (products) => {
  const categoryList = products.map((p) => p.category);
  return ["all", ...new Set(categoryList)];
};

export const filteredProducts = (products, filters) => {
  const { searchText, category, maxPrice } = filters;
  return products.filter(
    (p) =>
      (!searchText ||
        p.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1) &&
      (category === "all" || p.category === category) &&
      p.price < maxPrice,
  );
};

export const sortedProducts = (products, sortText) => {
  return products.sort((a, b) => {
    let key = sortText.split("-")[0];
    let order = sortText.split("-")[1];
    if (key === "title") return a[key].localeCompare(b[key]);
    if (key === "rating" && a[key]["rate"] !== b[key]["rate"])
      return b[key]["rate"] - a[key]["rate"];
    if (key !== "rating" && a[key] !== b[key]) {
      if (order === "desc") {
        return b[key] - a[key];
      } else {
        return a[key] - b[key];
      }
    }
  });
};

export function getVisibleProducts(products, filters) {
  products = filteredProducts(products, {
    searchText: filters.searchText,
    category: filters.category,
    maxPrice: filters.maxPrice,
  });
  products = sortedProducts(products, filters.sortText);

  return products;
}

export function renderStars(rate) {
  const full = Math.floor(rate);
  const half = rate - full >= 0.9 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + "☆".repeat(empty);
}
