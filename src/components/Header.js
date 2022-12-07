import React from "react";
import Image from "next/image";

function Header() {
  return (
    <header>
      {/* top nav */}
      <div>
        <div>
          <Image src='http://links.papareact.com/f90' width={150} height={40} />
        </div>
      </div>
      {/* bottom nav */}
      <div></div>
    </header>
  );
}

export default Header;
