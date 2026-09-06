<script lang="ts">
	import { resolve } from "$app/paths";
	import Navlink from "$lib/navlink.svelte";
	import Icon from "$lib/assets/icon.svg?no-inline";

	const navItems = [
		[resolve("/top-plays"), "Top Plays"],
		[resolve("/history"), "Leaderboard History"],
		[resolve("/mapping-tools"), "Mapping Tools"],
		[resolve("/tomato"), "Picture of a Tomato"]
	];
</script>

<div>
	<nav>
		<a href={resolve("/")} id="root-link">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<img src={Icon} alt="Lynunun Icon" />
		</a>
		{#each navItems as navItem, i (i)}
			<Navlink href={navItem[0]} title={navItem[1]} />
		{/each}
		<span class="dim">more things wip…</span>
	</nav>
</div>

<style>
	div {
		margin: -1rem -2rem 1rem;
		border-bottom: 1px solid var(--fg-dim);
		position: sticky;
		top: 0;
		background: var(--bg-a-tl);
		backdrop-filter: blur(8px);
		z-index: 1000;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 2ch;

		padding: 1rem;

		margin: auto;
		max-width: 1440px;

		font-family: "IBM Plex Mono", monospace;
		font-size: var(--text-sm);
		text-transform: uppercase;
	}

	#root-link {
		height: 2.5rem;

		& > img {
			height: 100%;
		}
	}
</style>
