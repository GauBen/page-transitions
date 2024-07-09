<script>
	import SuspensePanel from '$lib/SuspensePanel.svelte';
</script>

<h1>A</h1>

<table>
	{#each ['first', 'second', 'third'] as el}
		<tr>
			<td><a href="/nested/a/{el}">{el}</a></td>
			<td>{el.length}</td>
			<td>{[].toSorted.call(el).join('')}</td>
		</tr>
	{/each}
</table>

<SuspensePanel layout="/nested/a">
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
