// app/api/revalidate/route.ts
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  const { isValidSignature, body } = await parseBody<{ _type: string }>(
    req,
    process.env.SANITY_REVALIDATE_SECRET,
  );

  if (!isValidSignature) {
    return new Response("Invalid signature", { status: 401 });
  }

  if (!body?._type) {
    return new Response("Bad request: missing _type", { status: 400 });
  }

  revalidateTag(body._type, "max");
  return NextResponse.json({ revalidated: true, tag: body._type });
}
