import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initialState = {
	time: {
		tick: 1,
		year: 1,
		month: 1,
		day: 1
	},
	hasLoaded: true,
	lastSave: null,
	resources: {
		rock: {
			displayName: 'Rock',
			current: 0,
			lifetime: 0,
			perTick: 0
		},
		gold: {
			displayName: 'Gold',
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

// const saveData = JSON.parse(browser && localStorage.getItem('saveData')) || initialState;
// export const gameStore = writable(browser && saveData);
const saveData = JSON.parse(
	(browser && localStorage.getItem('saveData')) || JSON.stringify(initialState)
);
export const gameStore = writable(browser && saveData);
