<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/lynunun.svg";
	import Nav from "$lib/nav.svelte";
	import Footer from "$lib/footer.svelte";

	const { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />

<main>
	{@render children()}
</main>

<Footer />
