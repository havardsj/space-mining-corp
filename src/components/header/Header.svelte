<script>
	import { gameStore } from '../../stores/gameStore';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(relativeTime);
</script>

<div class="flex justify-between p-4">
	<div class="flex text-3xl">
		<span
			class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
			>Space.</span
		>
		<span
			class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
			>Mining.</span
		>
		<span
			class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone"
			>Corp.</span
		>
	</div>
	<div class="flex gap-2 items-center">
		<span class="text-xs">Last saved: {dayjs($gameStore.lastSave).fromNow()}</span>
		<button type="button" class="btn variant-ghost btn-sm">Save</button>
		<button type="button" class="btn variant-ghost btn-sm">Options</button>
		<button type="button" class="btn variant-ghost-warning btn-sm">Wipe</button>
	</div>
</div>
