import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ fetch, setHeaders }) => {
	setHeaders({
		"cache-control": "public, max-age=20000"
	});

	return json({ now: Date.now() });
};
