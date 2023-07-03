import { writable } from 'svelte/store';

const initialState = {
	resources: {
		rock: {
			current: 0,
			lifetime: 0,
			perTick: 0
		},
		gold: {
			current: 0,
			lifetime: 0,
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
			available: 2
		},
		mechanicWorkshop: {
			active: 0,
			available: 0
		}
	},
	milestones: {
		rockCollector: {
			title: 'Rock collector',
			description: "You've collected enough rocks to start finding gold",
			requirementResource: 'rock',
			requirementAmount: 20,
			unlocked: false
		},
		goldDigger: {
			title: 'Gold digger',
			description: 'You have found some gold',
			requirementResource: 'gold',
			requirementAmount: 10,
			unlocked: false
		}
	},
	utils: {
		lastUpdateTime: 0
	},
	log: []
};

export const gameStore = writable(initialState);
