import { toastStore } from '@skeletonlabs/skeleton';

export default function checkMilestoneProgress(gameStore: any): void {
	Object.entries(gameStore.milestones).forEach(([key, milestone]: any) => {
		if (milestone.unlocked) return;
		if (
			gameStore.resources[milestone.requirementResource].lifetime >= milestone.requirementAmount
		) {
			milestone.unlocked = true;
			const toast = {
				message: milestone.description,
				background: 'variant-filled-success'
			};
			gameStore.log.push('MILESTONE! -' + milestone.description);
			toastStore.trigger(toast);
		}
	});
}
