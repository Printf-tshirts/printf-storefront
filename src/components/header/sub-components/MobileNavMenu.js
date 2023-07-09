import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MobileNavMenu = () => {
  const { t } = useTranslation();

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        {/* <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>{t("home")}</Link>
          <ul className="sub-menu">
            <li className="menu-item-has-children">
              <Link to={process.env.PUBLIC_URL + "/"}>
                {t("home_group_one")}
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-fashion"}>
                    {t("home_fashion")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-fashion-two"}>
                    {t("home_fashion_two")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-fashion-three"}>
                    {t("home_fashion_three")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-fashion-four"}>
                    {t("home_fashion_four")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-fashion-five"}>
                    {t("home_fashion_five")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-fashion-six"}>
                    {t("home_fashion_six")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-fashion-seven"}>
                    {t("home_fashion_seven")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/"}>
                    {t("home_fashion_eight")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-kids-fashion"}>
                    {t("home_kids_fashion")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-cosmetics"}>
                    {t("home_cosmetics")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-furniture"}>
                    {t("home_furniture")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-furniture-two"}>
                    {t("home_furniture_two")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-furniture-three"}>
                    {t("home_furniture_three")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-furniture-four"}>
                    {t("home_furniture_four")}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link to={process.env.PUBLIC_URL + "/"}>
                {t("home_group_two")}
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-furniture-five"}>
                    {t("home_furniture_five")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-furniture-six"}>
                    {t("home_furniture_six")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-furniture-seven"}>
                    {t("home_furniture_seven")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-electronics"}>
                    {t("home_electronics")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-electronics-two"}>
                    {t("home_electronics_two")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-electronics-three"}>
                    {t("home_electronics_three")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-book-store"}>
                    {t("home_book_store")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-book-store-two"}>
                    {t("home_book_store_two")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-plants"}>
                    {t("home_plants")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-flower-shop"}>
                    {t("home_flower_shop")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-flower-shop-two"}>
                    {t("home_flower_shop_two")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-organic-food"}>
                    {t("home_organic_food")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-organic-food-two"}>
                    {t("home_organic_food_two")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-onepage-scroll"}>
                    {t("home_onepage_scroll")}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link to={process.env.PUBLIC_URL + "/"}>
                {t("home_group_three")}
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-grid-banner"}>
                    {t("home_grid_banner")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-auto-parts"}>
                    {t("home_auto_parts")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-cake-shop"}>
                    {t("home_cake_shop")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-handmade"}>
                    {t("home_handmade")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-pet-food"}>
                    {t("home_pet_food")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-medical-equipment"}>
                    {t("home_medical_equipment")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-christmas"}>
                    {t("home_christmas")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-black-friday"}>
                    {t("home_black_friday")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-black-friday-two"}>
                    {t("home_black_friday_two")}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/home-valentines-day"}>
                    {t("home_valentines_day")}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li> */}

        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/tshirts"}>{t("shop")}</Link>
          <ul className="sub-menu">
            <li>
              <Link to={process.env.PUBLIC_URL + "/men"}>{t("men")}</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/women"}>{t("women")}</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/tshirts"}>{t("tshirts")}</Link>
        </li>
        {/* <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>{t("pages")}</Link>
          <ul className="sub-menu">
            <li>
              <Link to={process.env.PUBLIC_URL + "/cart"}>{t("cart")}</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/checkout"}>
                {t("checkout")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/wishlist"}>
                {t("wishlist")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/compare"}>
                {t("compare")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>
                {t("my_account")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>
                {t("login_register")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/about"}>
                {t("about_us")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/contact"}>
                {t("contact_us")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/not-found"}>
                {t("404_page")}
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
            {t("blog")}
          </Link>
          <ul className="sub-menu">
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                {t("blog_standard")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-no-sidebar"}>
                {t("blog_no_sidebar")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-right-sidebar"}>
                {t("blog_right_sidebar")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                {t("blog_details_standard")}
              </Link>
            </li>
          </ul>
        </li> */}
        {/* <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {t("contact_us")}
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
