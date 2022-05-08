import { useRouter } from "next/router";
import { useAuth } from "../context/auth";
import { useEffect } from "react";
import PageLoader from "./PageLoader";

export const withPublic = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { isAuthenticaed, isLoading } = useAuth();

    useEffect(() => {
      if (isAuthenticaed) {
        router.replace("/protected");
        return null;
      }
    }, [isAuthenticaed]);

    if (isAuthenticaed || isLoading) {
      return <h1>Loading here!</h1>; // full-screen loader here
    }

    return <WrappedComponent {...props} />;
  };
};

export const withProtected = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.replace("/login");
      }
    }, [isLoading, isAuthenticated]);

    if (!isAuthenticated || isLoading) {
      return <PageLoader />; // full-screen loader here
    }

    return <WrappedComponent {...props} />;
  };
};
