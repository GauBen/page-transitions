<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { tick } from 'svelte';
	import '../app.css';
	import { browser } from '$app/environment';

	let showSpinner = false;

	$: if ($navigating) {
		if (document.startViewTransition) {
			document.startViewTransition(async () => {
				showSpinner = true;
				await tick();
				if (!$navigating) showSpinner = false;
			});
		} else {
			// For browsers that don't support view transitions
			showSpinner = true;
		}
	} else {
		showSpinner = false;
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<nav>
	<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : 'false'}>Home</a>
	<a href="/slow" aria-current={$page.url.pathname === '/slow' ? 'page' : 'false'}>Slow page</a>
</nav>

<main>
	{#if showSpinner}
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

	/* Animation copied from https://developer.chrome.com/docs/web-platform/view-transitions/ */
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		:root::view-transition-old(root) {
			animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
				300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
		}

		:root::view-transition-new(root) {
			animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
				300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
		}
	}
</style>
