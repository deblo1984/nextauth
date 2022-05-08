import { AuthProvider } from "../context/auth";
import "../styles/globals.css";
import PrivateRoute from "../components/PrivateRoute";

function MyApp({ Component, pageProps }) {
  const protectedRoutes = ["/protected"];
  return (
    <>
      <AuthProvider>
        <PrivateRoute protectedRoutes={protectedRoutes}>
          <Component {...pageProps} />
        </PrivateRoute>
      </AuthProvider>
    </>
  );
}

export default MyApp;
