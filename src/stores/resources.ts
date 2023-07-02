import { writable } from 'svelte/store';

export const rock_store = writable(0);
export const diamond_store = writable(0);
export const player_upgrades_store = writable({
	rock_miners: 0,
	diamond_miners: 0
});
