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

<style>
	.ascii-art {
		font-family: monospace;
		color: #fff;
		background-color: #000;
		padding: 10px;
	}
	.fade-transition {
		opacity: 1;
		transition: opacity 0.3s;
	}

	.fade-transition.fade-out {
		opacity: 0;
	}
</style>
