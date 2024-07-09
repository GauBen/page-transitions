<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import type { Writable } from 'svelte/store';

	const emptyPageStore = getContext<Writable<boolean>>('empty-page');
	if (emptyPageStore) {
		emptyPageStore.set(true);
		onDestroy(() => {
			emptyPageStore.set(false);
		});
	}
</script>
