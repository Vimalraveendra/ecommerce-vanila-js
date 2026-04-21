export const getCategories = (products) => {
  const categoryList = products.map((p) => {
    if (p.category === "men's clothing") return "men";
    if (p.category === "women's clothing") return "women";
    return p.category;
  });

  return ["all", ...new Set(categoryList)];
};

export const filteredProducts = (products, filters) => {
  const { searchText, category, maxPrice } = filters;
  let categoryType = category;
  if (category === "men") categoryType = "men's clothing";
  if (category === "women") categoryType = "women's clothing";
  return products.filter(
    (p) =>
      (!searchText ||
        p.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1) &&
      (categoryType === "all" || p.category === categoryType) &&
      (!maxPrice || p.price < maxPrice),
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
