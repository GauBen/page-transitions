<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import SidePanel from './SidePanel.svelte';
	import Suspense from './Suspense.svelte';

	const emptyPage = setContext('empty-page', writable(false));
</script>

<SidePanel open={!$emptyPage}>
	<Suspense>
		<slot />
	</Suspense>
</SidePanel>
