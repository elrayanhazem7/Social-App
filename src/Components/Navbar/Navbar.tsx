import { Avatar, Button } from "@heroui/react";
import { BinanceCoin } from "iconsax-reactjs";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { UserTokenProvider } from "../../Context/AuthUserContext/AuthUserContext";

export default function Navbar() {
  const [isUserDataOpen, setIsUserDataOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { userData, setUserData } = useContext(UserTokenProvider);

  const router = useNavigate();
  function handelLogOut() {
    localStorage.removeItem("user_token");
    setUserData(null);
    router("/login");
    setIsUserDataOpen(false);
  }

  return (
    <nav className="bg-white shadow-2xl fixed w-full z-20 top-0 inset-s-0 border-b border-default">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <BinanceCoin size="40" color="#2ccce4" />
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {userData ? (
            <>
              <button
                onClick={() => {
                  setIsUserDataOpen(!isUserDataOpen);
                }}
                type="button"
                className="flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <Avatar>
                  <Avatar.Image alt={userData.name} src={userData.photo} />
                  <Avatar.Fallback>JD</Avatar.Fallback>
                </Avatar>
              </button>
              {/* Dropdown menu */}
              <div
                className={`z-50 absolute top-full right-0 ${isUserDataOpen ? "block" : "hidden"} bg-white  bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44`}
                id="user-dropdown"
              >
                <div className="px-4 py-3 text-sm border-b border-default">
                  <span className="block text-heading font-medium">
                    {userData.name}
                  </span>
                  <span className="block text-body truncate">
                    {userData.email}
                  </span>
                </div>
                {/* <ul
              className="p-2 text-sm text-body font-medium"
              aria-labelledby="user-menu-button"
            >
              <Link to="/Settings">
              <li className="cursor-pointer hover:bg-gray-200 inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
                  Settings
              </li>
              </Link>
              <li className="cursor-pointer hover:bg-gray-200 inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  onClick={()=>{handelLogOut()}}>
                  Sign out
              </li>
            </ul> */}

                <ul className="p-2 text-sm text-body font-medium">
                  <li>
                    <a
                      href="#"
                      className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium rounded"
                    >
                      Dashboard
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium rounded"
                    >
                      Settings
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium rounded"
                    >
                      Earnings
                    </a>
                  </li>

                  <li
                    className="cursor-pointer hover:bg-gray-200 inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                    onClick={() => {
                      handelLogOut();
                    }}
                  >
                    Sign out
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button className="text-white bg-main-color pointer-events-none">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="text-white bg-main-color pointer-events-none">
                  Register
                </Button>
              </Link>
            </div>
          )}

          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${isOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            {userData && (
              <li>
                <NavLink
                  to="/posts"
                  className={function ({ isActive }) {
                    return `block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0 text-xl ${isActive ? "text-main-color" : "text-black "}`;
                  }}
                  aria-current="page"
                >
                  Posts
                </NavLink>
              </li>
            )}
            {userData && (
              <li>
                <NavLink
                  to="/profile"
                  className={function ({ isActive }) {
                    return `block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0 text-xl ${isActive ? "text-main-color" : "text-black"}`;
                  }}
                  aria-current="page"
                >
                  Profile
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
