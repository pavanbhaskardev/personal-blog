"use client";
import React from "react";
import { KBarProvider, type Action } from "kbar";

const actions: Action[] = [
  {
    id: "github",
    name: "Github",
    keywords: "Github",
    section: "Contact",
    perform: () => window.open("https://github.com/pavanbhaskardev", "_blank"),
  },
  {
    id: "twitter",
    name: "Twitter",
    keywords: "Twitter",
    section: "Contact",
    perform: () => window.open("https://twitter.com/pavanbhaskar234", "_blank"),
  },
  {
    id: "linkedin",
    name: "Linkedin",
    keywords: "Linkedin",
    section: "Contact",
    perform: () =>
      window.open(
        "https://www.linkedin.com/in/pavan-bhaskar-challa-4a2774244/",
        "_blank"
      ),
  },
  {
    id: "instagram",
    name: "Instagram",
    keywords: "Instagram",
    section: "Contact",
    perform: () =>
      window.open("https://www.instagram.com/pavan_bhaskar_ch/", "_blank"),
  },
];

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <KBarProvider
      actions={actions}
      options={{
        enableHistory: true,
      }}
    >
      {children}
    </KBarProvider>
  );
};

export default Provider;
