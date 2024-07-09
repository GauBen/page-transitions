<script>
	import { page } from '$app/stores';
</script>

{$page.params.el}

<a href="/nested/b/{$page.params.el}">to b</a>
