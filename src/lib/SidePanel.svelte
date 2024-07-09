<script lang="ts">
	export let open = false;
</script>

<div style:transform={open ? 'none' : undefined}>
	<slot />
</div>

<style>
	div {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 200;
		width: 320px;
		transform: translateX(100%);
		max-width: 100%;
		padding: 0 0.5rem;
		overflow-y: auto;
		overscroll-behavior: contain;
		background: #fff;
		border-left: 1px solid #ccc;
		transition: 150ms transform;
	}
</style>
