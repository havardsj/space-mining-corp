<script lang="ts">
	import { gameStore } from '../../stores/gameStore';
	import { afterUpdate, onMount, tick } from 'svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	let element: any;
	let autoscrollEnabled = true;

	let logLength = $gameStore.log.length;

	onMount(() => scrollToBottom(element));

	function scrollToBottom(node: any) {
		if (node) {
			node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
		}
	}

	gameStore.subscribe((val) => {
		if (val.log && val.log.length > logLength) {
			console.log('log has been updated');
			handleScroll();
			logLength++;
		}
	});

	async function handleScroll() {
		if (!autoscrollEnabled) return;
		await tick();
		scrollToBottom(element);
	}
</script>

{#if $gameStore.hasLoaded}
	<div>
		<h2 class="text-xl mb-4">Event log ({$gameStore.log.length})</h2>
		<ul class="list overflow-auto max-h-96" bind:this={element}>
			{#each $gameStore.log as event}
				<li>
					<span class="flex-auto text-xs">{event}</span>
				</li>
			{/each}
		</ul>
		<SlideToggle
			class="mt-4"
			name="slider-label"
			size="sm"
			on:change={() => (autoscrollEnabled = !autoscrollEnabled)}
			checked={autoscrollEnabled}
			>Autoscroll{autoscrollEnabled ? ' Enabled' : ' Disabled'}</SlideToggle
		>
	</div>
{/if}
