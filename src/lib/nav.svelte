<script lang="ts">
	import { resolve } from "$app/paths";
	import Navlink from "$lib/navlink.svelte";
	import Lynunnun from "$lib/assets/lynunun.svg?raw";

	const navItems = [
		// [resolve("/history"), "Leaderboard History"],
		[resolve("/top-plays"), "Top Plays"],
		[resolve("/tomato"), "Picture of a Tomato"]
	];
</script>

<nav>
	<a href={resolve("/")} id="root-link">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html Lynunnun}
	</a>
	{#each navItems as navItem, i (i)}
		<Navlink href={navItem[0]} title={navItem[1]} />
	{/each}
	<span class="dim">more things wip…</span>
</nav>

<style>
	nav {
		display: flex;
		align-items: center;
		gap: 2ch;
		margin: 0 -2em 1em;
		padding: 0 1em 1em;
		border-bottom: 1px solid var(--fg-dim);

		font-family: "IBM Plex Mono", monospace;
		text-transform: uppercase;
	}

	#root-link {
		height: 3em;
	}
</style>
