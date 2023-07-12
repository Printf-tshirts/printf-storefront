import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`,
      )}>
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/tshirts"}>
              {" "}
              {t("T-Shirts")}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="mega-menu">
              <li>
                <ul>
                  {/* <li className="mega-menu-title">
                    <Link to={process.env.PUBLIC_URL + "/men"}>{t("MEN")}</Link>
                  </li> */}
                  <li className="">
                    <Link to={process.env.PUBLIC_URL + "/tshirts/food"}>
                      {t("food")}
                    </Link>
                  </li>
                  <li className="">
                    <Link to={process.env.PUBLIC_URL + "/tshirts/sports"}>
                      {t("sports")}
                    </Link>
                  </li>
                  <li className="">
                    <Link to={process.env.PUBLIC_URL + "/tshirts/gamer"}>
                      {t("gamer")}
                    </Link>
                  </li>
                  <li className="">
                    <Link to={process.env.PUBLIC_URL + "/tshirts/anime"}>
                      {t("anime")}
                    </Link>
                  </li>
                  <li className="">
                    <Link to={process.env.PUBLIC_URL + "/tshirts/coder"}>
                      {t("coder")}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  {/* <li className="mega-menu-title">
                    <Link to={process.env.PUBLIC_URL + "/tshirts/women"}>
                      {t("WOMEN")}
                    </Link>
                  </li> */}
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/tshirts/travel"}>
                      {t("travel")}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/tshirts/abstract"}>
                      {t("abstract")}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/tshirts/astronomy"}>
                      {t("astronomy")}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/tshirts/graphi-tees"}>
                      {t("graphi-tees")}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="mega-menu-img">
                    <Link to={process.env.PUBLIC_URL + "/tshirts"}>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/img/banner/banner-12.png"
                        }
                        alt=""
                      />
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          {/* <li>
            <Link to={process.env.PUBLIC_URL + "/tshirts"}>
              {t("T-Shirts")}
            </Link>
          </li> */}
          {/* <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {t("contact_us")}
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu;
