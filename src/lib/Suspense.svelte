<script lang="ts">
	import { createSuspenseContext } from './suspense.js';

	export let layout: string;

	const showSpinner = createSuspenseContext(layout);

	// $: showSpinner =
	// 	$navigating &&
	// 	$navigating.from?.url.pathname.startsWith(layout) &&
	// 	$navigating.to?.url.pathname.startsWith(layout);
</script>

{#if $showSpinner}
	<div class="spinner-wrapper">
		<div class="spinner" />
	</div>
{:else}
	<slot />
{/if}

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
