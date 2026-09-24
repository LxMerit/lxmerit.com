<script lang="ts">
	import WaitlistPage from '$lib/WaitlistPage.svelte';

	let { data } = $props();
</script>

<WaitlistPage ad={data.ad} />
