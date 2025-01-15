import redis from "../../lib/Redis";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const body = await req.json();
		const { url } = body;

		if (!url || url.length === 0) {
			return NextResponse.json({ message: "Error: Send me your URL." }, { status: 400 });
		}

		const shortURL = makeShort(4);

		await redis.hset("links", { [shortURL]: url });

		return NextResponse.json({ message: "Success!", shortURL }, { status: 200 });
	} catch (error) {
		console.error("Error:", error);

		return NextResponse.json({ message: "Internal server error." }, { status: 500 });
	}
}

function makeShort(length) {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return result;
}
