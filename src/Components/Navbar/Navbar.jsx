import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

const pages = [
  { text: "Home", path: "/" },
  { text: "Cart", path: "/cart" },
  { text: "Wishlist", path: "/wishlist" },
  { text: "Products", path: "/products" },
  { text: "Categories", path: "/categories" },
  { text: "Brands", path: "/brands" },
];

const authPages = [
  { text: "Register", path: "/register" },
  { text: "Login", path: "/login" },
];

export default function Navbar() {
  const { isLogin, setToken } = useContext(UserContext);

  const { cart } = useContext(CartContext);

  const navigate = useNavigate();

  function logOut() {
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <div className="navbar bg-base-100 shadow-md">
        <div className="container max-w-screen-xl flex items-center justify-between gap-52 mx-auto p-4">
          <div className="me-0">
            <Link
              to={"/"}
              className="flex items-center space-x-3 rtl:space-x-reverse grow-0"
            >
              <FaCartShopping className="text-green-600 size-7" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                Fresh Cart
              </span>
            </Link>
          </div>

          <ul className="hidden lg:flex font-medium mx-auto flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white lg:">
            {isLogin &&
              pages.map(({ text, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 lg:lg:"
                  >
                    {text}
                  </NavLink>
                </li>
              ))}
          </ul>

          <div className="flex gap-14 justify-center items-center">
            <ul className="hidden lg:flex font-medium ml-auto flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-4 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white lg:">
              <NavLink to={"/cart"} className="relative">
                <FaCartShopping className="text-2xl text-green-600" />
                <div className="absolute text-sm top-0 -translate-y-3 left-4 bg-green-800 rounded text-white px-1">
                  {cart.numOfCartItems}
                </div>
              </NavLink>
            </ul>
            <ul className="hidden lg:flex font-medium flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white lg:">
              {!isLogin &&
                authPages.map(({ text, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 lg:lg:"
                    >
                      {text}
                    </NavLink>
                  </li>
                ))}

              {isLogin && (
                <li>
                  <button
                    onClick={() => logOut()}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 lg:lg:"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
          <div className="dropdown dropdown-end lg:hidden relative">
            <button
              className="btn btn-square btn-ghost"
              data-collapse-toggle="navbar-default"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div
              className="flex flex-col absolute top-100 right-0 bg-white items-center w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex mx-auto flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50">
                {isLogin &&
                  pages.map(({ text, path }) => (
                    <li key={path}>
                      <NavLink
                        to={path}
                        className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100"
                      >
                        {text}
                      </NavLink>
                    </li>
                  ))}
              </ul>
              <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50">
                {!isLogin &&
                  authPages.map(({ text, path }) => (
                    <li key={path}>
                      <NavLink
                        to={path}
                        className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100"
                      >
                        {text}
                      </NavLink>
                    </li>
                  ))}

                {isLogin && (
                  <li>
                    <button
                      onClick={() => logOut()}
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Flowbite navbar did not work correctly :/


            /* <nav className="bg-white border-gray-200 ">
                <div className="max-w-screen-xl flex flex-wrap items-center gap-8 mx-auto p-4">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <FaCartShopping className="text-green-600 size-7"/> 
                        <span className="self-center text-2xl font-semibold whitespace-nowrap ">Fresh Cart</span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex ml-auto items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded="false">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="flex grow gap-8 items-center w-full lg:flex lg:w-auto" id="navbar-default">
                        <ul className="font-medium flex mx-auto flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white lg:">
                            {
                                isLogin && pages.map(({text, path}) => <li key={path}>
                                <NavLink to={path} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 lg:lg:">{text}</NavLink>
                            </li> )
                            }
                        </ul>
                        <ul className="font-medium ml-auto flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-4 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white lg:">
                            {
                                icons.map(({icon, url}) => <li key={url}>
                                <a href={url} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 lg:lg:">{icon}</a>
                            </li> )
                            }
                        </ul>
                        <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white lg:">
                            {
                                !isLogin &&authPages.map(({text, path}) => <li key={path}>
                                <NavLink to={path} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 lg:lg:">{text}</NavLink>
                            </li> )
                            }

                            {
                                isLogin && <li>
                                    <button onClick={()=> logOut()} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 lg:lg:">
                                        Logout
                                    </button>
                                </li>
                            }

                        </ul>
                    </div>
                </div>
            </nav> */}
    </>
  );
}
