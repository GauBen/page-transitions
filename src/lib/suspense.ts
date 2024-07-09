import { getContext, onDestroy, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export const createSuspenseContext = () => {
	// Communicate with parent suspense
	const parentContext = getContext<Writable<boolean>>('suspense') ?? writable(false);
	parentContext.set(true);

	// Communicate with children suspenses
	const childrenContext = setContext('suspense', writable(false));

	onDestroy(() => {
		parentContext.set(false);
	});

	return [parentContext, childrenContext];
};
