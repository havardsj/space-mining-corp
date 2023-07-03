<script lang="ts">
	import { onMount } from 'svelte';

	import { gameStore } from '../stores/gameStore';
	import handleMiners from '../gameLogic/crew/miners';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import checkMilestoneProgress from '../gameLogic/milestones';

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
		const previousCount = $gameStore.resources.rock.current;
		handleMiners($gameStore);

		// calculate amount of a specific resource generated per tick
		$gameStore.resources.rock.perTick = $gameStore.resources.rock.current - previousCount;
		checkMilestoneProgress($gameStore);
	}
</script>

<main>
	<h1 class="text-3xl text-center">Space Mining Corp</h1>
	<div class="flex flex-col gap-12">
		<div>
			<h3 class="text-2xl">Resources:</h3>
			<div class="flex gap-4 items-center">
				<span
					>Rock: {Math.floor($gameStore.resources.rock.current)} | {$gameStore.resources.rock.perTick.toFixed(
						2
					)} /t</span
				>
				<button
					type="button"
					on:click={() => {
						$gameStore.resources.rock.current += 1;
						const toast = {
							message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...'
						};
						toastStore.trigger(toast);
					}}
					class="btn variant-filled btn-sm">Mine</button
				>
			</div>
			<div class="flex gap-4 items-center">
				<span>Gold: {Math.floor($gameStore.resources.gold.current)}</span>
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
						class="btn-icon variant-filled btn-icon-sm"
					>
						-
					</button>
					<button
						on:click={() => {
							$gameStore.crew.roles.miners += 1;
							$gameStore.crew.active += 1;
						}}
						disabled={$gameStore.crew.available === $gameStore.crew.active}
						type="button"
						class="btn-icon variant-filled btn-icon-sm"
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
						class="btn-icon variant-filled btn-icon-sm"
					>
						-
					</button>
					<button
						on:click={() => ($gameStore.upgrades.mechanicWorkshop.active += 1)}
						disabled={$gameStore.upgrades.mechanicWorkshop.active ===
							$gameStore.upgrades.mechanicWorkshop.available}
						class="btn-icon variant-filled btn-icon-sm"
					>
						+
					</button>
				</div>
			</div>
			<div class="flex gap-4">
				<span
					>Mining experts: {$gameStore.upgrades.miningExperts.active} / {$gameStore.upgrades
						.miningExperts.available}</span
				>
				<div>
					<button
						on:click={() => ($gameStore.upgrades.miningExperts.active -= 1)}
						disabled={$gameStore.upgrades.miningExperts.active === 0}
						class="btn-icon variant-filled btn-icon-sm"
					>
						-
					</button>
					<button
						on:click={() => ($gameStore.upgrades.miningExperts.active += 1)}
						disabled={$gameStore.upgrades.miningExperts.active ===
							$gameStore.upgrades.miningExperts.available}
						class="btn-icon variant-filled btn-icon-sm"
					>
						+
					</button>
				</div>
			</div>
		</div>
	</div>
</main>
