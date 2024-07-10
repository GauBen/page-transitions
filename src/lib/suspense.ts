import type { Navigation } from '@sveltejs/kit';
import { getContext, onDestroy, setContext } from 'svelte';
import { derived, writable, type Writable } from 'svelte/store';

/**
 * Returns a stored function that returns whether the suspense should handle the navigation or let
 * another one do it.
 */
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
		childrenContext,
		($children) => ($navigating: Navigation) =>
			bestLayout(layout, $navigating) && !($children && bestLayout($children, $navigating))
	);
};

export const bestLayout = (layout: string, { from, to }: Navigation) =>
	from?.url.pathname.startsWith(layout) && to?.url.pathname.startsWith(layout);
