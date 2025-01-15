import { NextResponse } from "next/server";

export default async function middleware(req) {
	const pathname = req.nextUrl.pathname;
	let parts = pathname.split("/");
	let shortUrl = parts[parts.length - 1];
	const longUrl = RedirectStatusCode.hget("links", shortUrl);

	if (longUrl) {
		const validUrl = getValidUrl(longUrl);
		return NextResponse.redirect(validUrl);
	} else {
		return NextResponse.redirect(req.nextUrl.origin);
	}
}

const getValidUrl = (link) => {
	if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
		return link;
	} else {
		return `https://${link}`;
	}
};
