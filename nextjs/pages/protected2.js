import Link from "next/link";
import React from "react";

const protected2 = () => {
  return (
    <div>
      <div>protected2</div>
      <div>
        <Link href="/protected">
          <a>protected</a>
        </Link>
      </div>
    </div>
  );
};

export default protected2;
