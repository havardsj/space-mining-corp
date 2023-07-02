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
		$gameStore.resources.rock += 1;
	}
</script>

<main>
	<h1 class="text-3xl text-center">Space Mining Corp</h1>
	<pre>{JSON.stringify($gameStore, null, 2)}</pre>
	<div>
		<span>Rock: {$gameStore.resources.rock}</span>
	</div>
	<div class="flex gap-2 flex-col">
		<span>Miners: {$gameStore.crew.miners}</span>
		<span>Mechanics: {$gameStore.crew.mechanics}</span>
		<span>Soldiers: {$gameStore.crew.soldiers}</span>
	</div>
</main>
