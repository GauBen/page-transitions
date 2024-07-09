<script>
	import SuspensePanel from '$lib/SuspensePanel.svelte';
</script>

<h1>B</h1>

<table>
	{#each ['fourth', 'fifth', 'sixth'] as el}
		<tr>
			<td><a href="/nested/b/{el}">{el}</a></td>
			<td>{el.length}</td>
			<td>{[].toSorted.call(el).join('')}</td>
		</tr>
	{/each}
</table>

<SuspensePanel layout="/nested/b">
	<slot />
</SuspensePanel>

<style>
	table {
		margin: 1rem;
		border-collapse: collapse;
	}

	td {
		border: 1px solid #000;
		padding: 1rem;
	}
</style>
