<script>
	import { resolve } from "$app/paths";
</script>

<div class="flex-column-center">
	<h1 id="error-head">404</h1>

	<div id="error-box">
		<h2>GAME OVER</h2>
		<p>u need more practice</p>
	</div>

	<br />

	<span>
		<a class="button-link" href="https://youtu.be/dQw4w9WgXcQ">RICKROLL</a>
		<a class="button-link" href={resolve("/")}>GO HOME</a>
	</span>
</div>

<style>
	.flex-column-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2em 0;
	}

	#error-head {
		font-size: var(--text-5xl);
		font-style: italic;
		color: transparent;
		-webkit-text-stroke: 1px var(--red);
	}

	#error-box {
		border: 1px solid var(--fg-dim);
		padding: 1em;
		width: 28ch;
		text-align: center;
		transform: rotate(5deg);
	}

	/* Just for higher priority */
	#error-box > * {
		font-family: "IBM Plex Mono", monospace;
		color: var(--fg-mid);
		text-transform: uppercase;
	}
</style>
