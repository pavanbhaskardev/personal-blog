import { db } from "@/app/db";
import { viewCount } from "@/app/db/schema";
import { NextResponse } from "next/server";
import { allBlogs } from "@/.contentlayer/generated";
import { eq, sql } from "drizzle-orm";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/app/db/upstash";

const allowedOrigin = "https://blog.pavanbhaskar.com";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, "60 s"),
});

export async function POST(request: Request) {
  const slugDetails = await request.json();

  const { slug = "" }: { slug?: string } = slugDetails;
  const filteredSlug = allBlogs.find(({ url }) => url === `/${slug}`);
  const headers = request.headers;

  // Extract the Origin or Referer header from the request
  const origin = headers.get("origin") || headers.get("referer") || "";
  const requestIP = request.headers.get("x-forwarded-for") ?? "";
  const fallbackIP =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "0.0.0.0";

  // Check if the origin is valid (i.e., the request is coming from your domain)
  if (!origin || !origin.startsWith(allowedOrigin)) {
    return NextResponse.json(
      { message: "Request not allowed from this origin" },
      { status: 403 } // Forbidden
    );
  }

  if (!filteredSlug) {
    return NextResponse.json({ message: "invalid slug" }, { status: 400 });
  }

  const ip = `${requestIP || fallbackIP}/${slug}`;

  try {
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { message: "Too many requests!" },
        {
          status: 429,
          headers: {
            "Retry-After": "60", // 60 seconds until they can try again
          },
        }
      );
    }

    const existingRecord = await db
      .select()
      .from(viewCount)
      .where(eq(viewCount.slug, slug))
      .execute();

    if (existingRecord.length > 0) {
      await db
        .update(viewCount)
        .set({ views: sql`${viewCount.views} + 1` }) // Increment views by 1
        .where(eq(viewCount.slug, slug)) // Use eq here as well
        .execute();
    } else {
      await db
        .insert(viewCount)
        .values({
          slug,
          views: 1,
        })
        .execute();
    }

    return NextResponse.json(
      { message: "Successfully Incremented Count" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Failed to increment count" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const slug = searchParams.get("slug") ?? "";

  const filteredSlug = allBlogs.find(({ url }) => url === `/${slug}`);

  if (!filteredSlug) {
    return NextResponse.json({ message: "slug not found" }, { status: 404 });
  }

  try {
    const countDetails = await db.query.viewCount.findFirst({
      where: eq(viewCount?.slug, slug),
    });

    if (countDetails) {
      return NextResponse.json({ count: countDetails.views }, { status: 200 });
    }

    return NextResponse.json({ count: 0 }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Failed to retrieve count" },
      { status: 500 }
    );
  }
}
