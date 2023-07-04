// persistentStore.js
import { writable } from 'svelte/store';

function createPersistentStore(key: string, initialValue: string) {
	const storedValue = localStorage.getItem(key);
	const initialData = storedValue ? JSON.parse(storedValue) : initialValue;
	const store = writable(initialData);

	store.subscribe((value) => {
		localStorage.setItem(key, JSON.stringify(value));
	});

	return store;
}

export default createPersistentStore;
