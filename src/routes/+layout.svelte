<script lang="ts">
	import { navigating, page } from '$app/stores';
	import '../app.css';
</script>

<nav>
	<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : 'false'}>Home</a>
	<a href="/slow" aria-current={$page.url.pathname === '/slow' ? 'page' : 'false'}>Slow page</a>
</nav>

<main>
	{#if $navigating}
		<div class="spinner-wrapper">
			<div class="spinner" />
		</div>
	{:else}
		<slot />
	{/if}
</main>

<style>
	nav {
		display: flex;
		gap: 0.5rem;
	}

	nav a {
		padding: 0.5rem;
		border-radius: 0.25rem;
		background: #eee;
		color: #000;
		text-decoration: none;
		transition: background 0.2s ease-in-out;
	}

	nav a[aria-current='page'] {
		background: #aaf;
	}

	.spinner-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-block: 2rem;
	}

	.spinner {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 5px solid #000;
		border-top-color: #fff;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
