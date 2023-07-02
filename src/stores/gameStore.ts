import { writable } from 'svelte/store';

const initialState = {
	resources: {
		rock: 0,
		diamonds: 0
	},
	crew: {
		miners: 0,
		mechanics: 0,
		soldiers: 0
	},
	upgrades: {
		automatedMiner: false,
		mechanicWorkshop: false
	}
};

export const gameStore = writable(initialState);
