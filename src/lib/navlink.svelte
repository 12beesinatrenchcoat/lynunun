<script>
	import { page } from "$app/state";

	const { href, title } = $props();
</script>

<a {href} class:active={page.url.pathname === href}>
	{title}
</a>

<style>
	a {
		text-decoration: none;
		font-weight: 500;
		color: var(--fg-mid);
		transition: color 100ms;
	}

	a:hover {
		color: var(--fg-pri);
	}

	.active {
		font-weight: 600;
		color: var(--fg-pri);
	}
</style>
