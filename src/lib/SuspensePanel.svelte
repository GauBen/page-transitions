<script lang="ts">
	import { navigating, page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { createSuspenseContext } from './suspense.js';

	export let layout: string;

	const showSpinner = createSuspenseContext(layout);

	$: open = ($navigating?.to ?? $page).url.pathname.startsWith(layout + '/');
</script>

{#if open}
	<aside transition:fly={{ x: 320 }}>
		{#if $showSpinner}
			<div class="spinner-wrapper">
				<div class="spinner" />
			</div>
		{:else}
			<slot />
		{/if}
	</aside>
{/if}

<style>
	aside {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 200;
		width: 320px;
		max-width: 100%;
		padding: 0 0.5rem;
		overflow-y: auto;
		overscroll-behavior: contain;
		background: #fff;
		border-left: 1px solid #ccc;
		transition: 150ms transform;
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
