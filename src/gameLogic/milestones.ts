import { toastStore } from '@skeletonlabs/skeleton';

export default function checkMilestoneProgress(gameStore: any): void {
	Object.entries(gameStore.milestones).forEach(([key, miletone]: any) => {
		if (miletone.unlocked) return;
		if (gameStore.resources[miletone.requirementResource].lifetime >= miletone.requirementAmount) {
			miletone.unlocked = true;
			const toast = {
				message: miletone.description
			};
			toastStore.trigger(toast);
		}
	});
}
