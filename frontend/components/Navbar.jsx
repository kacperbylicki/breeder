import Avatar from "./Avatar";
import LoginButton from "./LoginButton";
import ThemeSwitch from "./ThemeSwitch";
import { Logo } from "./Logo";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, profile } = useAuth();

  return (
    <section className="grid place-items-end">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Logo />
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-end">
          <ThemeSwitch />
          {isAuthenticated && profile ? <Avatar /> : <LoginButton />}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
