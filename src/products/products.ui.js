import { getCategories } from "./products.service";

export function renderProductCard(product, inCart) {
  return `
          <div class="product-card">
            <div class="product-card__img">
                  <img src="${product.image}" alt="${product.title}">
              </div>
                <div class="product-card__info">
                    <div class="product-card__title" title="${product.title}">${product.title}</div>
                    <div class="product-card__category">${product.category} </div>
                    <div class="product-card__meta">${"★".repeat(Math.round(product.rating.rate))} 
                    <span class="product-card__meta-text">${product.rating.rate}</span></div>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-btn ${inCart ? "added" : ""}"  data-id="${product.id}">
                   ${inCart ? `In cart (${inCart.qty})` : "Add to cart"}
                 </button>
                </div>
            </div>
          </div>`;
}

export function renderProducts(products, container) {
  container.innerHTML = products
    .map((product) => {
      const inCart = inCartItem(product.id);
      return renderProductCard(product, inCart);
    })
    .join("");
}

export function renderCategory(products, container, category) {
  const categories = getCategories(products);
  const html = categories
    .map(
      (cate) =>
        `<li class=category-list__item >
                     <button class="btn category-list__btn ${cate === category ? "btn--active" : ""}"
                      data-category="${cate}">${cate}</button>
                     </li>
                `,
    )
    .join("");
  container.innerHTML = `<ul class="category-list">${html}</ul>`;
}

export function renderSidebar(products, category) {
  const container = document.getElementById("categoryFilters");
  renderCategory(products, container, category);
}
