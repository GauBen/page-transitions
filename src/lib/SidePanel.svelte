<script lang="ts">
	import { fly } from 'svelte/transition';

	export let open = false;
</script>

{#if open}
	<aside transition:fly={{ x: 320 }}>
		<slot />
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
</style>
