import { ImageResponse } from "next/og";
import { NextRequest, NextResponse } from "next/server";
import { allBlogs } from "contentlayer/generated";
import { format } from "date-fns";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = decodeURIComponent(searchParams.get("title") || "");

  const fontData = await fetch(
    new URL("../../../public/fonts/Virgil.ttf", import.meta.url)
  );
  const fontBuffer = await fontData.arrayBuffer();

  const blogDetails = allBlogs.find((details) => details.title === title);

  try {
    return new ImageResponse(
      (
        <div tw="flex w-full h-full items-center justify-center bg-background text-text relative">
          <div tw="flex absolute top-6 left-6 text-2xl">Blog🤙</div>

          <h2
            tw="block w-full text-6xl font-bold text-left font-secondary max-w-2xl mx-auto"
            style={{ fontFamily: "CustomFont" }}
          >
            {title}
          </h2>

          <p tw="absolute bottom-6 right-6 text-xl">
            {blogDetails?.date
              ? format(new Date(blogDetails.date), "dd, LLL uuuu")
              : ""}
          </p>
        </div>
      ),
      {
        height: 630,
        width: 1200,
        status: 200,
        fonts: [
          {
            name: "CustomFont",
            data: fontBuffer,
          },
        ],
        emoji: "twemoji",
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to generate image" },
      { status: 500 }
    );
  }
}
