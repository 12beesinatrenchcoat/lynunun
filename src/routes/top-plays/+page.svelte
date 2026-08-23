<script lang="ts">
	import type { PageProps } from "./$types";

	const { data }: PageProps = $props();
</script>

<p class="accent subtitle">// THE FINEST PERFORMANCES</p>
<h1>Top Plays</h1>
<p class="subtitle">
	top 25 ◆ last updated {data.date.toISOString().replaceAll(/T|Z/gv, " ").slice(0, 16)} (UTC)
</p>

<svelte:head>
	<title>LYNUNUN: Top Plays</title>
</svelte:head>

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
				<td>#{i + 1}</td>
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
							<span>
								{play.tierCounts.perfect}/{play.tierCounts.great}/{play.tierCounts.good}/{play
									.tierCounts.miss}
							</span>
							<span>{(play.accuracy * 100).toFixed(2)}%</span>
						</span>
					</div>
				</td>
				<td>
					<span class="pp">
						{play.pp.toFixed(3)}
					</span> pp
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<h2>Additional Notes</h2>
<p>
	I am only able to fetch the top 10 scores of each user through the API. If a player somehow has
	more than 10 top plays that deserve to be featured here, only the top 10 will be counted.<br />
	This is automatically updated every day at approximately 00:00 UTC and 12:00 UTC.<br />
	Historical data is not shown, but is planned for the future. Eventually.
</p>

<style>
	table {
		border-collapse: collapse;
		width: 100%;
	}

	thead {
		font-family: "IBM Plex Mono", monospace;
		text-align: left;
		text-transform: uppercase;
		color: var(--fg-mid);
		background: var(--bg-b);
	}

	th,
	td {
		padding: 0.5ch 1ch;
	}

	tr[data-id] {
		cursor: pointer;
	}

	tr {
		border-bottom: 1px solid var(--fg-dim);
	}

	tbody > :nth-child(1) {
		background: var(--gold-gradient);

		td:first-child {
			color: var(--gold);
		}
	}

	tbody > :nth-child(2) {
		background: var(--silver-gradient);

		td:first-child {
			color: var(--silver);
		}
	}

	tbody > :nth-child(3) {
		background: var(--bronze-gradient);

		td:first-child {
			color: var(--bronze);
		}
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
		color: var(--red);
		font-family: "IBM Plex Mono", monospace;
		font-size: var(--text-lg);
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
</style>
