import Link from "next/link";

const LoginButton = () => {
  return (
    <>
      <Link href="/login">
        <button className="btn gap-2 h-8 px-4 m-2 text-sm">Login</button>
      </Link>
    </>
  );
};

export default LoginButton;
