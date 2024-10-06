"use client";

import axiosConfig from "@/lib/axiosConfig";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const getViewCount = async (slug: string) => {
  try {
    const response = await axiosConfig.get("api/views", {
      params: {
        slug,
      },
    });

    return response.data as { count: number };
  } catch (error) {
    throw Error("Failed to get view count");
  }
};

const updateViewCount = async (slug: string) => {
  try {
    const response = await axiosConfig.post("api/views", {
      slug,
    });

    return response;
  } catch (error) {
    throw Error("Failed to get view count");
  }
};

const Views = ({ slug }: { slug: string }) => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["views", slug],
    queryFn: () => getViewCount(slug),
    refetchOnWindowFocus: "always",
  });

  const { mutate } = useMutation({
    mutationFn: () => updateViewCount(slug),
    onSuccess: (data) => {
      if (data.status === 201) {
        window.sessionStorage.setItem(slug, "true");
        refetch();
      }
    },
  });

  useEffect(() => {
    const callAPI = setTimeout(() => {
      const alreadyViewed = window.sessionStorage.getItem(slug);

      // storing stuff in sessionStorage & not calling the update count function whenever user visits the page for that session
      // not updating count during development
      if (
        alreadyViewed !== "true" &&
        !window.location.origin.includes("localhost")
      ) {
        mutate();
      }
    }, 10000);

    return () => clearTimeout(callAPI);
  }, [mutate, slug]);

  return (
    <div className="flex items-center gap-1" title={`${data?.count} views`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>

      {isPending ? (
        <div className="flex items-center gap-1 not-prose">
          <span className="dot size-1 bg-text rounded-full" />
          <span className="dot size-1 bg-text rounded-full" />
          <span className="dot size-1 bg-text rounded-full" />
        </div>
      ) : (
        `${data?.count} views`
      )}
    </div>
  );
};

export default Views;
