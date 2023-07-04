<script lang="ts">
	import { gameStore } from '../../stores/gameStore';
</script>

{#if $gameStore.hasLoaded}
	<main class="m-12">
		{#each $gameStore.log as event}
			<p>{event}</p>
		{/each}
	</main>
{/if}
