import { toastStore } from '@skeletonlabs/skeleton';
import pushLogEvent from '../utils/pushLogEvent';
import dayjs from 'dayjs';

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
			// gameStore.log.push(`[${dayjs()}] MILESTONE: ${milestone.description}`);
			pushLogEvent(gameStore, `MILESTONE: ${milestone.description}`);
			toastStore.trigger(toast);
		}
	});
}
