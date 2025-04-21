import Menu from "../molecules/Menu";
import List from "../atoms/List";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Submenu from "../molecules/Submenu";
import getInitials from "../../utils/initialString";

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow">
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
              <Link to="/">
                <Icon
                  icon="material-symbols:home-outline-rounded"
                  width="24"
                  height="24"
                />
                Beranda
              </Link>
            </List>

            <List>
              <Submenu
                label={
                  <>
                    {" "}
                    <Icon
                      icon="material-symbols:settings"
                      width="24"
                      height="24"
                    />
                    Pengaturan
                  </>
                }
              >
                <ul>
                  <List>
                    <Link to="/setting/criteria">Daftar Kriteria</Link>
                  </List>
                  <List>
                    <Link to="/setting/skills">Daftar Keahlian</Link>
                  </List>
                  <List>
                    <Link to="/setting/leadership">
                      Daftar Jiwa kepemimpinan
                    </Link>
                  </List>
                </ul>
              </Submenu>
            </List>

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
        <img src="/amar-icon.jpg" alt="icon store" width={50} />
        <Link to="/" className="btn btn-ghost text-xl">
          Toko Amar
        </Link>
      </div>
      <div className="navbar-end">
        <div className="avatar placeholder">
          <div className="bg-primary text-neutral-content w-12 rounded-full">
            <span className="text-xl">{getInitials("Admin")}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
