import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Payment } from "./pages/other/Payment";
import { MyOrders } from "./pages/other/MyOrders";
import { Store } from "./pages/other/Store";
import { MyAddresses } from "./pages/other/MyAddresses";
import { ChangePassword } from "./pages/other/ChangePassword";
import { SingleOrder } from "./pages/other/SingleOrder";
import { Terms } from "./pages/other/Terms";
import { Privacy } from "./pages/other/Privacy";
import Search from "./pages/other/Search";

// home pages
const Home = lazy(() => import("./pages/home/Home"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  return (
    <Router>
      <ScrollToTop>
        <Suspense
          fallback={
            <div className="flone-preloader-wrapper">
              <div className="flone-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          }>
          <Routes>
            <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />
            {/* Shop product pages */}
            <Route
              path={
                process.env.PUBLIC_URL +
                "/:categoryHandle/:variantHandle/:productCode"
              }
              element={<Product />}
            />
            {/* Shop pages */}
            <Route
              path={process.env.PUBLIC_URL + "/:categoryHandle"}
              element={<ShopGridStandard />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/search/:query"}
              element={<Search />}
            />
            {/* Other pages */}
            <Route
              path={process.env.PUBLIC_URL + "/about"}
              element={<About />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/contact"}
              element={<Contact />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/my-account"}
              element={<MyAccount />}
            />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/my-addresses" element={<MyAddresses />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/my-orders/:orderHandle" element={<SingleOrder />} />
            <Route
              path={process.env.PUBLIC_URL + "/login-register"}
              element={<LoginRegister />}
            />

            <Route path={process.env.PUBLIC_URL + "/cart"} element={<Cart />} />
            <Route
              path={process.env.PUBLIC_URL + "/checkout"}
              element={<Checkout />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/payment"}
              element={<Payment />}
            />
            <Route path="/store" element={<Store />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/privacy-policy" element={<Privacy />} />

            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
