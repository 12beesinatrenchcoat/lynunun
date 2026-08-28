<script lang="ts">
	import type { PageProps } from "./$types";

	const { data }: PageProps = $props();
</script>

<p class="accent subtitle">// THE FINEST PERFORMANCES</p>
<h1>Top Plays</h1>
<p class="subtitle">
	top 50 ◆ last updated {data.date.toISOString().replaceAll(/T|Z/gv, " ").slice(0, 16)} (UTC)
</p>

<svelte:head>
	<title>LYNUNUN: Top Plays</title>
</svelte:head>

<div id="table-wrapper">
	<table>
		<thead>
			<tr>
				<th scope="col">Rank</th>
				<th scope="col">Player</th>
				<th scope="col">Map</th>
				<th scope="col">Performance</th>
			</tr>
		</thead>
		<tbody>
			{#each data.topPlays as play, i (play.id)}
				<tr data-id={play.id} onclick={() => window.open("https://syne.zxz.moe/scores/" + play.id)}>
					<td class="rank">#{i + 1}</td>
					<td>{play.user}</td>
					<td>
						<div class="play-map">
							<span class="song-title">
								{play.map.title}
								<div class="artist-name">
									by {play.map.artist}
								</div>
							</span>

							<span class="sub-line">
								<span>
									{play.map.difficultyName}
									<span>◆{play.map.starRating.toFixed(2)}</span>
								</span>
								<span>
									{play.mods.join(" ") || "-"}
								</span>
								<span class="mobile-hide">
									{play.tierCounts.perfect}/{play.tierCounts.great}/{play.tierCounts.good}/{play
										.tierCounts.miss}
								</span>
								<span>{(play.accuracy * 100).toFixed(2)}%</span>
							</span>
						</div>
					</td>
					<td class="pp">
						<span class="pp-value">
							{play.pp.toFixed(2)}
						</span>
						<span class="mobile-hide">pp</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<h2>Additional Notes</h2>
<p>
	To get this leaderboard, I get the top players, and then run through *all* of their top plays,
	repeatedly filtering and sorting until I get the top 50.
	<small
		>Previously I was only able to get the top 10 top scores, this is no longer the case; now all
		top scores are processed.</small
	>
</p>

<p>
	This is automatically updated every day at approximately 00:05 UTC and 12:05 UTC. <small
		>Assuming GitHub works.</small
	><br />
	Historical data is not shown, but is planned for the future. Eventually.
</p>

<style>
	table {
		border-collapse: collapse;
		min-width: 60ch;
		width: 100%;
	}

	thead {
		font-family: "IBM Plex Mono", monospace;
		text-align: left;
		text-transform: uppercase;
		color: var(--fg-mid);
		background: var(--bg-b);

		position: sticky;
		top: 5rem;
	}

	th,
	td {
		padding: 0.5ch 1ch;
		height: 100%;
		vertical-align: middle;
	}

	tr[data-id] {
		cursor: pointer;
	}

	tr {
		vertical-align: middle;
		border-bottom: 1px solid var(--fg-dim);
	}

	tbody > tr {
		transition: all 0.1s;
		&:hover {
			scale: 1.025;
			background-color: var(--bg-a-tl);
			box-shadow: 0 0 2px 2px var(--fg-dim);
			z-index: 10;
		}
	}

	tbody > :nth-child(1) {
		background-image: var(--gold-gradient);

		td:first-child {
			color: var(--gold);
		}
	}

	tbody > :nth-child(2) {
		background-image: var(--silver-gradient);

		td:first-child {
			color: var(--silver);
		}
	}

	tbody > :nth-child(3) {
		background-image: var(--bronze-gradient);

		td:first-child {
			color: var(--bronze);
		}
	}

	.rank {
		font-family: "IBM Plex Mono", monospace;
		width: 3.5ch;
	}

	.artist-name {
		font-size: var(--text-sm);
	}

	.play-map {
		display: flex;
		flex-direction: column;
		padding-right: 1ch;
	}

	.pp {
		text-align: right;
	}

	.pp-value {
		color: var(--red);
		font-size: var(--text-lg);
		font-family: "IBM Plex Mono", monospace;
	}

	.song-title {
		display: flex;
		flex-direction: row;
		gap: 0 0.5ch;
		align-items: baseline;
		flex-wrap: wrap;
	}

	.sub-line {
		display: flex;
		flex-wrap: wrap;
		gap: 0 2ch;

		color: var(--fg-mid);
		font-size: var(--text-sm);
		font-family: "IBM Plex Mono", monospace;
	}

	@media (max-width: 640px) {
		#table-wrapper {
			max-width: calc(100% + 4rem);
			overflow-x: scroll;
			margin: 0 -2rem 1rem;
		}

		thead {
			position: static;
		}

		tr:hover {
			scale: 1 !important;
		}

		.mobile-hide {
			display: none;
		}
	}
</style>
