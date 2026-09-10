/* eslint-disable @typescript-eslint/no-restricted-types -- Used in the API. */
import type { PageServerLoad } from "./$types";
import { firstPlaces as panzerScores } from "./2026-09-09-Panzer.json";

const mapIds = panzerScores.map((a) => a.mapId);
const mapData: {
	[mapId: number]: {
		title: string;
		artist: string;
		titleRomanised: string | null;
		artistRomanised: string | null;
		difficultyName: string;
		starRating: number;
		status: string;
		thumbnailUrl: string;
	};
} = {};

for (const panzerScore of panzerScores) {
	const { map } = panzerScore;

	mapData[map.id] = {
		title: map.title,
		artist: map.artist,
		titleRomanised: map.titleRomanised,
		artistRomanised: map.artistRomanised,
		difficultyName: map.difficultyName,
		starRating: map.starRating,
		status: map.status,
		thumbnailUrl: map.thumbnailUrl
	};
}

type MapLeaderboardEntry = {
	rank: number;
	id: number;
	mapId: number;
	user: {
		id: number;
		username: string;
		country: string;
		nameColour: string;
		avatarUrl: string;
	};
	score: number;
	accuracy: number;
	maxCombo: number;
	tierCounts: {
		perfect: number;
		great: number;
		good: number;
		miss: number;
	};
	mods: string[];
	grade: "SS" | "S" | "A" | "B" | "C" | "D";
	pp: number;
	submittedAt: string;
};

const mapLeaderboards: { [mapId: number]: MapLeaderboardEntry[] } = {};

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	const promises = Array.from(mapIds, async (mapId) =>
		fetch(`https://api.zxz.moe/maps/${mapId}/leaderboard`)
			.then(async (response) => response.json() as unknown)
			.then((data) => {
				const { top } = data as { top: MapLeaderboardEntry[] };
				mapLeaderboards[mapId] = top.slice(0, 2);
			})
	);

	setHeaders({
		"cache-control": "max-age=1800, public"
	});

	await Promise.all(promises);
	return { mapData, mapLeaderboards, date: new Date() };
};
