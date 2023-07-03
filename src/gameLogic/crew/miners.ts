export default function handleMiners(gameStore: any) {
	if (gameStore.crew.roles.miners < 1) return;

	const rockEarnedThisTick = gameStore.crew.roles.miners * 0.1;
	gameStore.resources.rock.current += rockEarnedThisTick;
	gameStore.resources.rock.lifetime += rockEarnedThisTick;

	// Check if the player gains the gold resource
	if (Math.random() < 0.01) {
		gameStore.resources.gold.current += 1; // Increment gold
		gameStore.resources.gold.lifetime += 1; // Increment gold
		gameStore.log.push('Your miners have struck gold (+1)');
	}
}
