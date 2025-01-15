import { NextResponse } from "next/server";
import redis from "../../lib/Redis";

export async function GET() {
	const data = (await redis.hgetall("links")) || [];

	return NextResponse.json(data, { status: 200 });
}
