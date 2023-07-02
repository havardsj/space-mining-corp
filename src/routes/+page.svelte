<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';

	import { gameStore } from '../stores/gameStore';

	import type { GameStore, ResourceName, UpgradeName } from '../stores/gameStore';

	let gameState: GameStore;
	let canAffordUpgrade1 = false;
	let canAffordUpgrade2 = false;

	onMount(() => {
		const unsubscribe = gameStore.subscribe((value) => {
			gameState = value;
		});

		startGameLoop();

		return unsubscribe;
	});

	afterUpdate(() => {
		canAffordUpgrade1 = canAffordUpgrade('upgrade1', 'rock', 10);
		canAffordUpgrade2 = canAffordUpgrade('upgrade2', 'rock', 100);
	});

	// Game loop
	function startGameLoop(): void {
		const updateInterval = 1000 / 30; // 60 FPS

		setInterval(() => {
			// Game logic
			updateGameLogic();
		}, updateInterval);
	}

	// Update game logic
	function updateGameLogic(): void {
		// Increment the resource by a specified amount
		incrementResource('rock', 0.1);
	}

	// Increment the resource by a specified amount
	function incrementResource(resource: ResourceName, amount: number): void {
		gameStore.update((state: GameStore) => {
			return {
				...state,
				resources: {
					...state.resources,
					[resource]: state.resources[resource] + amount
				}
			};
		});
	}

	// Purchase an upgrade
	function purchaseUpgrade(upgrade: UpgradeName, resource: ResourceName, cost: number): void {
		if (gameState) {
			const canAfford = gameState.resources[resource] >= cost;

			if (canAfford) {
				gameStore.update((state: GameStore) => {
					return {
						...state,
						resources: {
							...state.resources,
							[resource]: state.resources[resource] - cost
						},
						upgrades: {
							...state.upgrades,
							[upgrade]: true
						}
					};
				});
			}
		}
	}

	// Check if the player can afford an upgrade
	function canAffordUpgrade(upgrade: UpgradeName, resource: ResourceName, cost: number): boolean {
		const resourceValue = gameState.resources[resource];
		return resourceValue >= cost;
	}
</script>

<main>
	<h1>Incremental Game</h1>
	{#if gameState}
		<p>Rocks: {Math.floor(gameState.resources.rock)}</p>
		<p>Diamonds: {Math.floor(gameState.resources.diamonds)}</p>
		<h2>Upgrades</h2>
		<div class="flex gap-2">
			<button
				class="btn btn-success"
				on:click={() => purchaseUpgrade('upgrade1', 'rock', 10)}
				disabled={!canAffordUpgrade1}>Upgrade 1 (Cost: 10)</button
			>
			<button
				class="btn btn-success"
				on:click={() => purchaseUpgrade('upgrade2', 'rock', 100)}
				disabled={!canAffordUpgrade2}>Upgrade 2 (Cost: 100)</button
			>
		</div>
	{/if}
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}
</style>
