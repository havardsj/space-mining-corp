<script lang="ts">
	import { gameStore } from '../../stores/gameStore';
</script>

{#if $gameStore.hasLoaded}
	<main class="m-12">
		{#each Object.entries($gameStore.milestones) as [key, milestone]}
			<p>{JSON.stringify(milestone)}</p>
		{/each}
	</main>
{/if}
