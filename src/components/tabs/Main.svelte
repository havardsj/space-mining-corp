<script lang="ts">
	import { gameStore } from '../../stores/gameStore';
	import Resource from '../resource/Resource.svelte';
</script>

{#if $gameStore.hasLoaded}
	<div class="m-12">
		<div class="flex flex-col gap-12">
			<div>
				<h3 class="text-2xl">Resources:</h3>
				<Resource data={$gameStore.resources.rock} />
				<Resource data={$gameStore.resources.gold} />
			</div>
			<div class="flex gap-2 flex-col">
				<h3 class="text-2xl">
					Crew: {$gameStore.crew.active} / {$gameStore.crew.available}
				</h3>

				<div class="flex gap-4">
					<span>Miners: {$gameStore.crew.roles.miners}</span>
					<div>
						<button
							on:click={() => {
								$gameStore.crew.roles.miners -= 1;
								$gameStore.crew.active -= 1;
							}}
							disabled={$gameStore.crew.roles.miners === 0}
							class="btn-icon variant-filled btn-icon-sm"
						>
							-
						</button>
						<button
							on:click={() => {
								$gameStore.crew.roles.miners += 1;
								$gameStore.crew.active += 1;
							}}
							disabled={$gameStore.crew.available === $gameStore.crew.active}
							type="button"
							class="btn-icon variant-filled btn-icon-sm"
						>
							+
						</button>
					</div>
				</div>
				<span>Mechanics: {$gameStore.crew.roles.mechanics}</span>
				<span>Soldiers: {$gameStore.crew.roles.soldiers}</span>
			</div>
			<div class="flex gap-2 flex-col">
				<h3 class="text-2xl">Upgrades:</h3>
				<div class="flex gap-4">
					<span
						>Mechanic Workshop: {$gameStore.upgrades.mechanicWorkshop.active} / {$gameStore.upgrades
							.mechanicWorkshop.available}</span
					>
					<div>
						<button
							on:click={() => ($gameStore.upgrades.mechanicWorkshop.active -= 1)}
							disabled={$gameStore.upgrades.mechanicWorkshop.active === 0}
							class="btn-icon variant-filled btn-icon-sm"
						>
							-
						</button>
						<button
							on:click={() => ($gameStore.upgrades.mechanicWorkshop.active += 1)}
							disabled={$gameStore.upgrades.mechanicWorkshop.active ===
								$gameStore.upgrades.mechanicWorkshop.available}
							class="btn-icon variant-filled btn-icon-sm"
						>
							+
						</button>
					</div>
				</div>
				<div class="flex gap-4">
					<span
						>Mining experts: {$gameStore.upgrades.miningExperts.active} / {$gameStore.upgrades
							.miningExperts.available}</span
					>
					<div>
						<button
							on:click={() => ($gameStore.upgrades.miningExperts.active -= 1)}
							disabled={$gameStore.upgrades.miningExperts.active === 0}
							class="btn-icon variant-filled btn-icon-sm"
						>
							-
						</button>
						<button
							on:click={() => ($gameStore.upgrades.miningExperts.active += 1)}
							disabled={$gameStore.upgrades.miningExperts.active ===
								$gameStore.upgrades.miningExperts.available}
							class="btn-icon variant-filled btn-icon-sm"
						>
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
