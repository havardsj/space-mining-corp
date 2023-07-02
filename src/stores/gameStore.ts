import { writable } from 'svelte/store';

export type ResourceName = 'rock' | 'diamond';
export type UpgradeName = 'upgrade1' | 'upgrade2';

export interface Resources {
	[key: string]: number;
}

export interface GameStore {
	resources: Resources;
	upgrades: Upgrades;
}

export interface Upgrades {
	[key: string]: boolean;
}

const initialState: GameStore = {
	resources: {
		rock: 0,
		diamonds: 0
	},
	upgrades: {
		upgrade1: false,
		upgrade2: false
	}
};

export const gameStore = writable(initialState);
