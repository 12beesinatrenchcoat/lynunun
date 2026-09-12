<script lang="ts">
	import { SvelteMap } from "svelte/reactivity";

	const { data } = $props();

	const control = $derived.by(() => {
		const output: Map<string, [number, string]> = new SvelteMap();

		output.set("Panzer", [0, "#E2BDEA"]);

		for (const leaderboard of Object.values(data.mapLeaderboards)) {
			const controlledBy = leaderboard[0].user.username;
			const color = leaderboard[0].user.nameColour;
			const value = (output.get(controlledBy)?.[0] || 0) + 1;
			output.set(controlledBy, [value, color]);
		}

		return output;
	});
</script>

<p class="subtitle accent">// community-assisted regicide</p>
<h1>Panzer Sniping Contest #1</h1>
<p class="subtitle">
	last updated {data.date.toISOString().replaceAll(/T|Z/gv, " ").slice(0, 16)} (UTC)
</p>

<p>A challenge from Panzer: snipe as many of his #1 scores as possible. Good luck.</p>

<section>
	<h2>Control</h2>
	<div id="control">
		{#each control as [username, value] (username)}
			<section>
				<div>
					<h3>{username}</h3>
					<span class="control-count">
						{control.get(username)?.[0]}
					</span>
				</div>
				<div class="control-grid" style:--accent={value[1]}>
					<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
					{#each Array.from({ length: control.get(username)?.[0] || 0 }) as _, i (username + i)}
						<div class="control-block"></div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</section>

<section>
	<h2>Full List</h2>
	<div id="map-list">
		{#each Object.entries(data.mapLeaderboards) as [mapId, leaderboard] (mapId)}
			{@const map = data.mapData[Number(mapId)]}

			<div
				class="map"
				style:--background="url(https://api.zxz.moe{map.thumbnailUrl})"
				style:--accent={leaderboard[0].user.nameColour}
			>
				<a href="https://syne.zxz.moe/maps/{mapId}" class="map-info">
					<p class="song-info">
						<span class="song-title">{map.title}</span> by {map.artist}
					</p>
					<p class="map-difficulty">
						{map.difficultyName} ◆{map.starRating.toFixed(2)}
					</p>
				</a>

				<a href="https://syne.zxz.moe/scores/{leaderboard[0].id}" class="play-info">
					<p class="username">{leaderboard[0].user.username}</p>
					<p class="pp"><span>{leaderboard[0].pp.toFixed(2)}</span> pp</p>
					<p class="pp-delta">+{(leaderboard[0].pp - leaderboard[1].pp).toFixed(2)} pp</p>
				</a>
			</div>
		{/each}
	</div>
</section>

<style>
	a {
		text-decoration: none;
	}

	div h3 {
		display: inline-block;
	}

	#control {
		display: flex;
		flex-direction: row;
		gap: 2ch;

		section {
			max-width: 18ch;
			flex-grow: 1;
			flex-shrink: 1;
		}
	}

	.control-count {
		font-family: "IBM Plex Mono";
	}

	.control-grid {
		display: flex;
		gap: 0.75ch;
		flex-wrap: wrap;
	}

	.control-block {
		width: 1.5ch;
		height: 1.5ch;
		background: var(--accent, #34e2de);
	}

	#map-list {
		> * + * {
			margin-top: 1em;
		}
	}

	.map {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		background: #000a;
		padding: 0.5rem;
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);

		&::before {
			position: absolute;
			content: "";
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background:
				linear-gradient(#000a, #000a),
				var(--background) center;
			z-index: -1;
		}

		&::after {
			position: absolute;
			content: "";
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: var(--accent, #34e2de);
			clip-path: polygon(
				0 0,
				100% 0,
				100% calc(100% - 20px),
				calc(100% - 20px) 100%,
				0 100%,
				0 0,
				1px 1px,
				1px calc(100% - 1px),
				calc(100% - 20px - 0.41px) calc(100% - 1px),
				calc(100% - 1px) calc(100% - 20px - 0.41px),
				calc(100% - 1px) 1px,
				1px 1px
			);
		}
	}

	.map > * {
		display: flex;
		font-size: var(--text-sm);
		font-family: "Saira", sans-serif;
	}

	.map-info,
	.play-info {
		flex-direction: column;
		transition: all 0.125s;
	}

	.map-info {
		flex-grow: 1;
		transform-origin: center left;

		&:hover {
			transform: scale(1.1);
		}
	}

	.song-title {
		font-size: var(--text-md);
		font-weight: 500;
	}

	.map-difficulty {
		font-family: "IBM Plex Mono", monospace;
	}

	.play-info {
		width: 16ch;
		background: color-mix(in srgb, var(--accent, #34e2de) 75%, transparent 50%);
		margin: -0.5rem;
		padding: 0.5rem 3ch 0.5rem 2ch;
		backdrop-filter: blur(4px);
		transform-origin: center right;
		overflow: hidden;
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);

		.username {
			font-size: var(--text-md);
			font-family: "Saira Condensed", sans-serif;
			font-weight: 600;
			text-transform: uppercase;
		}
		.pp,
		.pp-delta {
			font-family: "IBM Plex Mono", monospace;
			text-align: right;
		}

		.pp-delta {
			margin-top: -0.25rem;
		}

		.pp > span {
			font-size: var(--text-md);
			font-weight: 600;
		}

		&:hover {
			transform: scale(1.05);
		}
	}
</style>
