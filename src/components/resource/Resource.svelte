<script lang="ts">
	export let data: any;
</script>

<div class="flex gap-4 items-center">
	<span>{data.displayName}: {Math.floor(data.current)} | {(data.perTick * 10).toFixed(1)} /s</span>
</div>
