import React from "react";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col sm:flex-row gap-4 justify-between mt-10 p-4">
      <p>
        Build by{" "}
        <a
          href="https://pavanbhaskar.com"
          target="_blank"
          className="underline text-primary hover:text-primary/80"
        >
          Pavan Bhaskar
        </a>{" "}
        with ❤️
      </p>

      <div className="flex gap-4">
        <a
          href="https://github.com/pavanbhaskardev"
          className="underline text-primary hover:text-primary/80"
        >
          Github
        </a>
        <a
          href="https://twitter.com/pavanbhaskar234"
          className="underline text-primary hover:text-primary/80"
        >
          Twitter
        </a>
        <a
          href="https://www.linkedin.com/in/pavan-bhaskar-challa-4a2774244/"
          className="underline text-primary hover:text-primary/80"
        >
          LinkedIn
        </a>
        <a
          href="https://www.instagram.com/pavan_bhaskar_ch/"
          className="underline text-primary hover:text-primary/80"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
