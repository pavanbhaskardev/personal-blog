import React from "react";
import Commandbar from "./Commandbar";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-12 flex items-center z-10 bg-background shadow-sm">
      <div className="container text-xl justify-between flex items-center">
        <Link href="/" className="font-secondary">
          Blog🤙
        </Link>

        <Commandbar />
      </div>
    </header>
  );
};

export default Navbar;
