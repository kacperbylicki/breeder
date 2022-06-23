import "../styles/globals.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { AuthProvider, ProtectedRoute } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  const protectedRoutes = ["/login", "/register"];

  return (
    <>
      <Head>
        <title>Breeder</title>
        <meta name="description" content="Breeder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-auto lg:w-1/3 md:w-1/2 sm:w-1/2 mx-auto">
        <AuthProvider>
          <ProtectedRoute protectedRoutes={protectedRoutes}>
            <Navbar />
            <Component {...pageProps} />
          </ProtectedRoute>
        </AuthProvider>
      </section>
    </>
  );
}

export default MyApp;
