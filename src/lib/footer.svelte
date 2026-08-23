<script>
	import GameName from "$lib/gamename.svelte";
</script>

<footer>
	<div>
		bullshit on a tangential horizon <br />
		this project is not affiliated with the <GameName /> project ◆ built on sveltekit
	</div>
	<!-- Cute face. -->
	<span class="footer-watermark" aria-hidden="true"> (๑╹ᆺ╹) </span>
</footer>

<style>
	footer {
		background: var(--bg-a);
		border-top: 1px solid var(--fg-dim);
		color: var(--fg-mid);
		display: block;

		margin: 1em -2rem 0;
		padding: 4rem 2rem 8rem;

		line-height: 1.5;
		font-family: "IBM Plex Mono", monospace;
		font-size: var(--text-sm);
		font-weight: 500;
		text-align: right;
		text-transform: uppercase;
		position: relative;
		overflow: hidden;
	}

	footer > div {
		margin: auto;
		max-width: 1440px;
	}

	.footer-watermark {
		color: transparent;
		letter-spacing: 0.1ch;
		font-family: "Saira Condensed";
		font-style: italic;
		font-size: var(--text-5xl);
		line-height: 1;
		-webkit-text-stroke: 1px var(--fg-dim);
		opacity: 0.6;

		position: absolute;
		right: 0.3ch;
		bottom: -2.25rem;
		width: max-content;

		user-select: none;
	}
</style>
