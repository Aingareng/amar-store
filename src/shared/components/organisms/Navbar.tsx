import Menu from "../molecules/Menu";
import List from "../atoms/List";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <Menu
            attr={{
              tabIndex: 0,
              className:
                "menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow",
            }}
          >
            <List>
              <Link to="/login">
                <Icon
                  icon="material-symbols:exit-to-app-rounded"
                  width="24"
                  height="24"
                />
                Keluar
              </Link>
            </List>
          </Menu>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">
          Amar Store
        </Link>
      </div>
      <div className="navbar-end">
        <div className="avatar placeholder">
          <div className="bg-primary text-neutral-content w-12 rounded-full">
            <span className="text-xl">A</span>
          </div>
        </div>
      </div>
    </div>
  );
}
