namespace LyneAPI {
	type Skills = {
		aim: number;
		accuracy: number;
		stamina: number;
		consistency: number;
		fingerControl: number;
		memory: number;
	};

	type Map = {
		id: number;
		title: string;
		artist: string;
		difficultyName: string;
		starRating: number;
		status: "ranked" | "approved" | "wip" | "pending" | "graveyard";
		thumbnailUrl: string;
	};

	type Score = {
		id: number;
		mapId: number;
		user?: string;
		map: Map;
		score: number;
		accuracy: number;
		maxCombo: number;
		tierCounts: { perfect: number; great: number; good: number; miss: number };
		mods: string[];
		grade: "SS" | "S" | "A" | "B" | "C" | "D";
		pp: number;
		grantsPp: boolean;
		hasReplay: boolean;
		submittedAt: string;
		gameplayContext: string;
		multiplayerMatchId: number;
	};

	// https://api.lyne.pp.ua/rankings/global
	type Rankings = {
		items: Array<{
			rank: number;
			user: { id: number; username: string; country: string };
			totalPp: number;
			accuracy: number;
			playCount: number;
			rankedScoreCount: number;
			skills: Skills;
		}>;
	};

	// https://api.lyne.pp.ua/users/[username]
	type User = {
		id: number;
		username: string;
		joinedAt: string;
		previousUsernames: string[];
		stats: {
			totalPp: number;
			globalRank: number;
			accuracy: number;
			playCount: number;
			playTimeMs: number;
			rankedScoreCount: number;
			mappingPoints: number;
			level: number;
			totalXp: number;
			xpThisLevel: number;
			xpForNextLevel: number;
			totalScore: number;
			gradeCounts: { ss: number; s: number; a: number; b: number; c: number; d: number };
		};
		skills: Skills;
		skillPercentiles: Skills;
		topScores: Score[];
	};

	// https://api.lyne.pp.ua/users/[username]/scores
	type UserScores = {
		items: Score[];
	};
}

export type { LyneAPI };
