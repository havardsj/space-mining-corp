import { writable } from 'svelte/store';

const initialState = {
	utils: {
		lastUpdateTime: 0
	},
	resources: {
		rock: {
			amount: 0,
			perTick: 0
		},
		gold: {
			amount: 0,
			perTick: 0
		}
	},
	crew: {
		active: 0,
		available: 5,
		roles: {
			miners: 0,
			mechanics: 0,
			soldiers: 0
		}
	},
	upgrades: {
		miningExperts: {
			active: 0,
			available: 0
		},
		mechanicWorkshop: {
			active: 0,
			available: 0
		}
	}
};

export const gameStore = writable(initialState);
