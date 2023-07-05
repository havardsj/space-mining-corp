import { gameStore } from '../../stores/gameStore';
import pushLogEvent from '../../utils/pushLogEvent';

export default function handleMiners(gameStore: any) {
	if (gameStore.crew.roles.miners < 1) return;

	const rockEarnedThisTick = gameStore.crew.roles.miners * 0.1;
	gameStore.resources.rock.current += rockEarnedThisTick;
	gameStore.resources.rock.lifetime += rockEarnedThisTick;

	// Check if the player gains the gold resource
	// NOTES:
	// 0.01 = 1%
	// 0.1 = 10%
	if (Math.random() < 0.1) {
		gameStore.resources.gold.current += 1; // Increment gold
		gameStore.resources.gold.lifetime += 1; // Increment gold
		pushLogEvent(gameStore, 'Your Miners have struck gold (+1)');
	}
}
