<script lang="ts">
	import { page } from '$app/stores';
	import Suspense from '$lib/Suspense.svelte';
	import { setContext } from 'svelte';
	import '../app.css';

	setContext('suspense', []);
</script>

<nav>
	<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : 'false'}>Home</a>
	<a href="/slow" aria-current={$page.url.pathname === '/slow' ? 'page' : 'false'}>Slow page</a>
	<a href="/nested/a" aria-current={$page.url.pathname.startsWith('/nested') ? 'page' : 'false'}>
		Nested
	</a>
</nav>

<main>
	<Suspense layout=""><slot /></Suspense>
</main>

<style>
	nav {
		display: flex;
		gap: 0.5rem;
		view-transition-name: nav;
	}

	nav a {
		padding: 0.5rem;
		border-radius: 0.25rem;
		background: #eee;
		color: #000;
		text-decoration: none;
	}

	nav a[aria-current='page'] {
		background: #aaf;
	}
</style>
