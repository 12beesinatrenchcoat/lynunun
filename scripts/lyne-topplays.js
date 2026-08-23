import { writeFile } from "node:fs";

const players = [];
let plays = [];

let lowest = -99_999;

// Fill players
await fetch("https://api.lyne.pp.ua/rankings/global?scope=all&page=1&pageSize=50")
	.then((res) => res.json())
	.then((data) => {
		data.items.forEach((item) => {
			players.push(item.user.username);
		});
	});

// Get players
for (const player of players) {
	const user = await fetch("https://api.lyne.pp.ua/users/" + player).then((res) => res.json());

	if (user.stats.totalPp < lowest) {
		break;
	}

	const { topScores } = user;

	for (const score of topScores) {
		if (score.pp > lowest) {
			score.user = player;
			plays.push(score);
		} else {
			break;
		}
	}

	plays.sort((a, b) => b.pp - a.pp);
	plays = plays.slice(0, 25);
	lowest = plays.at(-1).pp;
	console.log(`Processed ${player}, lowest is now ${lowest}`);
}

writeFile("topPlays.json", JSON.stringify(plays), (error) => {
	if (error) {
		throw error;
	}

	console.log("topPlays.json written!");
});
