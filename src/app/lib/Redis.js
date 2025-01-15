import { Redis } from "@upstash/redis";

export const redis = new Redis({
	url: "https://neat-impala-30302.upstash.io",
	token: "AXZeAAIjcDFhYzYyMjM5ZjNhNDg0Y2ZjODA5YTA4NWRkOWYzODI4N3AxMA",
});

export default redis;
