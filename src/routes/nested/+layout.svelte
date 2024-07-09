<script>
	import Suspense from '$lib/Suspense.svelte';
</script>

<div class="grid">
	<ul>
		<li><a href="/nested/a">Aaaaaaa</a></li>
		<li><a href="/nested/b">Bbbbbbb</a></li>
	</ul>
	<div>
		<Suspense><slot /></Suspense>
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem;
	}
</style>
