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

<div>
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
</div>

<style>
	div {
		margin: 0 -2rem;
		border-bottom: 1px solid var(--fg-dim);
	}

	nav {
		display: flex;
		align-items: center;
		gap: 2ch;

		padding: 0 1em 1em;

		margin: auto;
		max-width: 1440px;

		font-family: "IBM Plex Mono", monospace;
		text-transform: uppercase;
	}

	#root-link {
		height: 3em;
	}
</style>
