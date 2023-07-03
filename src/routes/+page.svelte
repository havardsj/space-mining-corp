<script lang="ts">
	import { onMount } from 'svelte';

	import { gameStore } from '../stores/gameStore';

	onMount(() => {
		startGameLoop();
	});

	// Game loop
	function startGameLoop(): void {
		const updateInterval = 1000 / 10; // 10 FPS

		setInterval(() => {
			// Game logic
			updateGameLogic();
		}, updateInterval);
	}

	// Update game logic
	function updateGameLogic(): void {
		const previousCount = $gameStore.resources.rock.amount;

		if ($gameStore.crew.roles.miners >= 1) {
			$gameStore.resources.rock.amount += $gameStore.crew.roles.miners * 0.1;
		}

		// calculate amount of a specific resource generated per tick
		$gameStore.resources.rock.perTick = $gameStore.resources.rock.amount - previousCount;
	}
</script>

<main>
	<h1 class="text-3xl text-center">Space Mining Corp</h1>
	<div class="flex flex-col gap-12">
		<div>
			<h3 class="text-2xl">Resources:</h3>
			<div class="flex gap-4 items-center">
				<span
					>Rock: {$gameStore.resources.rock.amount.toFixed(1)} | {$gameStore.resources.rock.perTick.toFixed(
						2
					)} /t</span
				>
				<button
					on:click={() => {
						$gameStore.resources.rock.amount += 1;
					}}
					class="btn btn-primary btn-xs">Mine</button
				>
			</div>
		</div>
		<div class="flex gap-2 flex-col">
			<h3 class="text-2xl">
				Crew: {$gameStore.crew.active} / {$gameStore.crew.available}
			</h3>

			<div class="flex gap-4">
				<span>Miners: {$gameStore.crew.roles.miners}</span>
				<div>
					<button
						on:click={() => {
							$gameStore.crew.roles.miners -= 1;
							$gameStore.crew.active -= 1;
						}}
						disabled={$gameStore.crew.roles.miners === 0}
						class="btn btn-square btn-outline btn-xs"
					>
						-
					</button>
					<button
						on:click={() => {
							$gameStore.crew.roles.miners += 1;
							$gameStore.crew.active += 1;
						}}
						disabled={$gameStore.crew.available === $gameStore.crew.active}
						class="btn btn-square btn-outline btn-xs"
					>
						+
					</button>
				</div>
			</div>
			<span>Mechanics: {$gameStore.crew.roles.mechanics}</span>
			<span>Soldiers: {$gameStore.crew.roles.soldiers}</span>
		</div>
		<div class="flex gap-2 flex-col">
			<h3 class="text-2xl">Upgrades:</h3>
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
