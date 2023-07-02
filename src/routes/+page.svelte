<script lang="ts">
	import { onMount } from 'svelte';

	import { gameStore } from '../stores/gameStore';

	onMount(() => {
		startGameLoop();
	});

	// Game loop
	function startGameLoop(): void {
		const updateInterval = 1000 / 10; // 30 FPS

		setInterval(() => {
			// Game logic
			updateGameLogic();
		}, updateInterval);
	}

	// Update game logic
	function updateGameLogic(): void {
		if ($gameStore.upgrades.automatedMiner.active >= 1) {
			$gameStore.resources.rock += $gameStore.upgrades.automatedMiner.active * 0.1;
		}
		// $gameStore.resources.rock += 1;
	}

	function calculateResourceGainPerSecond(resource: number) {
		// TODO: calculate how much of a given resource generates per second
	}
</script>

<main>
	<h1 class="text-3xl text-center">Space Mining Corp</h1>
	<div class="flex flex-col gap-12">
		<div>
			<h3 class="text-2xl">Resources:</h3>
			<div class="flex gap-4 items-center">
				<span>Rock: {$gameStore.resources.rock.toFixed(3)}</span>
				<button
					on:click={() => {
						$gameStore.resources.rock += 1;
					}}
					class="btn btn-primary btn-xs">Mine</button
				>
			</div>
		</div>
		<div class="flex gap-2 flex-col">
			<h3 class="text-2xl">
				Crew: {$gameStore.crew.active} / {$gameStore.crew.available}
			</h3>
			<span>Miners: {$gameStore.crew.roles.miners}</span>
			<span>Mechanics: {$gameStore.crew.roles.mechanics}</span>
			<span>Soldiers: {$gameStore.crew.roles.soldiers}</span>
		</div>
		<div class="flex gap-2 flex-col">
			<h3 class="text-2xl">Upgrades:</h3>
			<div class="flex gap-4">
				<span
					>Automated Miners: {$gameStore.upgrades.automatedMiner.active} / {$gameStore.upgrades
						.automatedMiner.available}</span
				>

				<div>
					<button
						on:click={() => ($gameStore.upgrades.automatedMiner.active -= 1)}
						disabled={$gameStore.upgrades.automatedMiner.active === 0}
						class="btn btn-square btn-outline btn-xs"
					>
						-
					</button>
					<button
						on:click={() => ($gameStore.upgrades.automatedMiner.active += 1)}
						disabled={$gameStore.upgrades.automatedMiner.active ===
							$gameStore.upgrades.automatedMiner.available}
						class="btn btn-square btn-outline btn-xs"
					>
						+
					</button>
				</div>
			</div>
			<div class="flex gap-4">
				<span
					>Mechanic Workshop: {$gameStore.upgrades.mechanicWorkshop.active} / {$gameStore.upgrades
						.mechanicWorkshop.available}</span
				>
				<div>
					<button
						on:click={() => ($gameStore.upgrades.mechanicWorkshop.active -= 1)}
						disabled={$gameStore.upgrades.mechanicWorkshop.active === 0}
						class="btn btn-square btn-outline btn-xs"
					>
						-
					</button>
					<button
						on:click={() => ($gameStore.upgrades.mechanicWorkshop.active += 1)}
						disabled={$gameStore.upgrades.mechanicWorkshop.active ===
							$gameStore.upgrades.mechanicWorkshop.available}
						class="btn btn-square btn-outline btn-xs"
					>
						+
					</button>
				</div>
			</div>
		</div>
	</div>
</main>
