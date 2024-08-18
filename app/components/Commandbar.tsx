"use client";
import React, { useEffect, useState } from "react";
import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
  useKBar,
} from "kbar";

const Commandbar = () => {
  const { results } = useMatches();
  const { query } = useKBar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="text-white fixed bottom-4 right-4 bg-primary hover:bg-primary/80 font-medium rounded-md text-sm px-3 py-2 lg:static lg:bottom-0 lg:right-0"
        onClick={query.toggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 stroke-background"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>

      <KBarPortal>
        <KBarPositioner className="bg-black/50 h-full backdrop-blur-sm z-50">
          <KBarAnimator className="w-full max-w-lg">
            <div className="w-full bg-white p-4 rounded-lg mx-auto">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 absolute left-2 top-2.5 stroke-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>

                <KBarSearch
                  defaultPlaceholder="Search"
                  className="block w-full rounded-md pl-9 pr-3.5 py-2 text-gray-900  placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none border border-gray-400"
                />
              </div>

              {results && results.length > 0 ? (
                <div className="mt-2">
                  <KBarResults
                    items={results}
                    onRender={({ item, active }) =>
                      typeof item === "string" ? (
                        <div className="text-sm text-gray-400 pb-2">{item}</div>
                      ) : (
                        <div
                          className="block data-[active-item=true]:bg-primary/20 p-2 rounded-md hover:cursor-pointer"
                          data-active-item={active}
                        >
                          {item.name}
                        </div>
                      )
                    }
                  />
                </div>
              ) : null}
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    </>
  );
};

export default Commandbar;
