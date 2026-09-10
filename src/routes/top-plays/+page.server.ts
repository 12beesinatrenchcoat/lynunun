import { json } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { LyneAPI } from "$lib/types/api";
import { dev } from "$app/environment";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	const data = await fetch("/api/top-plays").then(
		async (response) =>
			response.json() as unknown as {
				topPlays: LyneAPI.Score[];
				date: Date;
			}
	);

	data.date = new Date(data.date);

	setHeaders({
		"cache-control": "max-age=7200, public"
	});

	return data;
};
