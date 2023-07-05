<script lang="ts">
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import Main from '../components/tabs/Main.svelte';
	import Milestones from '../components/tabs/Milestones.svelte';
	import { onMount } from 'svelte';
	import { gameStore } from '../stores/gameStore';
	import handleMiners from '../gameLogic/crew/miners';
	import checkMilestoneProgress from '../gameLogic/milestones';

	let tabSet: number = 0;

	onMount(() => {
		startGameLoop();
		saveGame();
	});

	function saveGame() {
		const updateInterval = 1000 * 60; // every 60 seconds

		setInterval(() => {
			// Game logic
			localStorage.setItem('saveData', JSON.stringify($gameStore));
			$gameStore.lastSave = Date.now();
		}, updateInterval);
	}

	// Game loop
	function startGameLoop(): void {
		const updateInterval = 1000 / 10; // 10 FPS

		setInterval(() => {
			// Game logic
			$gameStore.time.tick += 1;
			updateGameLogic();
			handleTime();
		}, updateInterval);
	}

	function handleTime() {
		// NOTES:
		// 10 ticks = 1 second
		// 600 ticks = 1 minute
		// 36 000 ticks = 1 hour
		const ticksPerDay = 300;
		const daysPerMonth = 5;
		const monthsPerYear = 5;

		// new day every 30 seconds
		if ($gameStore.time.tick >= ticksPerDay) {
			$gameStore.time.day += 1;
			$gameStore.time.tick = 1;
		}

		// numbers of months
		if ($gameStore.time.day >= daysPerMonth) {
			$gameStore.time.month += 1;
			$gameStore.time.day = 1;
		}

		if ($gameStore.time.month >= monthsPerYear) {
			$gameStore.time.year += 1;

			// new year, reset values
			$gameStore.time.day = 1;
			$gameStore.time.month = 1;
		}
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

<main class="p-4">
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>Main</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>Milestones</Tab>
		<!-- <Tab bind:group={tabSet} name="tab2" value={2}>Log</Tab> -->
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<Main />
			{:else if tabSet === 1}
				<Milestones />
				<!-- {:else if tabSet === 2}
				<Log /> -->
			{/if}
		</svelte:fragment>
	</TabGroup>
</main>
