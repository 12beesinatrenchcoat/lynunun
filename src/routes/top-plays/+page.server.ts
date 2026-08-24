import type { PageServerLoad } from "./$types";
import type { LyneAPI } from "$lib/types/api";
import { dev } from "$app/environment";

export const load: PageServerLoad = async () => {
	// Be nice to ZZZ's servers, use testing
	if (dev) {
		const topPlays = await import("$lib/testing/topPlays.json", { with: { type: "json" } });
		return { topPlays: topPlays.default, date: new Date() };
	}

	const players: string[] = [];
	let plays: LyneAPI.Play[] = [];

	let lowest = -2;

	// Fill players
	await fetch("https://api.lyne.pp.ua/rankings/global?scope=all&page=1&pageSize=50")
		.then(async (response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return response.json() as Promise<LyneAPI.Rankings>;
		})
		.then((data) => {
			for (const item of data.items) {
				players.push(item.user.username);
			}
		});

	// Get players
	for (const player of players) {
		// eslint-disable-next-line no-await-in-loop
		const user = await fetch("https://api.lyne.pp.ua/users/" + player).then(async (response) => {
			if (!response.ok) {
				throw new Error(`Error when fetching user ${player}: ${response.statusText}`);
			}

			return response.json() as Promise<LyneAPI.User>;
		});

		if (user.stats.totalPp < lowest) {
			break;
		}

		const { topScores } = user;

		for (const score of topScores) {
			if (score.pp > lowest || plays.length < 25) {
				score.user = player;
				plays.push(score);
			} else {
				break;
			}
		}

		plays.sort((a, b) => b.pp - a.pp);
		plays = plays.slice(0, 25);
		lowest = plays.at(-1)!.pp ?? -2;
		console.log(`Processed ${player}, lowest is now ${lowest}`);
	}

	return { topPlays: plays, date: new Date() };
};
