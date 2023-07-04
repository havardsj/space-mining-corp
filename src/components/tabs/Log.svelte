<script lang="ts">
	import { gameStore } from '../../stores/gameStore';
	import { afterUpdate, onMount, tick } from 'svelte';

	let element: any;

	onMount(() => scrollToBottom(element));
	// afterUpdate(() => {
	// 	console.log(element.scrollTop);
	// 	console.log(element.scrollHeight);
	// });

	function scrollToBottom(node: any) {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	}

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
