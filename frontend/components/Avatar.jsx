import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

const Avatar = () => {
  const { profile, logout } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <Image
            src="https://api.lorem.space/image/face?hash=33791"
            alt={profile.name}
            width="50"
            height="50"
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </li>
        <li>
          <Link href="/matches">
            <a className="justify-between">
              Matches
              <span className="badge">New</span>
            </a>
          </Link>
        </li>
        <li>
          <a onClick={() => logout()}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Avatar;
