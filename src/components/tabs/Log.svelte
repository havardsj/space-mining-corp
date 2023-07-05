<script lang="ts">
	import { gameStore } from '../../stores/gameStore';
	import { afterUpdate, onMount, tick } from 'svelte';

	let element: any;

	let logLength = $gameStore.log.length;

	// $: logRef, scrollToBottom(element);

	onMount(() => scrollToBottom(element));
	// afterUpdate(() => {
	// 	console.log(element.scrollTop);
	// 	console.log(element.scrollHeight);
	// });

	function scrollToBottom(node: any) {
		if (node) {
			node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
		}
	}

	gameStore.subscribe((val) => {
		if (val.log && val.log.length > logLength) {
			console.log('log has been updated');
			scrollToBottom(element);
			logLength++;
		}
		// console.log(val);
	});

	async function handleScroll() {
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
					<span class="flex-auto">{event}</span>
				</li>
			{/each}
		</ul>
	</div>
{/if}
