import React from "react";
import { withProtected } from "../components/RouteProtection";
import { useAuth } from "../context/auth";
import Link from "next/link";

const Protected = () => {
  const { logout } = useAuth();
  return (
    <div>
      <div className="mr-8">protected</div>
      <div>
        <a onClick={() => logout()}>logout</a>
      </div>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </div>
  );
};

export default Protected;
