// get products
export const getProducts = (products, category, type, limit) => {
  const finalProducts = category
    ? products.filter(
        (product) =>
          product.category.filter((single) => single === category)[0],
      )
    : products;

  if (type && type === "new") {
    const newProducts = finalProducts.filter((single) => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "bestSeller") {
    return finalProducts
      .sort((a, b) => {
        return b.saleCount - a.saleCount;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === "saleItems") {
    const saleItems = finalProducts.filter(
      (single) => single.discount && single.discount > 0,
    );
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? price - price * (discount / 100) : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
  let productInCart = cartItems.find(
    (single) =>
      single.variant._id === product._id &&
      (single.variant.color._id ? single.variant.color._id === color : true) &&
      (single.size ? single.size === size : true),
  );
  if (cartItems.length >= 1 && productInCart) {
    return cartItems.find(
      (single) =>
        single.variant._id === product._id &&
        single.variant.color._id === color &&
        single.size === size,
    ).quantity;
  } else {
    return 0;
  }
};

export const cartItemStock = (item, size) => {
  return item.variant.sizes.filter((single) => single.sizeOption === size)[0]
    .inventory;
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      return products.filter(
        (product) =>
          product.categories.filter(
            (single) => single.title === sortValue.title,
          )[0],
      );
    }
    if (sortType === "tags") {
      return products.filter(
        (product) => product.tags.filter((single) => single === sortValue)[0],
      );
    }
    if (sortType === "color") {
      return products.filter(
        (product) =>
          product.variants &&
          product.variants.filter(
            (single) => single.color._id === sortValue,
          )[0],
      );
    }
    if (sortType === "size") {
      return products.filter(
        (product) =>
          product.variants &&
          product.variants.filter(
            (single) =>
              single.sizes.filter(
                (single) => single.sizeOption === sortValue,
              )[0],
          )[0],
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.variants[0].price - a.variants[0].price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.variants[0].price - b.variants[0].price;
        });
      }
    }
  }
  return products;
};

// get individual element
const getIndividualItemArray = (array) => {
  let individualItemArray = array.filter(function (v, i, self) {
    return i === self.indexOf(v);
  });
  return individualItemArray;
};

// get individual categories
export const getIndividualCategories = (products) => {
  let productCategories = [];
  let uniqueProductCategories = [];
  products &&
    products.map((product) => {
      return (
        product.categories &&
        product.categories.map((single) => {
          if (single && !uniqueProductCategories.includes(single.handle)) {
            uniqueProductCategories.push(single.handle);
            return productCategories.push(single);
          }
          return null;
        })
      );
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
export const getIndividualTags = (products) => {
  let productTags = [];
  products &&
    products.map((product) => {
      return (
        product.tags &&
        product.tags.map((single) => {
          return productTags.push(single);
        })
      );
    });
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};

// get individual colors
export const getIndividualColors = (products) => {
  let productColors = [];
  products &&
    products.map((product) => {
      return (
        product.variants &&
        product.variants.map((single) => {
          return productColors.push(single.color);
        })
      );
    });
  const individualProductColors = getIndividualItemArray(productColors);
  return individualProductColors;
};

// get individual sizes
export const getProductsIndividualSizes = (products) => {
  let productSizes = [];
  products &&
    products.map((product) => {
      return (
        product.variants &&
        product.variants.map((single) => {
          return single.sizes.map((single) => {
            return productSizes.push(single.sizeOption);
          });
        })
      );
    });
  const individualProductSizes = getIndividualItemArray(productSizes);
  return individualProductSizes;
};

// get product individual sizes
export const getIndividualSizes = (product) => {
  let productSizes = [];
  product.variants &&
    product.variants.map((singleVariation) => {
      return (
        singleVariation.sizes &&
        singleVariation.sizes.map((singleSize) => {
          return productSizes.push(singleSize.sizeOption);
        })
      );
    });
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};

export const setActiveSort = (e) => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button",
  );
  filterButtons.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = (e) => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = (e) => {
  const shopTopFilterWrapper = document.querySelector(
    "#product-filter-wrapper",
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};
