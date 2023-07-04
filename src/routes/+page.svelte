<script lang="ts">
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import Main from '../components/tabs/Main.svelte';
	import Log from '../components/tabs/Log.svelte';
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
		console.log('saving game...');
		const updateInterval = 1000 * 10; // every 10 seconds

		setInterval(() => {
			// Game logic
			localStorage.setItem('saveData', JSON.stringify($gameStore));
		}, updateInterval);
	}

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
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>Main</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>Milestones</Tab>
		<Tab bind:group={tabSet} name="tab2" value={2}>Log</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<Main />
			{:else if tabSet === 1}
				<Milestones />
			{:else if tabSet === 2}
				<Log />
			{/if}
		</svelte:fragment>
	</TabGroup>
</main>
