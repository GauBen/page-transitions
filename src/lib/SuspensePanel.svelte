<script lang="ts">
	import { navigating, page } from '$app/stores';
	import SidePanel from './SidePanel.svelte';
	import { createSuspenseContext } from './suspense.js';

	export let layout: string;

	const showSpinner = createSuspenseContext(layout);

	$: open = ($navigating?.to ?? $page).url.pathname.startsWith(layout + '/');
</script>

<SidePanel {open}>
	{#if $navigating && $showSpinner($navigating)}
		<div class="spinner-wrapper">
			<div class="spinner" />
		</div>
	{:else}
		<slot />
	{/if}
</SidePanel>

<style>
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
