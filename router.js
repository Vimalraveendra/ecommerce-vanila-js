export function router() {
  const path = window.location.hash.slice(1) || "/";
  const id = path.startsWith("/products/") && path.split("/")[2];

  const routes = [
    {
      match: (match) => path === "/",
      view: () => ProductsPage(),
    },
    {
      match: (path) => path.startsWith("/products/"),
      view: () => ProductDetailsPage({ id }),
    },
  ];

  for (let route of routes) {
    if (route.match(path)) {
      return route.view();
    }
  }
}

export function navigate(path) {
  window.location.hash = path;
  router();
}
