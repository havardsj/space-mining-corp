<script lang="ts">
	import { gameStore } from '../../stores/gameStore';
</script>

<main class="m-12">
	{#each $gameStore.log as event}
		<p>{JSON.stringify(event)}</p>
	{/each}
</main>
