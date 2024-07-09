<script>
	import { page } from '$app/stores';
</script>

{$page.params.el}

<a href="/nested/a/{$page.params.el}">to a</a>
