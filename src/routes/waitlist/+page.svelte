<script lang="ts">
	import WaitlistSignup from '$lib/WaitlistSignup.svelte';
	import { CORP_WAITLIST_SOURCE, WAITLIST_PAGE_SRC_KEY } from '$lib/waitlist-source';
</script>

<svelte:head>
	<title>Waitlist | LxMerit</title>
	<meta
		name="description"
		content="Join the LxMerit waitlist. We'll email you when an invitation is ready."
	/>
</svelte:head>

<div class="max-w-xl mx-auto px-4 py-16">
	<WaitlistSignup
		fallbackSource={CORP_WAITLIST_SOURCE}
		storageKey={WAITLIST_PAGE_SRC_KEY}
		title="Join the Waitlist"
		subtitle="We'll email you when an invitation is ready."
	/>
</div>
