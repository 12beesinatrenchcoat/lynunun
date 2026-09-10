import type { PageServerLoad } from "./$types";
import type { LyneAPI } from "$lib/types/api";
import { dev } from "$app/environment";

const leaderboardLength = 50;

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// Be nice to ZZZ's servers, use testing
	// if (dev) {
	// 	const topPlays = await import("$lib/testing/topPlays.json", { with: { type: "json" } });
	// 	console.warn("/top-plays: ⚠ RUNNING IN DEV MODE, DATA IS NOT LIVE");
	// 	return { topPlays: topPlays.default, date: new Date() };
	// }

	const players: Array<{ username: string; totalPp: number }> = [];
	let plays: LyneAPI.Score[] = [];

	let lowest = -2;

	// Fill players
	await fetch("https://api.zxz.moe/rankings/global?scope=all&page=1&pageSize=50")
		.then(async (response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return response.json() as Promise<LyneAPI.Rankings>;
		})
		.then((data) => {
			for (const item of data.items) {
				players.push({
					username: item.user.username,
					totalPp: item.totalPp
				});
			}
		});

	// Get players
	for (const player of players) {
		// eslint-disable-next-line no-await-in-loop
		const user = await fetch("https://api.zxz.moe/users/" + player.username + "/scores").then(
			async (response) => {
				if (!response.ok) {
					throw new Error(`Error when fetching user ${player.username}: ${response.statusText}`);
				}

				return response.json() as Promise<LyneAPI.UserScores>;
			}
		);

		// Total PP less than lowest score, we can quit now.
		if (player.totalPp < lowest) {
			break;
		}

		const topScores = user.items;

		for (const score of topScores) {
			if (score.pp > lowest || plays.length < leaderboardLength) {
				score.user = player.username;
				plays.push(score);
			} else {
				break;
			}
		}

		plays.sort((a, b) => b.pp - a.pp);
		plays = plays.slice(0, leaderboardLength);
		lowest = plays.at(-1)!.pp ?? -2;
		console.log(`Processed ${player.username}, lowest is now ${lowest}`);
	}

	setHeaders({
		"cache-control": "max-age=7200, s-maxage=7200, durable, public"
	});

	return { topPlays: plays, date: new Date() };
};
