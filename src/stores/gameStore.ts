import { writable } from 'svelte/store';

const initialState = {
	resources: {
		rock: 0,
		diamonds: 0
	},
	crew: {
		active: 0,
		available: 0,
		roles: {
			miners: 0,
			mechanics: 0,
			soldiers: 0
		}
	},
	upgrades: {
		automatedMiner: {
			active: 0,
			available: 8
		},
		mechanicWorkshop: {
			active: 0,
			available: 0
		}
	}
};

export const gameStore = writable(initialState);
