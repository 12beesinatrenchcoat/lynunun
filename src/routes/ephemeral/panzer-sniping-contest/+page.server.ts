/* eslint-disable @typescript-eslint/no-restricted-types -- Used in the API. */
import type { PageServerLoad } from "./$types";
import * as finalData from "./psc-final.json";

// Event has ended. Most of the script has been moved into /scripts/panzer-sniping-contest.ts

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

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		"cache-control": "max-age=86400, s-maxage=86400, durable, public"
	});

	return {
		mapData: finalData.mapData,
		mapLeaderboards: finalData.mapLeaderboards,
		date: new Date(finalData.date)
	};
};
