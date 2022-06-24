import Avatar from "./Avatar";
import Link from "next/link";
import LoginButton from "./LoginButton";
import ThemeSwitch from "./ThemeSwitch";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="grid place-items-end">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link href="/">
            <a className="avatar">
              <div className="w-10 rounded">
                <img src="logo.svg" alt="logo" />
              </div>
            </a>
          </Link>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-end">
          <ThemeSwitch />
          {isAuthenticated ? <Avatar /> : <LoginButton />}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
