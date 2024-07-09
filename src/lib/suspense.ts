import { navigating } from '$app/stores';
import type { Navigation } from '@sveltejs/kit';
import { getContext, onDestroy, setContext } from 'svelte';
import { derived, writable, type Writable } from 'svelte/store';

export const createSuspenseContext = (layout: string) => {
	// Communicate with parent suspense
	const parentContext = getContext<Writable<string | undefined>>('suspense') ?? writable();
	parentContext.set(layout);

	onDestroy(() => {
		parentContext.set(undefined);
	});

	// Communicate with children suspenses
	const childrenContext = setContext('suspense', writable<string | undefined>());

	return derived(
		[navigating, childrenContext],
		([$navigating, $children]) =>
			$navigating &&
			bestLayout(layout, $navigating) &&
			(!$children || !bestLayout($children, $navigating))
	);
};

export const bestLayout = (layout: string, { from, to }: Navigation) =>
	from?.url.pathname.startsWith(layout) && to?.url.pathname.startsWith(layout);
